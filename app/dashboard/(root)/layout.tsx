import Navbar from "@/app/components/Navbar"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="w-full flex flex-col items-center justify-center ">
            <Navbar />
            {children}
        </div>
    )
}
