

'use client'

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { createConnection } from "@/app/lib/actions";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, useState } from "react";
import { X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { IoIosAddCircle } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";



export default function CreateConnection({ className }: { className?: string }) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const [dialogOpen, setDialogOpen] = useState(false)
    const [bitgetDialogOpen, setBitgetDialogOpen] = useState(false)

    const router = useRouter()

    function openAppDialog(appName: string) {
        setDialogOpen(false)
        if (appName === 'Bitget') {
            setBitgetDialogOpen(true)
        }
    }

    function onConnectBitget(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setIsLoading(true);

        const apiKey = (event.currentTarget.querySelector('#apiKey') as HTMLInputElement).value;
        const secretKey = (event.currentTarget.querySelector('#secretKey') as HTMLInputElement).value;
        const passphrase = (event.currentTarget.querySelector('#passphrase') as HTMLInputElement).value;

        try {
            createConnection('Bitget', apiKey, secretKey, passphrase)
                .then(({ error }) => {
                    if (error) {
                        setIsLoading(false)
                        setError(true)
                        toast({ title: "Error", description: error, variant: "error" })
                    } else {
                        router.refresh()
                        setIsLoading(false)
                        setBitgetDialogOpen(false)
                        setDialogOpen(false)
                    }
                }
                )
        } catch (error) {
            setIsLoading(false)
            setError(true)
            toast({ title: "Error", description: "Failed to connect Bitget", variant: "error" })
        }
    }

    return (
        <>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} key="dialog">
                <DialogTrigger asChild>
                    <Button variant="default" className={cn("w-full text-lg p-4 py-6 flex items-center gap-3 text-neutral-200", className)}><IoIosAddCircle size={30} />Add Connection</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-700">
                    <DialogHeader>
                        <DialogTitle>Choose a App</DialogTitle>
                        <DialogDescription>
                            More apps coming soon!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <Button
                            key={'Bitget'}
                            className="w-full text-white text-xl bg-gray-900 hover:bg-gray-950 p-6 flex items-center gap-2"
                            onClick={() => openAppDialog('Bitget')}
                        >
                            <div className="rounded-full overflow-hidden">
                                <Image alt="Bitget icon" src={'/apps/bitget.png'} width={30} height={30} />
                            </div>
                            Bitget
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={bitgetDialogOpen} onOpenChange={setBitgetDialogOpen} key="bitget-dialog">
                <DialogContent className="sm:max-w-[425px] bg-gray-700">
                    <form className="sm:max-w-[425px] bg-gray-700" onSubmit={onConnectBitget}>
                        <DialogHeader>
                            <DialogTitle>Connect Bitget</DialogTitle>
                            <DialogDescription>
                                {"To obtain your API Key, Secret Key, and Passphrase, please visit the Bitget website on a PC. Click on 'Profile', then 'API Keys', and finally, click the 'Create API Key' button. Select the 'System-generated API key' option, choose a strong passphrase, and select 'Read-Only' permission. Ensure all permissions in read-only are selected. Do not bind any IP address; leave it blank."}
                                <br />
                                <br />
                                <strong className="font-bold">{'IMPORTANT: Please provide us with your API key that has "Read Only" permission. This ensures we cannot access your funds, and it safeguards your account in the event your API key is compromised.'}</strong>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4 max-md:grid-cols-1 max-md:gap-1">
                                <Label htmlFor="apiKey" className="text-right max-md:text-left max-md:ml-1">
                                    API Key
                                </Label>
                                <Input id="apiKey" className="col-span-3" placeholder="Your API Key" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 max-md:grid-cols-1 max-md:gap-1">
                                <Label htmlFor="secretKey" className="text-right max-md:text-left max-md:ml-1">
                                    Secret Key
                                </Label>
                                <Input id="secretKey" className="col-span-3" placeholder="Your Secret Key" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 max-md:grid-cols-1 max-md:gap-1">
                                <Label htmlFor="passphrase" className="text-right max-md:text-left max-md:ml-1">
                                    Passphrase
                                </Label>
                                <Input id="passphrase" className="col-span-3" placeholder="Your Passphrase" required />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                isLoading ?
                                    <LoadingSpinner /> :
                                    <Button type="submit" className="text-white">Connect</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}