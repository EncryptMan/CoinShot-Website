import Sidebar from "./_components/Sidebar";
import Navbar from './_components/Navbar';
import { Toaster } from "@/components/ui/toaster"
import ActiveIdProvider from "./_components/ActiveIdProvider";


export default function Layout({ params, children }: { params: { id: string }, children: React.ReactNode }) {

    const { id } = params;

    return (
        <ActiveIdProvider activeId={id}>
            <main className='h-screen flex flex-col'>
                <Navbar />
                <div className="flex w-full flex-grow">
                    <Sidebar className='hidden lg:block' />
                    {children}
                </div>
            </main>
            <Toaster />
        </ActiveIdProvider>
    )
}