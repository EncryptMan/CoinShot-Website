'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { GuildCustomAI, GuildCustomBot } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";


export default function BotEditor({ guildCustomBot, guildCustomAI, className }: { guildCustomBot: GuildCustomBot, guildCustomAI: GuildCustomAI, className?: string }) {

    const [customBot, setCustomBot] = useState(guildCustomBot);
    const [customAI, setCustomAI] = useState(guildCustomAI);

    return (
        <div className={cn("w-full", className)}>
            <Card className="w-full p-4 bg-gray-700">
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-semibold text-neutral-300">Custom Bot</h3>
                    <Switch />
                </div>
                <div className="w-full flex flex-col mt-4 items-center justify-between py-3 border border-neutral-600 rounded-md">
                    <div className="flex items-center gap-2">
                        <Image src='/icon-circle.png' width={30} height={30} alt="Bot Icon" />
                        <span className="text-lg font-semibold" style={{ color: customBot.nameColor }}>{customBot.name}</span>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-2">
                    <label className="text-neutral-400">Bot Name</label>
                    <Input className="w-full" value={customBot.name} onChange={(e) => setCustomBot({ ...customBot, name: e.target.value })} />
                </div>
                <div className="w-full flex flex-col mt-2">
                    <label className="text-neutral-400">Bot Name Color</label>
                    <Input className="w-full border-none outline-none border-transparent p-0 bg-transparent" type="color" value={customBot.nameColor} onChange={(e) => setCustomBot({ ...customBot, nameColor: e.target.value })} />
                </div>
                <div className="flex gap-2 items-center justify-end w-full mt-4">
                    <Button variant={'secondary'}>Reset</Button>
                    <Button variant={'default'} className="text-white">Save</Button>
                </div>
            </Card>
            <Card className="w-full p-4 bg-gray-700 mt-4">
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-semibold text-neutral-300">Custom AI</h3>
                    <Switch />
                </div>
                <div className="w-full flex flex-col mt-2">
                    <label className="text-neutral-400">Custom Instructions</label>
                    <Textarea className="w-full" value={customAI.instructions} onChange={(e) => setCustomAI({ ...customAI, instructions: e.target.value })} />
                </div>
                <div className="w-full flex flex-col mt-2">
                    <label className="text-neutral-400">Knowledge Base</label>
                    {
                        customAI.knowledgeBase.map((knowledge, index) => (
                            <Card key={index} className="w-full flex justify-between items-center p-2 px-3 bg-gray-600 border-none">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-lg font-semibold">{knowledge.title}</h1>
                                    <h2 className="text-sm text-neutral-400">{knowledge.content.slice(0, 50)}...</h2>
                                </div>
                                <div className="flex flex-col items-center justify-between">
                                    <div className="flex items-center">
                                        <Button variant={"ghost"} size={"sm"}>
                                            <MdEdit className="text-blue-500" size={20} />
                                        </Button>
                                        <Button variant={"ghost"} size={"sm"} className="hover:bg-red-500/25">
                                            <MdDelete className="text-red-500" size={20} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                    {
                        customAI.knowledgeBase.length < 1 &&
                        <div className="w-full flex items-center justify-center mb-2">
                            <p className="text-neutral-500">No knowledge found</p>
                        </div>
                    }
                </div>
            </Card>
        </div>
    );
}