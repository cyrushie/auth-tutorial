"use client";

import { PacmanLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { verifyEmail } from "@/actions/verify-email";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const VerifyEmailForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Token is Missing!");
            return;
        }

        verifyEmail(token)
            .then(data => {
                setError(data?.error);
                setSuccess(data?.success);
            })
            .catch(error => {
                console.log(error);
            });
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Verifying Email"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="flex items-center justify-center w-full  ">
                {!success && !error && <PacmanLoader />}
                <FormError message={error} />
                <FormSuccess message={success} />
            </div>
        </CardWrapper>
    );
};

export default VerifyEmailForm;
