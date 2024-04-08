import { fetchGuildAutomations, fetchGuildChannels } from "@/app/lib/actions";
import { Card } from "@/components/ui/card";
import Automation from "./_components/Automation";
import DashboardPage from "../_components/DashboardPage";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const guildAutomations = await fetchGuildAutomations(id);
    const guildChannels = await fetchGuildChannels(id);

    return (
        <DashboardPage>
            <h1 className="text-2xl font-semibold w-full">Automations</h1>
            <h2 className="text-lg text-neutral-400 w-full">Make sure Bot has the <span className="font-semibold">{'"Send Message"'}</span> permission in the selected channels. Otherwise, the automations will not work.</h2>
            {guildAutomations === null ? "Oops! 😕 We're unable to load the automations right now. Could you please refresh the page? 🔄" :
                Array.isArray(guildChannels) ? <Card className="flex flex-col gap-3 mt-5 p-3 bg-gray-900 w-full">
                    <Automation
                        displayName="News"
                        name="news"
                        description="Send important cryptocurrency news right into your server"
                        enabled={guildAutomations.news}
                        currentChannelId={guildAutomations.newsChannelId}
                        channels={guildChannels}
                    />
                    <Automation
                        displayName="Heatmap"
                        name="heatmap"
                        description="Get a bird's eye view of the cryptocurrency market with the heatmap"
                        enabled={guildAutomations.heatmap}
                        currentChannelId={guildAutomations.heatmapChannelId}
                        channels={guildChannels}
                        times={guildAutomations.heatmapTimes}
                    />
                    <Automation
                        displayName="Fear and Greed Index"
                        name="fearGreedIndex"
                        description="Send the fear and greed index of the cryptocurrency market"
                        enabled={guildAutomations.fearGreedIndex}
                        currentChannelId={guildAutomations.fearGreedIndexChannelId}
                        channels={guildChannels}
                        times={guildAutomations.fearGreedIndexTimes}
                    />
                    <Automation
                        displayName="Bitcoin Halving Countdown"
                        name="halvingCountdown"
                        description="Send the time remaining until the next Bitcoin halving event"
                        enabled={guildAutomations.halvingCountdown}
                        currentChannelId={guildAutomations.halvingCountdownChannelId}
                        channels={guildChannels}
                        times={guildAutomations.halvingCountdownTimes}
                    />
                </Card>
                    : <span className="text-left text-red-500 w-full mt-3 text-lg">{guildChannels.error}</span>
            }
        </DashboardPage>
    );
}