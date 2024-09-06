"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/token";
import { sendEmailVerification } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    const validateFields = RegisterSchema.safeParse(values);
    console.log(validateFields);

    if (!validateFields.success) {
        return { error: "Invalid Fields" };
    }

    const { email, password, name } = validateFields.data;
    const hashedPassowrd = await bcrypt.hash(password, 10);

    const isUserExist = await getUserByEmail(email);

    if (isUserExist) {
        return { error: "User already exists" };
    }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassowrd
        }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendEmailVerification(
      verificationToken.email,
      verificationToken.token
      )

    return { success: "Confirmation email sent" };
};
