import Link from "next/link";
import ServerCard from "../components/ServerCard";
// import { use, useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/auth.options";
import axios from "axios";
import { fetchGuilds } from "../lib/actions";
import GuildRefreshButton from "../components/GuildRefreshButton";
import { Guild } from "@prisma/client";


export default async function Page() {

    const session = await getServerSession(authOptions);
    let guilds: Guild[] = []

    if (session)
        guilds = await fetchGuilds(session);

    return (
        <main className="h-full w-full p-2">
            <nav className="w-full bg-gray-600 rounded-md m-2 p-2 flex items-center justify-center">
                <h1 className="text-3xl text-white">Your Servers</h1>
                <GuildRefreshButton />
            </nav>
            <div className="flex w-full gap-4 h-screen">
                <div className="bg-slate-600 rounded-xl grow ">
                    <div className="w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {guilds.map((guild: Guild) => (
                            <ServerCard key={guild.id} guild={guild} />
                        ))
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}
