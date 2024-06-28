import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import Sidebar from "./_components/Sidebar"
import Navbar from "./_components/Navbar"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <>
            <main className='flex flex-col h-screen'>
                <Navbar />
                <div className="flex w-full flex-grow" style={{ height: 'calc(100vh - 81px)' }}>
                    <Sidebar className='hidden lg:block' />
                    {children}
                </div>
            </main>
            <Toaster />
        </>
    )
}
