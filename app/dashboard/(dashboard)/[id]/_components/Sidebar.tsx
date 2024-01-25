'use client'

import { cn } from "@/lib/utils"
import ServerSwitcher from "./ServerSwitcher"

import NavItem from "./NavItem"
import { useContext } from "react"
import { ActiveIdContext } from "./ActiveIdProvider"
import { ChevronRightSquare, Home, Bolt, Repeat2 } from "lucide-react"

export default function Sidebar({ className }: { className?: string }) {
    const activeId = useContext<string>(ActiveIdContext);

    return (
        <aside className={cn("h-full w-72 bg-gray-800 backdrop-blur-2xl border-r border-gray-700", className)}>

            <div className="w-full p-3 mt-3">
                <ServerSwitcher />
            </div>

            <NavItem href={`/dashboard/${activeId}`} title="Home" Icon={Home} />
            <NavItem href={`/dashboard/${activeId}/commands`} title="Commands" Icon={ChevronRightSquare} />
            <NavItem href={`/dashboard/${activeId}/automations`} title="Automations" Icon={Repeat2} />
            <NavItem href={`/dashboard/${activeId}/settings`} title="Settings" Icon={Bolt} />
        </aside>
    )
}