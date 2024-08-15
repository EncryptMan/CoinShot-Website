import { fetchGuildCustomAI, fetchGuildCustomBot } from "@/app/lib/actions";
import DashboardPage from "../_components/DashboardPage";
import { notFound } from "next/navigation";
import BotEditor from "./_components/BotEditor";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const guildCustomBot = await fetchGuildCustomBot(id);
    const guildCustomAI = await fetchGuildCustomAI(id);

    if (!guildCustomBot || !guildCustomAI) {
        notFound();
    }

    return (
        <DashboardPage>
            <h1 className="text-2xl font-semibold w-full">Personalize</h1>
            <h2 className="text-lg text-neutral-400 w-full">{"Personalize CoinShot Bot to your liking"}</h2>
            <BotEditor guildCustomBot={guildCustomBot} guildCustomAI={guildCustomAI} className="mt-4" />
        </DashboardPage>
    );
}