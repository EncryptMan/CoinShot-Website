import { fetchGuildCommands } from "@/app/lib/actions";
import Command from "./_components.tsx/Command";
import { Card } from "@/components/ui/card";
import DashboardPage from "../_components/DashboardPage";


export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const guildCommands = await fetchGuildCommands(id);

    return (
        <DashboardPage>
            <h1 className="text-2xl font-semibold w-full">Commands</h1>
            <h2 className="text-lg text-neutral-400 w-full">All commands below can also be used using the <span className="font-bold">!</span> prefix.</h2>
            {guildCommands === null ? "Oops! 😕 We're unable to load the commands at the moment. Could you please refresh the page? 🔄" :
                <Card className="flex flex-col gap-3 m-0 mt-3 p-3 bg-gray-900 w-full">
                    <Command name="price" description="Shows price of cryptocurrency" enabled={guildCommands.price} guildId={id} />
                    <Command name="chart" description="Shows chart of cryptocurrency" enabled={guildCommands.chart} guildId={id} />
                    <Command name="heatmap" description="Shows heatmap of cryptocurrency market" enabled={guildCommands.heatmap} guildId={id} />
                    <Command displayName="fear-greed-index" name="fearGreedIndex" description="Shows fear and greed index" enabled={guildCommands.fearGreedIndex} guildId={id} />
                    <Command name="meme" description="Shows a random meme" enabled={guildCommands.meme} guildId={id} />
                </Card>
            }
        </DashboardPage>
    );
}