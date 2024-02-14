import Navbar from "@/app/components/Navbar"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

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
        <div className="w-full flex flex-col items-center justify-center ">
            <Navbar />
            {children}
        </div>
    )
}
