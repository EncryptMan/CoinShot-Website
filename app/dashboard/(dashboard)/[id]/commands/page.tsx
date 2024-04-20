import { fetchGuildCommands, setGuildCommandEnabled } from "@/app/lib/actions";
import Command from "./_components.tsx/Command";
import { Card } from "@/components/ui/card";
import DashboardPage from "../_components/DashboardPage";


export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const guildCommands = await fetchGuildCommands(id);

    return (
        <DashboardPage>
            <h1 className="text-2xl font-semibold w-full">Commands</h1>
            {guildCommands === null ? "Oops! 😕 We're unable to load the commands at the moment. Could you please refresh the page? 🔄" :
                <Card className="flex flex-col gap-3 m-0 mt-3 p-3 bg-gray-900 w-full">
                    <Command name="price" description="Check the price of a coin or token" enabled={guildCommands.price} guildId={id} />
                    <Command name="chart" description="See the chart of a coin or token" enabled={guildCommands.chart} guildId={id} />
                    <Command name="information" description="Get information about a coin or token" enabled={guildCommands.information} guildId={id} />
                    <Command name="news" description="View the latest news in the cryptocurrency market" enabled={guildCommands.news} guildId={id} />
                    <Command name="watchlist" description="Displays your watchlist or the watchlist of the specified user" enabled={guildCommands.watchlist} guildId={id} />
                    <Command name="convert" description="Convert a coin or token to another" enabled={guildCommands.convert} guildId={id} />
                    <Command displayName="fear-greed-index" name="fearGreedIndex" description="View fear and greed index of cryptocurrency market" enabled={guildCommands.fearGreedIndex} guildId={id} />
                    <Command name="heatmap" description="View heatmap of cryptocurrency market" enabled={guildCommands.heatmap} guildId={id} />
                    <Command name="ticTacToe" displayName="tic-tac-toe" description="Play a game of tic-tac-toe with bot or another user" enabled={guildCommands.ticTacToe} guildId={id} />
                    <Command name="meme" description="Shows a random meme" enabled={guildCommands.meme} guildId={id} />
                </Card>
            }
        </DashboardPage>
    );
}