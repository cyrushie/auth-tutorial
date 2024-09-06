"use server";

import * as z from "zod";
import { CodeSchema } from "@/schemas";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const twoFactor = async (
    values: z.infer<typeof CodeSchema>,
    email: string,
    pass
) => {
    const validateFields = CodeSchema.safeParse(values);

    if (!validateFields.success) {
        return {
            error: "Invalid Code"
        };
    }

    const { code } = validateFields.data;

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (!existingToken) {
        return {
            error: "Token for your email does not exist"
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            error: "Code has already expired"
        };
    }

    if (existingToken.token !== code) {
        return {
            error: "6 digit code does not match"
        };
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            error: "Email to authenticate does not exist"
        };
    }

    const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
    );

    if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
            where: {
                id: existingConfirmation.id
            }
        });
    }

    await db.twoFactorConfirmation.create({
        data: {
            userId: existingUser.id
        }
    });

    try {
        await signIn("credentials", {
            email,
            password: pass,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid Password"
                    };
                default:
                    return {
                        error: "Something went wrong"
                    };
            }
        }

        throw error;
    }
};
