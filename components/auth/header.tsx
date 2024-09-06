import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center ">
      <h1 className={cn("text-3xl font-semibold", poppins.className)}>
        🔐 Auth
      </h1>

      <p className="text-sm text-muted-foreground ">{label}</p>
    </div>
  );
};

export default Header;
