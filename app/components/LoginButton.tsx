'use client'
import { signIn } from "next-auth/react";
import DiscordLogo from "./DiscordLogo";
import { Button } from "@/components/ui/button";


export default function LoginButton() {

    return (
        <Button onClick={() => signIn('discord')} className="text-white flex gap-1 py-6 px-6">
            <DiscordLogo className="h-8 w-8" /><span className="text-2xl">Login With Discord</span>
        </Button>
    );
}