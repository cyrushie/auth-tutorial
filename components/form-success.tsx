import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  
  if (!message) return null
  
  return (
    <div
      className="flex items-center bg-emerald-500/15 text-emerald-500 gap-x-2
  p-3 text-sm rounded-md"
    >
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

