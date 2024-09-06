import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
    return (
        <CardWrapper
            backButtonLabel="Back to login page"
            backButtonHref="/auth/login"
            headerLabel="Oop! Something went wrong"
        >
            <div className="text-destructive flex justify-center w-fullr">
                <ExclamationTriangleIcon className="w-8 h-8" />
            </div>
        </CardWrapper>
    );
};

export default ErrorCard;
