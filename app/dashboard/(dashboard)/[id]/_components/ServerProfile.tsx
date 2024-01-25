import { cn } from "@/lib/utils";
import { Guild } from "@prisma/client";
import Image from "next/image";

export default function ServerProfile({ guild, className }: { guild: Guild, className?: string}) {
    return (
        <div className={cn(`flex gap-4 items-center`, className)}>
            <div className="rounded-full overflow-hidden relative">
                <Image src={guild.iconUrl} alt={`${guild.name}'s logo`} width={150} height={150} className="object-cover" />
            </div>
            <div className="flex flex-col gap-2 text-neutral-300">
                <h1 className="font-semibold text-2xl">{guild.name}</h1>
                <p className="text-lg">{guild.memberCount} Members</p>
            </div>
        </div>
    )
}