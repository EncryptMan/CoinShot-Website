import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Guild } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


export default function ServerCard({ guild }: { guild: Guild }) {
    return (
        <div className="w-full">
            <div className='relative flex items-center justify-center overflow-hidden rounded-lg h-40'>
                <div style={{
                    backgroundImage: `url(${guild.iconUrl})`,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    inset: 0,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    transform: 'scale(1.4)',
                    filter: 'blur(10px)',
                    opacity: 0.3,
                    zIndex: 1,
                }}>
                </div>
                <div className="rounded-full overflow-hidden border-neutral-200 border-2 relative w-20 h-20 z-30">
                    <Image src={guild.iconUrl} alt={`${guild.name}'s icon`} fill className="object-cover" />
                </div>
            </div>
            <div className="mt-3 flex items-center w-full justify-between">
                <div className="h-full flex flex-col justify-between">
                    <p className="text-white text-md font-semibold">{guild.name}</p>
                    <p className="text-neutral-400 text-sm">Members: {guild.memberCount}</p>
                    {/* <h1 className="text-white text-xl">Your Role: {guild.createdAt ? 'Owner': 'Admin'}</h1> */}
                </div>
                {guild.botPresent ?
                    <Button asChild>
                        <Link href={`/dashboard/${guild.id}`}>
                            <span className="text-white">Manage</span>
                        </Link>
                    </Button>
                    :
                    <Button className="bg-white/10 hover:bg-white/30" asChild>
                        <Link href={`https://discord.com/oauth2/authorize?client_id=1159433416459157535&permissions=0&scope=bot%20applications.commands&guild_id=${guild.id}`}>
                            <span className="text-white">Setup</span>
                        </Link>
                    </Button>
                }
            </div>
        </div>
    );
}

ServerCard.Skeleton = function SeverCardSkeleton () {
    return (
        <div className="w-full">
            <Skeleton className="w-full h-40" />
            <div className="mt-3 flex items-center w-full justify-between">
                <div className="self-stretch flex flex-col justify-between">
                    <Skeleton className="w-[150px] h-[17px]" />
                    <Skeleton className="w-[100px] h-[15px]" />
                </div>
                <Skeleton className="w-[85px] h-[40px]" />
            </div>
        </div>

    );
}