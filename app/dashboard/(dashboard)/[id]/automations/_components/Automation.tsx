'use client'

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { ActiveIdContext } from "@/app/dashboard/_components/ActiveIdProvider";
import { setGuildAutomationChannel, setGuildAutomationEnabled } from "@/app/lib/actions";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useContext, useState } from "react";
import { toast } from "sonner";


export default function Automation({ name, displayName, description, enabled, channels, currentChannelId }: { name: string, displayName?: string, description: string, enabled: boolean, channels: { id: string, name: string }[], currentChannelId: string | null }) {
    const guildId = useContext(ActiveIdContext)

    const [automationEnabled, setAutomationEnabled] = useState(enabled)
    const [isStateLoading, setIsStateLoading] = useState(false)
    const [isStateError, setIsStateError] = useState(false)

    const [selectedChannelId, setSelectedChannelId] = useState(currentChannelId ?? '')
    const [isChannelLoading, setIsChannelLoading] = useState(false)
    const [isChannelError, setIsChannelError] = useState(false)


    function toggle(state: boolean) {
        setIsStateLoading(true)
        setIsStateError(false)

        setGuildAutomationEnabled(guildId, name, state)
            .then((success) => {
                setIsStateLoading(false)

                const action = state ? 'enable' : 'disable'

                if (success) {
                    setAutomationEnabled(state)
                    toast(`${displayName} automation successfully ${action}d`)
                } else {
                    setIsStateError(true)
                    toast(`Failed to ${action} ${displayName} automation`)
                }
            })

    }

    function onChannelChange(newChannelId: string) {
        setIsChannelLoading(true)
        setIsChannelError(false)

        setGuildAutomationChannel(guildId, name, newChannelId)
            .then((success) => {
                setIsChannelLoading(false)

                if (success) {
                    setSelectedChannelId(newChannelId)
                    toast(`${displayName} automation channel successfully updated`)
                } else {
                    setIsChannelError(true)
                    toast(`Failed to update ${displayName} automation channel`)
                }
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
            <p className="mt-4">Channel</p>
            <Select value={selectedChannelId} onValueChange={onChannelChange}>
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
            {isChannelError && <p className="text-sm text-red-500">Failed to update channel</p>}
        </Card>
    );
}