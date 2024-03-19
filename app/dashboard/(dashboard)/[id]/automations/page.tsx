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
                        displayName="Heatmap"
                        name="heatmap"
                        description="Send cryptocurrency market heatmap daily"
                        enabled={guildAutomations.heatmap}
                        currentChannelId={guildAutomations.heatmapChannelId}
                        channels={guildChannels}
                        time={guildAutomations.heatmapTime}
                    />
                    <Automation
                        displayName="Fear and Greed Index"
                        name="fearGreedIndex"
                        description="Send fear and green index daily"
                        enabled={guildAutomations.fearGreedIndex}
                        currentChannelId={guildAutomations.fearGreedIndexChannelId}
                        channels={guildChannels}
                        time={guildAutomations.fearGreedIndexTime}
                    />
                    <Automation
                        displayName="Bitcoin Halving Countdown"
                        name="halvingCountdown"
                        description="Send bitcoin halving countdown daily"
                        enabled={guildAutomations.halvingCountdown}
                        currentChannelId={guildAutomations.halvingCountdownChannelId}
                        channels={guildChannels}
                        time={guildAutomations.halvingCountdownTime}
                    />
                </Card>
                    : <span className="text-left text-red-500 w-full mt-3 text-lg">{guildChannels.error}</span>
            }
        </DashboardPage>
    );
}