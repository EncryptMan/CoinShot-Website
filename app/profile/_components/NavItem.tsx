'use client';

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function NavItem({ href, title, Icon }: { href: string, title: string, Icon?: LucideIcon }) {
    const pathname = usePathname()

    const activeClassName = pathname === href ? "bg-white/10 text-white" : "";

    return (
        <Link href={href} className={`m-3 p-3 flex gap-4 items-center text-neutral-400 hover:text-white hover:bg-white/10 rounded-xl ${activeClassName}`}>
            {Icon && <Icon size={25} strokeWidth={2} />}
            <span>
                {title}
            </span>
        </Link>
    )

}