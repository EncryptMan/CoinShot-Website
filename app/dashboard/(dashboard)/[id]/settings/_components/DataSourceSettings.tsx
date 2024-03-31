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
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { DataSource } from "@prisma/client"
import { useState } from "react"


export default function DataSourceSetting({ guildId, currentSource, className }: { guildId: string, currentSource: string, className?: string}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const { toast } = useToast()

    const sources: string[] = Object.values(DataSource);

    function onValueChange(value: string) {
        setIsError(false)
        setIsLoading(true)

        setGuildDataSource(guildId, value)
            .then((success) => {
                setIsLoading(false)
                setIsError(!success)
                // toast(success ? `Data source updated to ${value}` : "Failed to update data source")
                toast({ title: success ? "Success" : "Error", description: success ? `Data source updated to ${value}. Changes may take up to an hour to reflect.` : "Failed to update data source", variant: success ? "success" : "error" })
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