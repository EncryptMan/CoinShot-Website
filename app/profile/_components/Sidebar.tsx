'use client'

import { cn } from "@/lib/utils"

import { Eye, Link } from "lucide-react"
import NavItem from "./NavItem"

export default function Sidebar({ className }: { className?: string }) {

    return (
        <aside className={cn("h-full w-72 bg-gray-800 backdrop-blur-2xl border-r border-gray-700", className)}>
            <NavItem href={`/profile/connections`} title="Connections" Icon={Link} />
            {/* <NavItem href={`/profile/watchlist`} title="Watchlist" Icon={Eye} /> */}
        </aside>
    )
}