import Image from 'next/image'
import Link from 'next/link'
import AuthButton from '../components/AuthButton'
import Navbar from '../components/Navbar'
import DiscordLogo from '../components/DiscordLogo'
import { Button } from '@/components/ui/button'

import { Anton, Varela_Round } from 'next/font/google'
import { cn } from '@/lib/utils'
import PricingSection from '../components/Pricing'
import { Card } from '@/components/ui/card'

const anton = Anton({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '400'],
})

const verala = Varela_Round({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
})

export default function Home() {
  return (
    <div className='text-white'>
      <main className="flex gap-1 items-center justify-center w-full pt-10 max-sm:pt-5 flex-col lg:flex-row px-5 mt-15">
        <div className='flex items-center justify-center'>

          <div className="flex flex-col gap-7 max-sm:gap-3 justify-between max-w-lg max-lg:items-center max-lg:pb-5 max-lg:text-center">

            <h1 className={cn("text-5xl font-semibold  text-neutral-200", anton.className)}>Cryptocurrency Market Bot For Discord 📈</h1>
            <p className={cn("text-xl max-sm:text-lg text-neutral-400", verala.className)}>Stay up to date with crypto market with instant access to real-time market data.</p>
            <div className="flex items-center justify-start gap-5 text-xl max-sm:text-base">
              <Button className='h-14 text-white' size={'lg'} asChild>
                <Link href={process.env.BOT_INVITE_URL ?? ''} aria-current="page">
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
      </main>

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
      {/* <section id='pricing'>
        <PricingSection />
      </section> */}

      <section className={cn('w-full p-5', verala.className)} id='support'>
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
    </div>
  )
}