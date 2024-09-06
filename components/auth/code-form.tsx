"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";

import { twoFactor } from "@/actions/two-factor";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { CodeSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormLabel,
    FormItem,
    FormControl,
    FormMessage
} from "@/components/ui/form";

import CardWrapper from "@/components/auth/card-wrapper";

const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const pass = searchParams.get("pass");

    const form = useForm<z.infer<typeof CodeSchema>>({
        resolver: zodResolver(CodeSchema),
        defaultValues: {
            code: ""
        }
    });

    const onSubmit = (values: z.infer<typeof CodeSchema>) => {
        setError("");
        setError("");
        startTransition(() => {
            twoFactor(values, email, pass).then(data => {
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data?.success);
                }
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Code sent on email"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter 6 digit code</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="123456"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full"
                    >
                        Confirm
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;
