'use client'

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { ActiveIdContext } from "@/app/dashboard/(dashboard)/[id]/_components/ActiveIdProvider";
import { setGuildAutomationChannel, setGuildAutomationEnabled } from "@/app/lib/actions";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useContext, useState } from "react";


export default function Automation({ name, displayName, description, enabled, channels, currentChannelId }: { name: string, displayName?: string, description: string, enabled: boolean, channels: { id: string, name: string }[], currentChannelId: string | null }) {
    const guildId = useContext(ActiveIdContext)

    const [automationEnabled, setAutomationEnabled] = useState(enabled)
    const [isStateLoading, setIsStateLoading] = useState(false)
    const [isStateError, setIsStateError] = useState(false)

    const [selectedChannelId, setSelectedChannelId] = useState(currentChannelId ?? '')
    const [isChannelLoading, setIsChannelLoading] = useState(false)
    const [channelError, setChannelError] = useState(null as string | null)

    const { toast } = useToast()


    function toggle(state: boolean) {
        setIsStateLoading(true)
        setIsStateError(false)

        setGuildAutomationEnabled(guildId, name, state)
            .then((success) => {
                setIsStateLoading(false)

                const action = state ? 'enable' : 'disable'

                if (success) {
                    setAutomationEnabled(state)
                    // toast(`${displayName} automation successfully ${action}d`)
                    toast({ title: "Success", description: `${displayName} automation successfully ${action}d`, variant: "success" })
                } else {
                    setIsStateError(true)
                    // toast(`Failed to ${action} ${displayName} automation`)
                    toast({ title: "Error", description: `Failed to ${action} ${displayName} automation`, variant: "error" })
                }
            })

    }

    function onChannelChange(newChannelId: string) {
        setIsChannelLoading(true)
        setChannelError(null)

        setGuildAutomationChannel(guildId, name, newChannelId)
            .then(({ error }) => {
                setIsChannelLoading(false)

                if (error) {
                    setChannelError(error)
                    toast({ title: "Error", description: error, variant: "error" })
                } else {
                    toast({ title: "Success", description: `${displayName} automation channel successfully updated`, variant: "success" })
                }

                setSelectedChannelId(newChannelId)
            })
    }

    return (
        <Card className="w-full py-2 px-4 bg-gray-700">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-lg font-bold text-neutral-200">{displayName}</p>
                    <p className="text-sm text-neutral-400">{description}</p>
                </div>
                <div className="w-10 flex justify-center flex-col">
                    {isStateLoading ?
                        <LoadingSpinner /> :
                        <Switch checked={automationEnabled} onCheckedChange={toggle} className="data-[state=unchecked]:bg-gray-900" />
                    }
                    {isStateError && <span className="text-red-500 text-sm mt-2">Error</span>}
                </div>
            </div>
            <p className={cn("mt-4 text-neutral-400", automationEnabled && 'text-white')}>Channel</p>
            <Select value={selectedChannelId} onValueChange={onChannelChange} disabled={!automationEnabled}>
                <SelectTrigger className="w-full">
                    {
                        isChannelLoading
                            ? <LoadingSpinner />
                            : <SelectValue placeholder="No Channel Selected" />
                    }
                </SelectTrigger>
                <SelectContent>
                    {channels.map((channel) => (
                        <SelectItem key={channel.id} value={channel.id}>
                            <span># {channel.name}</span>
                        </SelectItem>
                    ))
                    }
                </SelectContent>
            </Select>
            {channelError && <p className="text-sm text-red-500">{channelError}</p>}
        </Card>
    );
}