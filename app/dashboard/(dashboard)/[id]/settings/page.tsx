import { fetchGuildSettings } from "@/app/lib/actions";

import DataSourceSetting from "./_components/DataSourceSettings";
import { notFound } from "next/navigation";
import DashboardPage from "../_components/DashboardPage";


export default async function Page({ params }: { params: { id: string }}) {
    const guildId = params.id;
    const sources = ["Binance", "OKX", "All Exchanges"]
    const guildSettings = await fetchGuildSettings(guildId);

    if (!guildSettings) {
        notFound();
    }

    return (
        <DashboardPage>
            <h1 className="text-2xl font-semibold w-full">Settings</h1>
            <DataSourceSetting guildId={guildId} sources={sources} currentSource={guildSettings?.dataSource ?? ''} className="mt-3" />
        </DashboardPage>
    );
}

