'use client';

import Image from "next/image";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { Anton } from 'next/font/google'
import { Menu, Sparkles, Sparkle } from "lucide-react";
import NavItems from "./NavItems";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiSparkles } from "react-icons/hi";
import { CgMenuRight } from "react-icons/cg";
import { IoSparklesSharp } from "react-icons/io5";

const anton = Anton({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '400'],
})


export default function Navbar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (isSidebarOpen) {
            setSidebarOpen(false);
        }
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-600 bg-gray-800 backdrop-blur-2xl p-5">
            <div className="w-full flex justify-between items-center md:max-w-screen-xl mx-auto">
                <div className="flex items-center gap-7">
                    <Link href="/" className="flex items-center gap-2">
                        <Image className="rounded-full overflow-hidden" height={40} width={40} src="/icon.png" alt="CoinShot icon" />
                        <span className={cn("text-3xl", anton.className)}>CoinShot</span>
                    </Link>
                    <NavItems className="max-lg:hidden" />
                </div>
                <div className="flex items-center gap-2 lg:gap-4">
                    <Button variant={'secondary'} className="bg-yellow-500/20 hover:bg-yellow-500/50 text-yellow-400">
                        <Link href={'/premium'} className="flex items-center">
                            <IoSparklesSharp fill="#FACC15" size={20} />&nbsp;Premium
                        </Link>
                    </Button>
                    <AuthButton />
                    <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger className="block lg:hidden" onClick={() => setSidebarOpen(true)} asChild><Button variant={'ghost'} className="p-0"><CgMenuRight size={25} className="lg:hidden block text-neutral-300" /></Button></SheetTrigger>
                        <SheetContent side={'right'} className="bg-gray-800" >
                            <NavItems className="flex-col items-start" />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}