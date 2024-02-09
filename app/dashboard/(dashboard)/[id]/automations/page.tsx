import { fetchGuildAutomations, fetchGuildChannels } from "@/app/lib/actions";
import { Card } from "@/components/ui/card";
import Automation from "./_components/Automation";

export default async function Page({ params }: { params: { id: string }}) {
    const { id } = params;
    const guildAutomations = await fetchGuildAutomations(id);
    const guildChannels = await fetchGuildChannels(id);
    
    return (
        <div className="p-10 flex-grow h-full">
            <h1 className="text-2xl font-semibold">Automations</h1>
            {guildAutomations === null ? "Unable to load automations. Please refresh the page." :
                <Card className="flex flex-col gap-3 mt-5 p-3 bg-gray-900">
                    <Automation 
                        displayName="Heatmap" 
                        name="heatmap" 
                        description="Send cryptocurrency market heatmap daily" 
                        enabled={guildAutomations.heatmap} 
                        currentChannelId={guildAutomations.heatmapChannelId} 
                        channels={guildChannels} 
                    />
                    <Automation 
                        displayName="Fear and Greed Index" 
                        name="fearGreedIndex" 
                        description="Send fear and green index daily" 
                        enabled={guildAutomations.heatmap} 
                        currentChannelId={guildAutomations.fearGreedIndexChannelId} 
                        channels={guildChannels} 
                    />
                    <Automation 
                        displayName="Bitcoin Halving Countdown" 
                        name="halvingCountdown" 
                        description="Send bitcoin halving countdown daily" 
                        enabled={guildAutomations.halvingCountdown} 
                        currentChannelId={guildAutomations.halvingCountdownChannelId} 
                        channels={guildChannels} 
                    />
                </Card>
            }
        </div>
    );
}