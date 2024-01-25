import { fetchGuild } from "@/app/lib/actions";
import Image from "next/image";
import { notFound } from "next/navigation";
import DashboardLogs from "./_components/DashboardLogs";
import { Suspense } from "react";
import ServerProfile from "./_components/ServerProfile";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const guild = await fetchGuild(id);
    
    if (!guild) {
        notFound();
    }

    return (
        <div className="flex-grow items-center flex flex-col p-10 gap-7">
            <ServerProfile guild={guild} />
            <Suspense fallback={<DashboardLogs.Skeleton />}>
                <DashboardLogs guildId={id} />
            </Suspense>
        </div>
    );
}