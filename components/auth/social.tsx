"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="w-full flex items-center justify-center gap-x-4">
      <Button size="lg" variant="outline" className="w-full" onClick={() =>
      onClick('google')}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button size="lg" variant="outline" className="w-full" onClick={() =>
      onClick('github')}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;
