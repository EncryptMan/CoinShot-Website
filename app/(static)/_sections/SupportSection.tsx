import DiscordLogo from "@/app/components/DiscordLogo";
import { anton, verala } from "@/app/lib/fonts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";


export default function SupportSection() {
    return (
        <section id='support' className={cn('w-full p-5', verala.className)}>
            <div className='flex flex-col items-center justify-center gap-5 rounded-lg bg-slate-600 p-8 '>
                <h2 className={cn('text-center text-5xl text-neutral-200 mt-5', anton.className)}>Need Help?</h2>
                <p className='text-neutral-300'>Join our support server to get support or request a new feature</p>
                <Button variant={'default'} className='bg-neutral-200 hover:bg-neutral-400' asChild size={'lg'}>
                    <Link href={process.env.SUPPORT_SERVER_URL ?? ''} aria-current="page">
                        <DiscordLogo className='h-5 w-5 mr-2' />
                        Join Support Server
                    </Link>
                </Button>
            </div>
        </section>
    )
}