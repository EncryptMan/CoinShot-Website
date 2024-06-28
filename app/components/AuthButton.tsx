'use client';

import { signIn, useSession, signOut } from "next-auth/react";
import DiscordLogo from "./DiscordLogo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { verala } from "../lib/fonts";

export default function AuthButton({ isOnNavbar = true, className }: { isOnNavbar?: boolean, className?: string }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false)

    if (session) {

        if (isOnNavbar) {
            return (
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger className={cn("flex gap-1 items-center focus:outline-none", className)}>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={session.user?.image ?? ''} alt={`${session.user?.name}'s avatar`} />
                            <AvatarFallback>
                                {session.user?.name?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <p className={cn("text-xs text-neutral-200", isOnNavbar && "max-lg:hidden")}>{session.user?.globalName ?? session.user?.name}</p>
                        <div className="text-neutral-400"
                            style={{
                                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        >
                            <ChevronDown size={20} strokeWidth={2} className="text-neutral-300" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-xs leading-none text-muted-foreground">
                                    {session.user?.name}{session.user?.discriminator !== '0' && `#${session.user?.discriminator}`}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                                Dashboard
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => router.push('/profile')}>
                                Profile
                            </DropdownMenuItem>
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
                <div className="w-full">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className={cn("flex gap-1 items-center focus:outline-none p-3", className, !isOnNavbar && 'gap-3')}>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={session.user?.image ?? ''} alt={`${session.user?.name}'s avatar`} />
                            <AvatarFallback>
                                {session.user?.name?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <p className={cn("text-lg text-neutral-200", isOnNavbar && "max-lg:hidden text-xs text-neutral-400")}>{session.user?.globalName ?? session.user?.name}</p>
                        <div className="text-neutral-400"
                            style={{
                                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        >
                            <ChevronDown size={20} strokeWidth={2} className="text-neutral-300" />
                        </div>
                    </button>
                    <div
                        className={cn(
                            "flex flex-col items-start gap-2 mb-3 transition-height duration-500 ease-in-out overflow-hidden",
                            verala.className,
                            dropdownOpen ? "h-[140px]" : "h-0"
                        )}
                    >
                        <Button
                            onClick={() => router.push("/dashboard")}
                            variant={"ghost"}
                            className="hover:bg-gray-700/50 text-neutral-400 hover:text-neutral-200 text-lg"
                        >
                            Dashboard
                        </Button>
                        <Button
                            onClick={() => router.push("/profile")}
                            variant={"ghost"}
                            className="hover:bg-gray-700/50 text-neutral-400 hover:text-neutral-200 text-lg"
                        >
                            Profile
                        </Button>
                        <Button
                            onClick={() => signOut()}
                            variant={"ghost"}
                            className="hover:bg-gray-700/50 text-neutral-400 hover:text-neutral-200 text-lg"
                        >
                            Log out
                        </Button>
                    </div>
                </div>
            );
        }

    } else {
        if (isOnNavbar) {
            return (
                <Button onClick={() => signIn('discord')} className={cn("text-white flex gap-1", className)} size={isOnNavbar ? 'sm' : 'default'}>
                    Login <DiscordLogo className="h-6 w-6 max-lg:hidden" />
                </Button>
            );
        } else {
            return (
                <div className="p-3 w-full">
                    <Button onClick={() => signIn('discord')} className={cn("text-white flex gap-1", !isOnNavbar && 'w-full', className)} size={isOnNavbar ? 'sm' : 'default'}>
                        Login <DiscordLogo className="h-6 w-6" />
                    </Button>
                </div>
            );
        }

    }
}
