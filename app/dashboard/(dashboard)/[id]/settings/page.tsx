import { fetchGuildSettings } from "@/app/lib/actions";

import DataSourceSetting from "./_components/DataSourceSettings";
import { notFound } from "next/navigation";


export default async function Page({ params }: { params: { id: string }}) {
    const guildId = params.id;
    const sources = ["Binance", "OKX", "All Exchanges"]
    const guildSettings = await fetchGuildSettings(guildId);

    if (!guildSettings) {
        notFound();
    }

    return (
        <div className="flex-grow p-5">
            <h1 className="text-4xl my-4">Settings</h1>
            <DataSourceSetting guildId={guildId} sources={sources} currentSource={guildSettings?.dataSource ?? ''} />
        </div>
    );
}

