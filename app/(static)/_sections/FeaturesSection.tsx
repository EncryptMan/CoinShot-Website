import { anton, verala } from "@/app/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaBitcoin, FaChartArea, FaRobot } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";


export default function FeaturesSection() {
    return (
        <section id="features" className={cn('py-5 my-10 px-5 bg-discord', verala.className)}>
            <div className="mt-10 mb-10 grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 mx-auto max-w-5xl gap-10 text-center place-items-center text-neutral-200">
                <div className="flex flex-col items-center max-w-60">
                    <FaBitcoin size={50} className="min-h-10" />
                    <p className="font-semibold text-lg mt-3">Crypto Payments</p>
                    <p className="text-neutral-400">Create invoices or set up a payment gateway.</p>
                </div>
                <div className="flex flex-col items-center max-w-60">
                    <FaChartArea size={50} className="min-h-10" />
                    <p className="font-semibold text-lg mt-3">Real-Time Market Data</p>
                    <p className="text-neutral-400">View the latest charts, prices, and indicators.</p>
                </div>
                <div className="flex flex-col items-center max-w-60">
                    <FaRobot size={50} className="min-h-10" />
                    <p className="font-semibold text-lg mt-3">CoinShot AI</p>
                    <p className="text-neutral-400">Receive AI-generated analysis, news and updates.</p>
                </div>
                <div className="flex flex-col items-center max-w-60">
                    <FaGear size={50} className="min-h-10" />
                    <p className="font-semibold text-lg mt-3">Automate Updates</p>
                    <p className="text-neutral-400">Get news and updates delivered to your server.</p>
                </div>
            </div>
        </section>
    );
}