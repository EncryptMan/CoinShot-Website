'use client'

import { LoadingSpinner } from "@/app/components/LoadingSpinner"
import { setGuildDataSource } from "@/app/lib/actions"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner"


export default function DataSourceSetting({ guildId, sources, currentSource, className }: { guildId: string, sources: string[], currentSource: string, className?: string}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    function onValueChange(value: string) {
        setIsError(false)
        setIsLoading(true)

        setGuildDataSource(guildId, value)
            .then((success) => {
                setIsLoading(false)
                setIsError(!success)
                toast(success ? `Data source updated to ${value}` : "Failed to update data source")
            })
    }

    return (
        <Card className={cn("w-full flex items-center justify-between py-2 px-4 bg-slate-700", className)}>
            Data Source
            <div>
                <Select defaultValue={currentSource} onValueChange={onValueChange}>
                    <SelectTrigger className="w-[180px]">
                        {
                            isLoading
                                ? <LoadingSpinner />
                                : <SelectValue placeholder="" />
                        }
                    </SelectTrigger>
                    <SelectContent>
                        {sources.map((source) => (
                            <SelectItem key={source} value={source}>
                                <span>{source}</span>
                            </SelectItem>
                        ))
                        }
                    </SelectContent>
                </Select>
                {isError && <span className="text-red-500 text-sm pt-2">Error</span>}
            </div>
        </Card>
    )
}