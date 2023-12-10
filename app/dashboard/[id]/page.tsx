import Link from "next/link";
import SideNav from "../../components/SideNav";
import AuthButton from "@/app/components/AuthButton";

export default function Page() {
    return (
    <main className="h-full w-full p-2">
        <nav className="w-full bg-gray-600 rounded-md m-2 p-2 flex items-center justify-center text-center">
        <h1 className="text-3xl text-white">Dashboard</h1>
        <AuthButton />
        </nav>
        <div className="flex w-full gap-4 h-screen">
            <SideNav />
            <div className="bg-slate-600 rounded-xl grow ">
                <div className="flex w-full h-full p-2 gap-2 flex-col">
                    <div className="bg-slate-500 h-24 w-full rounded-lg">

                    </div>
                    <div className="bg-slate-500 h-24 w-full rounded-lg">

                    </div>
                    <div className="bg-slate-500 h-24 w-full rounded-lg">

                    </div>
                    <div className="bg-slate-500 h-24 w-full rounded-lg">

                    </div>
                </div>
            </div>
        </div>
    </main>
    );
}