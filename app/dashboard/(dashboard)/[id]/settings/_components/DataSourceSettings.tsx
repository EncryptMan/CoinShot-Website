'use client'

import { LoadingSpinner } from "@/app/components/LoadingSpinner"
import { setGuildDataSource } from "@/app/lib/actions"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"


export default function DataSourceSetting({ guildId, sources, currentSource }: { guildId: string, sources: string[], currentSource: string }) {
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
        <div className="rounded-lg flex items-center p-3 justify-between bg-slate-700 px-5">
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
        </div>
    )
}