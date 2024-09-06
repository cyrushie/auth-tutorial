import { z } from "zod";

export const SettingsSchema = z.object({
    name: z.string()
});
export const CodeSchema = z.object({
    code: z
        .string()
        .min(6, {
            message: "6 digits are required"
        })
        .max(6, {
            message: "6 digits only"
        })
});
export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password must have a minimum of 6 characters"
    })
});
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
});
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Password must have a minimum of 6 characters"
    }),
    name: z.string().min(1, {
        message: "Username is required"
    })
});
