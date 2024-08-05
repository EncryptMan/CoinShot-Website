import DiscordLogo from "@/app/components/DiscordLogo";
import { anton, verala } from "@/app/lib/fonts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


export default function HeroSection() {
    return (
        <section id="hero" className="flex gap-1 items-center justify-center w-full pt-10 max-sm:pt-5 flex-col lg:flex-row px-5 mt-15">
            <div className='flex items-center justify-center'>
                <div className="flex flex-col gap-7 max-sm:gap-3 justify-between max-w-lg max-lg:items-center max-lg:pb-5 max-lg:text-center">
                    <h1 className={cn("text-5xl font-semibold  text-neutral-200", anton.className)}>Your All-in-One Crypto Bot for Discord 📈</h1>
                    <p className={cn("text-xl max-sm:text-lg text-neutral-400", verala.className)}>Stay ahead of the Crypto Curve with our Feature-Packed Bot.</p>
                    <div className="flex items-center justify-start gap-5 text-xl max-sm:text-base">
                        <Button className='h-14 text-white' size={'lg'} asChild>
                            <Link href='/invite/homepage' aria-current="page" target="_blank">
                                <div className='flex items-center justify-between gap-2 text-lg w-full h-full'>
                                    <DiscordLogo className='w-10 h-10' />
                                    Add To Discord
                                </div>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center max-lg:p-7">
                <Image src="/bot-vector-art.png" className="" alt="Interactive chart screenshot" width="500" height="400" />
            </div>
        </section>
    );
}