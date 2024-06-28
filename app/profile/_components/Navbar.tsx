'use client'

import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/app/components/AuthButton";
import { cn } from "@/lib/utils";
import { Anton, Varela_Round } from 'next/font/google'
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Guild } from "@prisma/client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CgMenuLeft } from "react-icons/cg";


const anton = Anton({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '400'],
})

const verala = Varela_Round({
    subsets: ['latin', 'latin-ext'],
    weight: ['400'],
})


export default function Navbar({ className }: { className?: string }) {
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
        <nav className="w-full border-b border-slate-600 bg-gray-800 backdrop-blur-2xl p-5" >
            <div className="w-full flex justify-between items-center md:max-w-screen-xl mx-auto">

                <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
                    <SheetTrigger className="block lg:hidden" onClick={() => setSidebarOpen(true)}><CgMenuLeft size={25} className="text-neutral-300" /></SheetTrigger>
                    <SheetContent side={'left'} className="bg-gray-800" >
                        <Sidebar className="bg-transparent outline-none w-full border-r-0" />
                    </SheetContent>
                </Sheet>

                <Link href="/" className="flex items-center gap-2">
                    <Image className="rounded-full overflow-hidden max-lg:hidden" height={40} width={40} src="/icon.png" alt="CoinShot icon" />
                    <span className={cn("text-3xl", anton.className)}>CoinShot</span>
                </Link>

                <AuthButton />

            </div>
        </nav>
    )
}