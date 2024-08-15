import { anton } from "@/app/lib/fonts"
import { cn } from "@/lib/utils"
import { IoSparklesSharp } from "react-icons/io5"
import { FaCheck } from "react-icons/fa";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Premium Plans',
    description: 'Take your experience to the next level with CoinShot Premium Plans',
}


export default function Page() {
    return (
        <main className="w-full max-w-5xl max-sm:pt-5 px-5 mt-16 mx-auto flex-grow">
            <h1 className={cn("text-4xl font-semibold  text-neutral-200 w-full max-md:text-center flex items-center justify-center", anton.className)}><IoSparklesSharp fill="#FACC15" size={40} />&nbsp;Premium Plans</h1>
            <h2 className="text-2xl text-neutral-400 mt-2 text-center">Take your experience to the next level 🚀</h2>
            <div className="max-w-6xl w-full mx-auto px-10 mt-7 grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:max-w-md max-lg:px-0">
                <div className="bg-gray-700 rounded-xl p-5 flex flex-col justify-between">
                    <div>

                        <h3 className="text-2xl font-semibold text-slate-300">Starter</h3>
                        <p className="text-sm text-neutral-400 mt-2">For casual users and small communities</p>
                        <p className="text-4xl font-semibold text-neutral-200 mt-5">Free</p>
                        <ul className="mt-5 text-left text-neutral-400">
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Ads</li>
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Limited AI chat</li>
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Access to All Commands</li>
                        </ul>
                    </div>
                    <Button className="mt-5 w-full text-neutral-700 bg-slate-300 hover:bg-slate-400" asChild>
                        <Link href={'/invite/premium'} target="_blank">
                            Get Started
                        </Link>
                    </Button>
                </div>
                <div className="bg-gray-700 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold text-yellow-600">Pro</h3>
                        <p className="text-sm text-neutral-400 mt-2">For power users and big communities</p>
                        <p className="text-4xl font-semibold text-neutral-200 mt-5">$3.99/month</p>
                        <ul className="mt-5 text-left text-neutral-400">
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> No Ads</li>
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> 10x more AI chat</li>
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Access to Payment Gateway</li>
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Bot Personalizer</li>
                        </ul>
                    </div>
                    <Button className="mt-5 w-full text-white bg-yellow-600 hover:bg-yellow-700" asChild>
                        <Link href={process.env.SUPPORT_SERVER_URL ?? ''} target="_blank">
                            Upgrade Now
                        </Link>
                    </Button>
                </div>
                <div className="bg-gray-700 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold text-blue-400">Ultimate</h3>
                        <p className="text-sm text-neutral-400 mt-2">For businesses and large communities</p>
                        <p className="text-4xl font-semibold text-neutral-200 mt-5">$9.99/month</p>
                        <ul className="mt-5 text-left text-neutral-400">
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Everything in Pro</li>
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Custom Bot</li>
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Custom Features</li>
                            <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Dedicated Hosting</li>
                        </ul>
                    </div>
                    <Button className="mt-5 w-full text-white bg-blue-500 hover:bg-blue-600" asChild>
                        <Link href={process.env.SUPPORT_SERVER_URL ?? ''} target="_blank">
                            Contact Us
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}
