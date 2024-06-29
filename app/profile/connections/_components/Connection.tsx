

'use client'

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { deleteConnection } from "@/app/lib/actions";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image";


export default function Connection({ exchange, createdAt }: { exchange: string, createdAt: Date }) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const router = useRouter()

    function removeConnection() {
        setAlertOpen(false)
        setIsLoading(true)
        setError(false)

        try {
            // Server action
            deleteConnection(exchange)
                .then(({ error }) => {
                    if (error) {
                        setIsLoading(false)
                        setError(true)
                        toast({ title: "Error", description: error, variant: "error" })
                    }

                    router.refresh()
                    setIsLoading(false)
                })
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            setError(true)
            toast({ title: "Error", description: "Failed to remove connection", variant: "error" })
        }
    }

    return (
        <Card className="w-full flex items-center justify-between py-2 px-4 bg-gray-700">
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent className="bg-gray-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-400">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will delete{` ${exchange} `}connection from your account. You will still be able to create new connection later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={removeConnection} className="text-white bg-red-500 hover:bg-red-800">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="flex items-center gap-4 w-2/3 flex-grow">
                <div className="rounded-xl overflow-hidden">
                    <Image
                        alt={`${exchange} logo`}
                        src={`/apps/${exchange.toLowerCase()}.png`}
                        width={40}
                        height={40}
                    />
                </div>
                <div className="flex-grow">
                    <p className="text-lg font-bold text-neutral-200">{exchange}</p>
                    <p className="text-sm text-neutral-400">Connected on {createdAt.toLocaleDateString()}</p>
                </div>
            </div>
            <div className="w-10 flex justify-center flex-col">
                {isLoading ?
                    <LoadingSpinner /> :
                    <button onClick={() => setAlertOpen(true)} className="text-neutral-300 hover:text-white">
                        <X size={20} strokeWidth={2} />
                    </button>
                }
            </div>
            {error && <p className="text-sm text-red-500">Failed to remove connection</p>}
        </Card>
    )
}