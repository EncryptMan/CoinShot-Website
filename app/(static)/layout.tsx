import Link from "next/link"
import Navbar from "../components/Navbar"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            {children}
            <footer className='mt-5 border-t border-slate-600 flex justify-between p-2 px-5 text-neutral-400'>
                <p>© 2023 CoinShot</p>
                <a href="http://www.freepik.com" className="hidden"></a>
                <div className="flex gap-3 max-sm:gap-1">
                    <Link href='/privacy'>Privacy Policy</Link>
                    <Link href='/terms'>Terms of Service</Link>
             </div>
            </footer>
        </main>
    )
}
