import DiscordLogo from "@/app/components/DiscordLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Anton, Varela_Round } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Top Cryptocurrency Discord Servers to Join in 2024',
    description: 'Discover the top Discord servers driving innovation and insight in the digital finance landscape. Dive into the forefront of cryptocurrency communities in 2024!',
    authors: [{ name: 'EncryptMan' }],
    creator: 'EncryptMan',
    publisher: 'EncryptMan',
    icons: [
        {
            url: '/blog/image.png',
            href: '/blog/image.png',
        }
    ]
}

const anton = Anton({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '400'],
})

const verala = Varela_Round({
    subsets: ['latin', 'latin-ext'],
    weight: ['400'],
})

// blog page for top cryptocurrency servers
export default function Page() {
    return (
        <main className="w-full max-w-5xl pt-10 max-sm:pt-5 px-5 mx-auto flex-grow">
            <article className="text-neutral-300">
                <Image src={'/blog/banner.png'} width={1000} height={300} alt="Banner" className="rounded-xl overflow-hidden" />
                <h1 className={cn('text-3xl max-md:text-2xl mt-5 text-white', anton.className)}>Top Cryptocurrency Discord Servers to Join in 2024: Your Gateway to the Future of Crypto Communities 📈</h1>
                <p className="text-neutral-300">{"EncryptMan • 16 Feb"}</p>
                <div className="mt-5">
                    <h2 className={cn('text-2xl mt-5 text-white', anton.className)}>1. CoinShot 🚀</h2>
                    <p className=" pt-2">{"Welcome to CoinShot 🚀, our official server! With our cutting-edge cryptocurrency bot providing real-time market data and indicators, join our small, friendly community for frequent updates, easy networking, and a welcoming atmosphere. Connect with like-minded individuals and stay ahead in the ever-evolving world of crypto!"}</p>
                    <ul className="mt-2 ml-5">
                        <li>✅ Frequent market updates 🔄</li>
                        <li>✅ A small, easy-to-follow community 😄</li>
                        <li>✅ Easy networking and friend-making opportunities 🤝</li>
                    </ul>
                    <Button className="my-3 mx-5" asChild>
                        <Link 
                            href={'https://discord.gg/etHmQud3ep'} 
                            className="flex gap-2 items-center text-white">
                            <DiscordLogo className="w-6 h-6" />
                            <span className="text-md">{" Join CoinShot 🚀"}</span>
                        </Link>
                    </Button>
                    <Image src={'/blog/coinshot-server.png'} width={1000} height={300} alt="CoinShot discord server" className="rounded-xl overflow-hidden mt-3" />
                </div>
                <div className="mt-10">
                    <h2 className={cn('text-2xl mt-5 text-white', anton.className)}>2. Coin Corner</h2>
                    <p className=" pt-2">{"Coin Corner emerges as a leading cryptocurrency community, experiencing rapid growth and offering a plethora of engaging activities. With its own token, Discorner (DSC), rewarding contributors, Coin Corner stands out for:"}</p>
                    <ul className="mt-2 ml-5">
                        <li>✅ Diverse games and activities 🎮</li>
                        <li>✅ Regular airdrops and giveaways 🎁</li>
                        <li>✅ Exclusive trade with founder opportunities 💼</li>
                        <li>✅ Multilingual support in 9 languages 🌐</li>
                    </ul>
                    <Button className="my-3 mx-5" asChild>
                        <Link 
                            href={'https://discord.gg/pgP8erXvs7'} 
                            className="flex gap-2 items-center text-white">
                            <DiscordLogo className="w-6 h-6" />
                            <span className="text-md">{" Join Coin Corner"}</span>
                        </Link>
                    </Button>
                    <Image src={'/blog/coincorner-server.png'} width={1000} height={300} alt="Coin corner discord server" className="rounded-xl overflow-hidden mt-3" />
                </div>
            </article>
        </main>
    )
}