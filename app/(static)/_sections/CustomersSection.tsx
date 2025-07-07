import { anton, verala } from "@/app/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";


export default function CustomersSection() {
    return (
        <section id='customers' className={cn('py-12 -mt-10 px-5 bg-gray-700', verala.className)}>
            <h2 className={cn('text-center text-4xl text-neutral-200 mt-5 font-bold max-md:text-3xl', anton.className)}>CoinShot is trusted by more than 950 servers</h2>
            <div className="max-w-3xl w-full mx-auto mt-7 grid grid-cols-2 gap-8 max-lg:grid-cols-1 max-md:gap-4 px-10 max-md:px-5">
                <ServerCard
                    name='BLASTER'
                    iconUrl='https://cdn.discordapp.com/icons/1192038218737131632/ebd75cc64e33dd36723d80a5f76a05c6.png?size=1024'
                    memberCount={222517}
                />
                <ServerCard
                    name='Orochi Network'
                    iconUrl='https://cdn.discordapp.com/icons/1069494820386635796/1b4e6416395d7945eb1d8b4f97010135.png?size=1024'
                    memberCount={67831}
                />
                <ServerCard
                    name='GemHUB'
                    iconUrl='https://cdn.discordapp.com/icons/1085013063226363976/d0f491a879d4560844921d893407276b.png?size=1024'
                    memberCount={53055}
                />
                <ServerCard
                    name='BitFight'
                    iconUrl='https://cdn.discordapp.com/icons/1198142061417877525/a_8209ae2537ca3ebf8b4ef941234e6d6b.gif?size=1024'
                    memberCount={27736}
                />
            </div>
        </section>
    )
}

function ServerCard({ name, iconUrl, memberCount }: { name: string, iconUrl: string, memberCount: number }) {
    return (
        <div className='flex flex-col gap-2 relative rounded-lg bg-gray-800 p-4'>
            <div className='flex items-center gap-2'>
                <Image src={iconUrl} alt={name} height={50} width={50} className='rounded-full' />
                <div className="flex flex-col">
                    <div className="flex gap-1 items-center">

                        <div className='relative w-fit'>
                            <svg aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 16 15.2"><path fill="#FFFFFF" fillRule="evenodd" d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"></path></svg>
                            <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="gray" viewBox="0 0 24 24" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><path fill="gray" d="m2.4 8.4 8.38-6.46a2 2 0 0 1 2.44 0l8.39 6.45a2 2 0 0 1-.79 3.54l-.32.07-.82 8.2a2 2 0 0 1-1.99 1.8H16a1 1 0 0 1-1-1v-5a3 3 0 0 0-6 0v5a1 1 0 0 1-1 1H6.31a2 2 0 0 1-1.99-1.8L3.5 12l-.32-.07a2 2 0 0 1-.79-3.54Z"></path></svg>
                        </div>
                        <h4 className='text-xl'>{name}</h4>
                    </div>
                    <p className='text-neutral-400'>{memberCount.toLocaleString()} members</p>
                </div>
            </div>
        </div>
    )
}