"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas/";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { sendEmailVerification, sendTwoFactorCode } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid Fields" };
    }

    const { email, password } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email);

        await sendEmailVerification(
            verificationToken.email,
            verificationToken.token
        );

        return { success: "Confirmation email sent" };
    }

    if (existingUser.isTwoFactorEnabled) {
        const twoFactorToken = await generateTwoFactorToken(email);
        await sendTwoFactorCode(twoFactorToken.email, twoFactorToken.token);

        const validatePassword = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!validatePassword) {
            return {
                error: "Invalid Password"
            };
        }

        return {
            user: {
                email: existingUser.email,
                pass: password
            }
        };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong" };
            }
        }

        throw error;
    }
};
