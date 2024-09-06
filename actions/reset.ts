"use server";

import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { generateResetPasswordToken } from "@/lib/token";
import { sendEmailResetPassword } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values);

    if (!validateFields.success) {
        return {
            error: "Invalid email!"
        };
    }

    const { email } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            error: "Email does not exist!"
        };
    }
    console.log(existingUser);

    const resetPasswordToken = await generateResetPasswordToken(
        existingUser.email
    );
    sendEmailResetPassword(resetPasswordToken.email, resetPasswordToken.token);

    return {
        success: "Reset email sent"
    };
};
