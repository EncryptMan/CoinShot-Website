import { fetchGuildCommands } from "@/app/lib/actions";
import Command from "./_components.tsx/Command";
import { Card } from "@/components/ui/card";


export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const guildCommands = await fetchGuildCommands(id);

    return (
        <div className="p-10 flex-grow h-full">
            <h1 className="text-2xl font-semibold">Commands</h1>
            <h2 className="text-lg text-neutral-400">All commands below can also be used using the <span className="font-bold">!</span> prefix.</h2>
            {guildCommands === null ? "Unable to load commands. Please refresh the page." :
                <Card className="flex flex-col gap-3 mt-5 p-3 bg-gray-900">
                    <Command name="price" description="Shows price of cryptocurrency" enabled={guildCommands.price} guildId={id} />
                    <Command name="chart" description="Shows chart of cryptocurrency" enabled={guildCommands.chart} guildId={id} />
                    <Command name="heatmap" description="Shows heatmap of cryptocurrency market" enabled={guildCommands.heatmap} guildId={id} />
                    <Command displayName="fear-greed-index" name="fearGreedIndex" description="Shows fear and greed index" enabled={guildCommands.fearGreedIndex} guildId={id} />
                    <Command name="meme" description="Shows a random meme" enabled={guildCommands.meme} guildId={id} />
                </Card>
            }
        </div>
    );
}