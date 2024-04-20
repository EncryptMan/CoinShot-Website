import { fetchGuildAutomations, fetchGuildChannels } from "@/app/lib/actions";
import { Card } from "@/components/ui/card";
import BaseAutomation from "./_components/BaseAutomation";
import DashboardPage from "../_components/DashboardPage";
import TimeBasedAutomation from "./_components/TimeBasedAutomation";
import NewsAutomation from "./_components/NewsAutomation";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const guildAutomations = await fetchGuildAutomations(id);
    const guildChannels = await fetchGuildChannels(id);

    return (
        <DashboardPage>
            <h1 className="text-2xl font-semibold w-full">Automations</h1>
            <h2 className="text-lg text-neutral-400 w-full">Make sure Bot has the <span className="font-semibold">{'"Send Message"'}</span> permission in the selected channels. Otherwise, the automations will not work.</h2>
            {guildAutomations === null ? "Oops! 😕 We're unable to load the automations right now. Could you please refresh the page? 🔄" :
                Array.isArray(guildChannels) ?
                <div className="mt-4 w-full">
                        <NewsAutomation
                            key="news"
                            displayName="News"
                            name="news"
                            description="Send various news right into your server"
                            enabled={guildAutomations.news}
                            currentChannelId={guildAutomations.newsChannelId}
                            channels={guildChannels}
                            selectedCategories={guildAutomations.newsCategories}
                            selectedMessageStyle={guildAutomations.newsMessageStyle}
                            />
                        <TimeBasedAutomation
                            key="heatmap"
                            displayName="Heatmap"
                            name="heatmap"
                            description="Get a bird's eye view of the cryptocurrency market with the heatmap"
                            enabled={guildAutomations.heatmap}
                            currentChannelId={guildAutomations.heatmapChannelId}
                            channels={guildChannels}
                            times={guildAutomations.heatmapTimes}
                            />
                        <TimeBasedAutomation
                            key="fearGreedIndex"
                            displayName="Fear and Greed Index"
                            name="fearGreedIndex"
                            description="Send the fear and greed index of the cryptocurrency market"
                            enabled={guildAutomations.fearGreedIndex}
                            currentChannelId={guildAutomations.fearGreedIndexChannelId}
                            channels={guildChannels}
                            times={guildAutomations.fearGreedIndexTimes}
                            />
            </div>
                    : <span className="text-left text-red-500 w-full mt-3 text-lg">{guildChannels.error}</span>
            }
        </DashboardPage>
    );
}