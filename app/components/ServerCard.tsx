import { Guild } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


export default function ServerCard({ guild }: { guild: Guild }) {
    return (
        <Link href={`/dashboard/${guild.id}`}>
            <div className="h-full w-full p-4">
            <div className="bg-slate-500 rounded-lg p-4 flex items-center justify-center gap-2 flex-col">
                <h1 className="text-white text-xl">{guild.name}</h1>
                <h1 className="text-white text-xl">Members: {guild.memberCount}</h1>
                {/* <h1 className="text-white text-xl">Your Role: {guild.owner ? 'Owner': 'Admin'}</h1> */}
                <div className="rounded-full overflow-hidden">
                <Image src={guild.iconUrl} height={100} width={100} alt={`${guild.name} icon`} priority={true} />
                </div>
                <button className="rounded-xl bg-green-800 text-white text-xl hover:bg-green-900 p-2">Manage</button>
            </div>
            </div>
        </Link>
    );
}