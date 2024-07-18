'use client'

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { ActiveGuildIdContext } from "@/app/dashboard/(dashboard)/[id]/_components/ActiveIdProvider";
import { setGuildAutomationTimes } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import React, { useContext, useState } from "react";
import BaseAutomation from "./BaseAutomation";


export default function TimeBasedAutomation({ name, displayName, description, enabled, channels, currentChannelId, times, children }: { name: string, displayName?: string, description: string, enabled: boolean, channels: { id: string, name: string }[], currentChannelId: string | null, times: number[], children?: React.ReactNode }) {
    const guildId = useContext(ActiveGuildIdContext)

    const [timesList, setTimesList] = useState(times)
    const [isTimeLoading, setIsTimeLoading] = useState(false)
    const [timeError, setTimeError] = useState(null as string | null)
    const [modifiedTimeIndex, setModifiedTimeIndex] = useState(0)

    const { toast } = useToast()

    function updateTimes(newTimes: number[]) {
        setIsTimeLoading(true)
        setTimeError(null)

        setGuildAutomationTimes(guildId, name, newTimes)
            .then(({ error }) => {
                setIsTimeLoading(false)

                if (error) {
                    setTimeError(error)
                    toast({ title: "Error", description: error, variant: "error" })
                } else {
                    toast({ title: "Success", description: `${displayName} automation time successfully updated`, variant: "success" })
                    setTimesList(newTimes)
                }

            })
    }

    function addTime() {
        setTimesList([...timesList, 0])
        setModifiedTimeIndex(timesList.length)
        updateTimes([...timesList, 0])
    }

    function removeTime(index: number) {
        setModifiedTimeIndex(index)
        updateTimes(timesList.filter((_, i) => i !== index))
    }

    function updateTime(index: number, newTime: number) {
        setModifiedTimeIndex(index)
        updateTimes(timesList.map((time, i) => i === index ? newTime : time))
    }

    return (
        <BaseAutomation name={name} displayName={displayName} description={description} enabled={enabled} channels={channels} currentChannelId={currentChannelId}>
            <div className="w-full">
                <p className={cn("mt-4 text-white text-lg")}>{"Time (UTC)"}</p>
                <div className="flex flex-col gap-1">
                    {
                        timesList.map((time, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between">
                                    <Select key={index} value={time.toString()} onValueChange={(value) => updateTime(index, parseInt(value))}>
                                        <SelectTrigger className="w-full">
                                            {
                                                (isTimeLoading && modifiedTimeIndex === index)
                                                    ? <LoadingSpinner />
                                                    : <SelectValue placeholder="00:00" />
                                            }
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 24 }, (_, i) => i).map((time) => (
                                                <SelectItem key={time} value={time.toString()}>
                                                    {time < 10 ?
                                                        <span>0{time}:00</span> :
                                                        <span>{time}:00</span>
                                                    }
                                                </SelectItem>
                                            ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    {
                                        (timesList.length > 1) && <Button onClick={() => removeTime(index)} variant={'ghost'}><X className="text-red-500" /></Button>
                                    }
                                </div>
                                {(timeError && modifiedTimeIndex === index) && <p className="text-sm text-red-500">{timeError}</p>}
                            </div>
                        ))
                    }
                    <div className="flex flex-row-reverse items-center justify-between">
                        {
                            (timesList.length < 5) && <Button onClick={addTime} variant={'ghost'}><Plus /></Button>
                        }
                    </div>
                </div>
                {children}
            </div>
        </BaseAutomation>
    );
}