'use client';

import Image from "next/image";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";
import { usePathname } from "next/navigation";

import { Anton, Varela_Round } from 'next/font/google'
import { Button } from "@/components/ui/button";

const anton = Anton({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '400'],
})

const verala = Varela_Round({
    subsets: ['latin', 'latin-ext'],
    weight: ['400'],
  })


export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-600 bg-gray-800 backdrop-blur-2xl p-5" >
            <div className="w-full flex justify-between items-center md:max-w-screen-xl mx-auto">

                <div className="flex items-center gap-7">
                <Link href="/" className="flex items-center gap-2">
                    <Image className="rounded-full overflow-hidden" height={40} width={40} src="/icon.png" alt="CoinShot icon" />
                    <span className={cn("text-3xl", anton.className)}>CoinShot</span>
                </Link>
                <div className={cn("md:flex items-center gap-3 hidden", verala.className)}>
                    <Button asChild variant={'ghost'} className="hover:bg-gray-700/50 text-neutral-400 text-lg hover:text-neutral-200">
                    <Link href="#features">
                        Features
                    </Link>
                    </Button>
                    <Button asChild variant={'ghost'} className="hover:bg-gray-700/50 text-neutral-400 text-lg hover:text-neutral-200">
                    <Link href="#pricing">
                        Pricing
                    </Link>
                    </Button>
                    <Button asChild variant={'ghost'} className="hover:bg-gray-700/50 text-neutral-400 text-lg hover:text-neutral-200">
                    <Link href="#support">
                        Support
                    </Link>
                    </Button>
                </div>
                </div>

                <AuthButton />
            </div>
        </nav>
    )
}