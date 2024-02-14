import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginButton from "../components/LoginButton";
import Navbar from "../components/Navbar";
import Image from "next/image";


export default async function Page() {

    const session = await getServerSession()

    if (session) {
        redirect('/')
    }

    return (

        <div className='text-white'>
            <Navbar />
            <main className="flex gap-1 items-center justify-center w-full pt-10 max-sm:pt-5 flex-col lg:flex-row px-5 mt-15">
                <div className="flex items-center gap-9 flex-col">

                    <h1 className="text-5xl text-white text-center">Login required to continue</h1>
                    <div className="flex items-center gap-5">
                        <Image className="rounded-full overflow-hidden" height={100} width={100} src="/icon.png" alt="CoinShot icon" />
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <Image className="rounded-full overflow-hidden" height={100} width={100} src="/discord-icon.jpg" alt="Discord icon" />
                    </div>
                    <LoginButton />
                </div>
            </main>
        </div>
    );
}