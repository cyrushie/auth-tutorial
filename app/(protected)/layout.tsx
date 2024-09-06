import Navbar from "./_components/navbar";
import { Toaster } from "@/components/ui/sonner";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center
            gap-y-10
            bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
            from-red-700 to-stone-900"
        >
            <Toaster />
            <Navbar />
            {children}
        </div>
    );
};

export default ProtectedLayout;
