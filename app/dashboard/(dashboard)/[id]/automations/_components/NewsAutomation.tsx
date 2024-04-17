'use client'

import { NewsCategory, NewsMessageStyle } from "@prisma/client";
import BaseAutomation from "./BaseAutomation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ActiveIdContext } from "../../_components/ActiveIdProvider";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { setGuildNewsAutomationCategories, setGuildNewsAutomationMessageStyle } from "@/app/lib/actions";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";


export default function NewsAutomation({ name, displayName, description, enabled, channels, currentChannelId, selectedCategories, selectedMessageStyle, children }: { name: string, displayName?: string, description: string, enabled: boolean, channels: { id: string, name: string }[], currentChannelId: string | null, selectedCategories: NewsCategory[], selectedMessageStyle: NewsMessageStyle, children?: React.ReactNode }) {
    const guildId = useContext(ActiveIdContext)

    const [messageStyle, setMessageStyle] = useState(selectedMessageStyle)
    const [isMessageStyleLoading, setIsMessageStyleLoading] = useState(false)
    const [messageStyleError, setMessageStyleError] = useState(null as string | null)
    const [modifiedMessageStyle, setModifiedMessageStyle] = useState(null as NewsMessageStyle | null)

    const { toast } = useToast()

    function updateCategories(tags: string[]): Promise<{ error?: string }> {
        return new Promise((resolve, reject) => {
            setGuildNewsAutomationCategories(guildId, tags)
                .then(({ error }) => {
                    if (error) {
                        toast({ title: "Error", description: error, variant: "error" })
                        reject({ error: error });
                    } else {
                        toast({ title: "Success", description: `${displayName} automation categories successfully updated`, variant: "success" })
                        resolve({});
                    }

                })

        });
    };

    function updateMessageStyle(newMessageStyle: NewsMessageStyle) {

        if (newMessageStyle === messageStyle) {
            return
        }

        setIsMessageStyleLoading(true)
        setMessageStyleError(null)
        setModifiedMessageStyle(newMessageStyle)

        setGuildNewsAutomationMessageStyle(guildId, newMessageStyle)
            .then(({ error }) => {
                setIsMessageStyleLoading(false)

                if (error) {
                    setMessageStyleError(error)
                    toast({ title: "Error", description: error, variant: "error" })
                    setMessageStyle(selectedMessageStyle)
                } else {
                    toast({ title: "Success", description: `${displayName} automation message style successfully updated`, variant: "success" })
                    setMessageStyle(newMessageStyle)
                }

            })
    }

    return (
        <BaseAutomation name={name} displayName={displayName} description={description} enabled={enabled} channels={channels} currentChannelId={currentChannelId}>
            <p className={cn("mt-4 text-white text-lg")}>Categories</p>
            <div className="w-full mt-2">
                <Tags tags={selectedCategories.map((category) => category)} options={Object.values(NewsCategory)} setTags={updateCategories} />
            </div>
            <p className={cn("mt-4 text-white text-lg")}>Message Style</p>
            <div className="w-full flex items-center gap-2 justify-around max-md:flex-col mt-3">
                {
                    isMessageStyleLoading && modifiedMessageStyle === NewsMessageStyle.Image ?
                        <div style={{ width: 300, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <LoadingSpinner size={50} />
                        </div>
                        :
                        <div className="flex flex-col gap-1 items-center cursor-pointer p-2" onClick={() => updateMessageStyle(NewsMessageStyle.Image)}>
                            <Image
                                src={'/news-image-style.png'}
                                alt="News Image Style"
                                width={300}
                                height={300}
                                draggable={false}
                                className={cn("overflow-hidden rounded-lg w-auto max-md:w-full h-full max-md:h-auto", messageStyle === NewsMessageStyle.Image && 'border-4 border-neutral-200')}
                            />
                            <p className={cn("text-md text-neutral-200", messageStyle === NewsMessageStyle.Image && 'text-white')}>
                                Image
                            </p>
                            <p className={cn("text-sm text-neutral-300", messageStyle === NewsMessageStyle.Image && 'text-neutral-200')}>
                                Less Text
                            </p>
                            {messageStyleError && modifiedMessageStyle === NewsMessageStyle.Image && <p className="text-sm text-red-500">{messageStyleError}</p>}
                        </div>
                }
                {isMessageStyleLoading && modifiedMessageStyle === NewsMessageStyle.Embed ?
                    <div style={{ width: 300, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LoadingSpinner size={50} />
                    </div>
                    :
                    <div className="flex flex-col gap-1 items-center cursor-pointer p-2" onClick={() => updateMessageStyle(NewsMessageStyle.Embed)}>
                        <Image
                            src={'/news-embed-style.png'}
                            alt="News Embed Style"
                            width={300}
                            height={300}
                            draggable={false}
                            className={cn("overflow-hidden rounded-lg w-auto max-md:w-full h-full max-md:h-auto", messageStyle === NewsMessageStyle.Embed && 'border-4 border-neutral-200')}
                        />
                        <p className={cn("text-md text-neutral-200", messageStyle === NewsMessageStyle.Embed && 'text-white')}>
                            Embed
                        </p>
                        <p className={cn("text-sm text-neutral-300", messageStyle === NewsMessageStyle.Embed && 'text-neutral-200')}>
                            More Text
                        </p>
                        {messageStyleError && modifiedMessageStyle === NewsMessageStyle.Embed && <p className="text-sm text-red-500">{messageStyleError}</p>}
                    </div>
                }
            </div>
            {children}
        </BaseAutomation>
    );
}


function Tags({
    tags,
    options,
    setTags,
    disabled
}: {
    tags: string[],
    options: string[],
    setTags: (tags: string[]) => Promise<{ error?: string }>,
    disabled?: boolean
}) {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null as string | null)
    const [modifiedIndex, setModifiedIndex] = useState(0)
    const [localTags, setLocalTags] = useState(tags)

    function updateTags(newTags: string[]) {

        const oldTags = localTags

        if (newTags.length > oldTags.length) {
            setLocalTags(newTags)
        }

        setIsLoading(true)
        setError(null)

        setTags(newTags)
            .then(({ error }) => {
                setIsLoading(false)

                if (error) {
                    setError(error)
                    setLocalTags(oldTags)
                } else {
                    setLocalTags(newTags)
                }
            })
    }


    function addTag(tag: string) {
        setModifiedIndex(localTags.length)
        updateTags([...localTags, tag])
    }

    function removeTag(index: number) {
        setModifiedIndex(index)
        updateTags(localTags.filter((_, i) => i !== index))
    }

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={ref}>
            <div className="flex flex-wrap gap-2 items-center">
                {localTags.map((tag, index) => (
                    <div key={index}>
                        {isLoading && modifiedIndex === index ?
                            <LoadingSpinner size={30} />
                            :
                            <Label
                                key={tag}
                                className={cn("mr-2 bg-gray-700 p-2 flex items-center gap-1 text-sm rounded-lg text-white", disabled && 'bg-slate-800 text-neutral-600')}
                            >
                                {tag}
                                <button
                                    className="ml-1 bg-transparent outline-none focus:outline-none"
                                    onClick={() => {
                                        removeTag(index)
                                    }}
                                    disabled={disabled}
                                >
                                    <X size={20} />
                                </button>
                            </Label>}
                    </div>
                ))}
                <div className="relative inline-block">
                    {!isLoading && <Button onClick={() => setIsOpen(!isOpen)} disabled={disabled} variant={'ghost'}>
                        <Plus />
                    </Button>}
                    {isOpen ? (
                        <div className="absolute z-10 rounded-lg bg-slate-900 p-2 animate-fade-in">
                            {options.filter((option) => !localTags.includes(option))
                                .map((option, index) => (
                                    <div key={index} onClick={() => {
                                        addTag(option)
                                        setIsOpen(false);
                                    }}
                                        className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg text-sm"
                                    >
                                        {option}
                                    </div>
                                ))}
                            {
                                options.filter((option) => !localTags.includes(option)).length === 0 && <div className="text-neutral-400 text-sm p-2">No more categories</div>
                            }
                        </div>
                    ) : null}
                </div>
            </div>
            {
                error && <p className="text-sm text-red-500">{error}</p>
            }
        </div>
    );
}