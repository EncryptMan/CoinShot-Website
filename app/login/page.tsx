"use client";

import { useFormState } from "react-dom";
// import { authenticate } from "../lib/actions";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
// import { auth, signIn } from "@/auth";



export default function Page() {

    // const { data: session } = useSession();

    // if (session && session.user) {
    //     redirect("/");
    // }

    // function handleLogIn() {
    //     // signIn("discord", { callbackUrl: "/dashboard" });
    //     signIn('discord')
    // }

    // const [state, dispatch] = useFormState(authenticate, undefined);

    return (
        // <SessionProvider>

        <main className="h-screen w-full flex flex-col items-center justify-center gap-2">
            <h1 className="text-5xl text-white">Login</h1>
            {/** <form action={dispatch}> **/}

                <button
                    className="rounded-xl p-2 text-xl bg-blue-500 hover:bg-blue-600 text-white"
                    type="submit"
                    onClick={() => signIn("discord")}
                >
                    Login With Discord
                </button>
            {/* </form>  */}
        </main>
        // </SessionProvider>
    );
}