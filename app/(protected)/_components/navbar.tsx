"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserButton from "@/components/auth/user-button";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav
            className="w-[400px] flex justify-between bg-secondary py-4 px-2
            items-center 
    rounded-xl"
        >
            <div className="flex gap-x-2">
                <Button
                    variant={pathname === "/server" ? "default" : "outline"}
                >
                    <Link href="/server">server</Link>
                </Button>
                <Button
                    variant={pathname === "/client" ? "default" : "outline"}
                >
                    <Link href="/client">client</Link>
                </Button>
                <Button variant={pathname === "/admin" ? "default" : "outline"}>
                    <Link href="/admin">admin</Link>
                </Button>
                <Button
                    variant={pathname === "/settings" ? "default" : "outline"}
                >
                    <Link href="/settings">settings</Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    );
};

export default Navbar;
