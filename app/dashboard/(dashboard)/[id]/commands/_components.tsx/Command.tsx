'use client'

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { setGuildCommandEnabled } from "@/app/lib/actions";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export default function Command(
    { name, displayName, description, enabled, guildId }
        : {
            name: string,
            displayName?: string,
            description: string,
            enabled: boolean,
            guildId: string,
        }
) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [commandEnabled, setCommandEnabled] = useState(enabled)

    function toggle(state: boolean) {
        setIsLoading(true)
        setError(false)

        try {

            // Server action
            setGuildCommandEnabled(guildId, name, state)
                .then((success) => {
                    if (success) setCommandEnabled(state)
                    setIsLoading(false)
                    setError(!success)

                    const action = state ? "enable" : "disable"
                    const commandName = displayName ?? name
                    const successMessage = `/${commandName} command ${action}d`
                    const errorMessage = `Failed to ${action} ${commandName} command`
                    toast(success ? successMessage : errorMessage)
                })
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            setError(true)
        } 
    }

    return (
        <Card className="w-full flex items-center justify-between py-2 px-4 bg-gray-700">
            <div>
                <p className="text-lg font-bold text-neutral-200">/{displayName ?? name}</p>
                <p className="text-sm text-neutral-400">{description}</p>
            </div>
            <div className="w-10 flex justify-center">
                {isLoading ?
                    <LoadingSpinner /> :
                    <Switch defaultChecked={enabled} checked={commandEnabled} onCheckedChange={toggle} className="data-[state=unchecked]:bg-gray-900" />
                }
                {error && <span className="text-red-500 text-sm mt-2">Error</span>}
            </div>
        </Card>
    )
}