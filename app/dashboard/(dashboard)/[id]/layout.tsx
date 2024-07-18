import Sidebar from "./_components/Sidebar";
import Navbar from './_components/Navbar';
import { Toaster } from "@/components/ui/toaster"
import ActiveGuildIdProvider from "./_components/ActiveIdProvider";


export default function Layout({ params, children }: { params: { id: string }, children: React.ReactNode }) {

    const { id } = params;

    return (
        <ActiveGuildIdProvider activeId={id}>
            <main className='flex flex-col h-screen'>
                <Navbar />
                <div className="flex w-full flex-grow" style={{ height: 'calc(100vh - 81px)' }}>
                    <Sidebar className='hidden lg:block' />
                    {children}
                </div>
            </main>
            <Toaster />
        </ActiveGuildIdProvider>
    )
}