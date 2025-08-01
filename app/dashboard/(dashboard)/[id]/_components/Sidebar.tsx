'use client'

import { cn } from "@/lib/utils"
import ServerSwitcher from "./ServerSwitcher"

import NavItem from "./NavItem"
import { useContext } from "react"
import { ActiveGuildIdContext } from "./ActiveIdProvider"
import { ChevronRightSquare, Home, Bolt, Repeat2, Bitcoin, Bot } from "lucide-react"

export default function Sidebar({ className }: { className?: string }) {
    const activeId = useContext<string>(ActiveGuildIdContext);

    return (
        <aside className={cn("h-full w-72 bg-gray-800 backdrop-blur-2xl border-r border-gray-700", className)}>

            <div className="w-full p-3 mt-3">
                <ServerSwitcher />
            </div>

            <NavItem href={`/dashboard/${activeId}`} title="Home" Icon={Home} />
            <NavItem href={`/dashboard/${activeId}/commands`} title="Commands" Icon={ChevronRightSquare} />
            <NavItem href={`/dashboard/${activeId}/automations`} title="Automations" Icon={Repeat2} />
            <NavItem href={`/dashboard/${activeId}/personalize`} title="Personalize" Icon={Bot} />
            <NavItem href={`/dashboard/${activeId}/payments`} title="Payment Gateway" Icon={Bitcoin} />
            <NavItem href={`/dashboard/${activeId}/settings`} title="Settings" Icon={Bolt} />
        </aside>
    )
}