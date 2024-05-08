import { anton } from "@/app/lib/fonts"
import { cn } from "@/lib/utils"
import { IoSparklesSharp } from "react-icons/io5"
import { FaCheck } from "react-icons/fa";


export default function Page() {
    return (
        <main className="w-full max-w-5xl max-sm:pt-5 px-5 mt-16 mx-auto flex-grow">
            <h1 className={cn("text-4xl font-semibold  text-neutral-200 w-full max-md:text-center flex items-center justify-center", anton.className)}><IoSparklesSharp fill="#FACC15" size={40} />&nbsp;Premium Plans</h1>
            <h2 className="text-2xl text-neutral-400 mt-2 text-center">Take your experience to the next level 🚀</h2>
            <div className="max-w-6xl w-full mx-auto px-10 mt-7 grid grid-cols-3 gap-5">
                <div className="bg-gray-700 rounded-xl p-5">
                    <h3 className="text-2xl font-semibold text-neutral-200">Personal</h3>
                    <p className="text-lg text-neutral-400 mt-2">For personal usage</p>
                    <ul className="mt-5 text-left text-neutral-400">
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> No Ads</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Access to all commands</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Unlimited AI chat</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Available on all servers</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Available on DM</li>
                    </ul>
                </div>
                <div className="bg-gray-700 rounded-xl p-5">
                    <h3 className="text-2xl font-semibold text-neutral-200">Pro</h3>
                    <p className="text-lg text-neutral-400 mt-2">Unlock all features for your Server</p>
                    <ul className="mt-5 text-left text-neutral-400">
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> No Ads</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Access to all commands</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Access to all automations</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Unlimited AI chat</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Priority Support</li>
                    </ul>
                </div>
                <div className="bg-gray-700 rounded-xl p-5">
                    <h3 className="text-2xl font-semibold text-neutral-200">Business</h3>
                    <p className="text-lg text-neutral-400 mt-2">For business servers</p>
                    <ul className="mt-5 text-left text-neutral-400">
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Everything in Pro</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Custom Bot</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Your own Branding</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Custom Features</li>
                    <li className="flex items-center gap-1"><FaCheck className="text-green-400" size={15} /> Dedicated Hosting</li>
                    </ul>
                    </div>
            </div>  
        </main>
    )
}
