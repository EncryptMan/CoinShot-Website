'use client';

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Guild } from "@prisma/client";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GuildsContext } from "../../../_components/GuildsProvider";
import { ActiveIdContext } from "./ActiveIdProvider";


export default function ServerSwitcher() {
    const guilds = useContext(GuildsContext).filter(guild => guild.botPresent);
    const activeId = useContext<string>(ActiveIdContext);
    const router = useRouter();

    function onValueChange(value: string) {
        router.push(`/dashboard/${value}`)
    }

    return (

        <Select defaultValue={activeId} onValueChange={onValueChange}>
            <SelectTrigger className="rounded-xl w-full hover:outline hover:outline-blue-800 transition px-3 py-6">
                <SelectValue />
            </SelectTrigger>
            <SelectContent >
                {guilds.map((guild: Guild) => (
                    <SelectItem key={guild.id} value={guild.id} className="py-4">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full overflow-hidden relative w-7 h-7">
                                <Image src={guild.iconUrl} alt={`${guild.name}'s icon`} fill className="object-cover" />
                            </div>
                            <span className="text-lg font-semibold text-neutral-300 overflow-hidden overflow-ellipsis whitespace-nowrap fade-out">{guild.name}</span>
                        </div>
                    </SelectItem>
                ))
                }
                {/* <SelectItem value="add">
                            <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-neutral-300">Add a server</span>
                            </div>
                        </SelectItem> */}
            </SelectContent>
        </Select>
    )
}
