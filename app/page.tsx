import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
  style: ["italic"],
});

export default function Home() {
  return (
    <main
      className="flex h-full flex-col items-center justify-center 
bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500
to-stone-900"
    >
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            poppins.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-lg text-white">A simple authentication service</p>

        <div>
          <LoginButton >
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
