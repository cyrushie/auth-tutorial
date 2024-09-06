"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getResetPasswordTokenByToken } from "@/data/reset-password-token";
import { getUserByEmail } from "@/data/user";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?
) => {
    if (!token) {
        return {
            error: "Token is Missing!"
        };
    }

    const existingToken = await getResetPasswordTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Token does not exist"
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            error: "Token has already expired"
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        error: "Email does not exist";
    }

    const validateFields = NewPasswordSchema.safeParse(values);

    if (!validateFields.success) {
        return {
            error: "Password is not valid"
        };
    }

    const { password } = validateFields.data;

    const hashedPassowrd =await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassowrd
        }
    });

    await db.resetPasswordToken.delete({
        where: {
            id: existingToken.id
        }
    });

    return {
        success: "Password has been changed"
    };
};
