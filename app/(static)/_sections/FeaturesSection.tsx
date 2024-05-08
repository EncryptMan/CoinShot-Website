import { anton, verala } from "@/app/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";


export default function FeaturesSection() {
    return (
        <section id='features' className={cn('py-5 my-10 px-5 bg-discord', verala.className)}>
            <h2 className={cn('text-center text-5xl text-neutral-200 mt-5', anton.className)}>Features</h2>
            <div className='mt-10 mb-10 grid grid-cols-2 mx-auto max-w-2xl gap-7 max-lg:gap-1 max-lg:text-center  max-lg:grid-cols-1 place-items-center'>
                <div className='flex justify-center flex-col'>
                    <h3 className={cn('text-3xl text-neutral-300', anton.className)}>Interactive Charts</h3>
                    <p className='w-60 text-neutral-400'>View chart of any pair and change interval</p>
                </div>
                <Image src={'/chart_command.png'} alt='Interactive charts' height={300} width={300} className='object-fill' />
                <Image src={'/price_command.png'} alt='Price update' height={300} width={300} />
                <div className='max-lg:row-start-3 flex justify-center flex-col max-lg:mt-7'>
                    <h3 className={cn('text-3xl text-neutral-300', anton.className)}>Price updates</h3>
                    <p className='w-60 text-neutral-400'>Check price of any pair from Binance or OKX exchange</p>
                </div>
            </div>
        </section>
    )
}
