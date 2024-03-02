import { fetchGuild } from "@/app/lib/actions";
import Image from "next/image";
import { notFound } from "next/navigation";
import DashboardLogs from "./_components/DashboardLogs";
import { Suspense } from "react";
import ServerProfile from "./_components/ServerProfile";
import DashboardPage from "./_components/DashboardPage";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const guild = await fetchGuild(id);
    
    if (!guild) {
        notFound();
    }

    return (
        <DashboardPage>
            <ServerProfile guild={guild} />
            <Suspense fallback={<DashboardLogs.Skeleton className="mt-3" />}>
                <DashboardLogs guildId={id} className="mt-3" />
            </Suspense>
        </DashboardPage>
    );
}