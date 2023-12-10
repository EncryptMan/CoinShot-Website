'use client';

import { signIn, useSession, signOut } from "next-auth/react";
import DiscordLogo from "./DiscordLogo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthButton() {
    const { data: session } = useSession();
    // console.log(session);

    if (session) {
        return (

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* <Button variant="ghost" className="relative h-8 w-8 rounded-full focus:outline-none"> */}
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user?.image ?? ''} alt="@shadcn" />
                        <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    {/* </Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            {/* <p className="text-sm font-medium leading-none">shadcn</p> */}
                            <p className="text-xs leading-none text-muted-foreground">
                                @{session.user?.name}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuGroup>
                        {/* <DropdownMenuItem>
                            <Link href={'/dashboard'}>
                            Dashboard
                            </Link>
                        </DropdownMenuItem> */}
                        {/* <DropdownMenuItem>
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem> */}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        );
    } else {
        return (
            <Button onClick={() => signIn('discord')} className="text-white flex gap-1">
                Login <DiscordLogo className="h-6 w-6" />
            </Button>

        );
    }
}
