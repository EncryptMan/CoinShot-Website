'use client'

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { createPaymentGateway, deletePaymentGateway, EditError, RoleSummary, sendGateway, updatePaymentGateway } from "@/app/lib/actions/payment-gateway";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { PaymentGateway, PaymentPlan, SuccessAction, User } from "@prisma/client";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image, { ImageLoaderProps } from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Markdown from 'react-markdown'
import { ActiveGuildIdContext } from "../../_components/ActiveIdProvider";
import { useSession } from "next-auth/react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function GatewayEditor({ paymentGateways, className, guildChannels, guildUsers, guildRoles }: { paymentGateways: PaymentGateway[], className?: string, guildChannels: { id: string, name: string }[], guildUsers: User[], guildRoles: RoleSummary[] }) {

    const searchParams = useSearchParams()
    const selectedId = searchParams.get("id")

    const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);
    const [errors, setErrors] = useState<EditError>({})

    useEffect(() => {
        const foundGateway = paymentGateways.find(gateway => gateway.id === selectedId) ?? paymentGateways?.[0] ?? null;
        setSelectedGateway(foundGateway);
    }, [selectedId, paymentGateways]); // Re-run this effect if selectedId or paymentGateways changes


    function onValueChange(value: string) {
        const gateway = paymentGateways.find(gateway => gateway.id === value);
        setSelectedGateway(gateway ?? null);
    }

    if (!selectedGateway) {
        return (
            <Card className={cn("w-full p-4 bg-gray-700", className)}>
                <GatewaySelect paymentGateways={paymentGateways} selectedGateway={selectedGateway} onValueChange={onValueChange} guildUsers={guildUsers} />
            </Card>
        )
    }

    return (
        <Card className={cn("w-full p-4 bg-gray-700", className)}>
            <GatewaySelect paymentGateways={paymentGateways} selectedGateway={selectedGateway} onValueChange={onValueChange} guildUsers={guildUsers} />
            <div className="w-full flex flex-col gap-1 mt-4">
                <Label className="text-neutral-400">Gateway Name</Label>
                <Input value={selectedGateway?.name} onChange={(e) => setSelectedGateway({ ...selectedGateway, name: e.target.value })} />
                {errors.nameError && <p className="text-red-500 text-sm">{errors.nameError}</p>}
            </div>
            <hr className="w-full border-neutral-500 my-4" />
            <GatewaySettings selectedGateway={selectedGateway} setSelectedGateway={setSelectedGateway} guildChannels={guildChannels} guildUsers={guildUsers} errors={errors} />
            <hr className="w-full border-neutral-500 my-4" />
            <PlansEditor selectedGateway={selectedGateway} setSelectedGateway={setSelectedGateway} guildRoles={guildRoles} guildChannels={guildChannels} errors={errors} />
            <hr className="w-full border-neutral-500 my-4" />
            <MessageEditor selectedGateway={selectedGateway} setSelectedGateway={setSelectedGateway} errors={errors} />
            <hr className="w-full border-neutral-500 my-4" />
            <ControlButtons guildChannels={guildChannels} selectedGateway={selectedGateway} setErrors={setErrors} />
        </Card>
    )
}

function GatewaySelect({ paymentGateways, selectedGateway, guildUsers, onValueChange }: { paymentGateways: PaymentGateway[], selectedGateway: PaymentGateway | null, onValueChange: (value: string) => void, guildUsers: User[] }) {
    return (
        <div className="flex items-center gap-1 w-full">
            <Select value={selectedGateway?.id} onValueChange={onValueChange}>
                <SelectTrigger className="w-full p-2">
                    <SelectValue placeholder="Select a payment gateway" />
                </SelectTrigger>
                <SelectContent >
                    {paymentGateways.map((gateway: PaymentGateway) => (
                        <SelectItem key={gateway.id} value={gateway.id}>
                            {gateway.name}
                        </SelectItem>
                    ))
                    }
                </SelectContent>
            </Select>
            <CreatePaymentGateway guildUsers={guildUsers} />
        </div>
    )
}

function GatewaySettings({ selectedGateway, setSelectedGateway, guildChannels, guildUsers, errors }: { selectedGateway: PaymentGateway, setSelectedGateway: (value: PaymentGateway) => void, guildChannels: { id: string, name: string }[], guildUsers: User[], errors: EditError }) {

    function onUserChange(value: string) {
        setSelectedGateway({ ...selectedGateway, paymentReceiverId: value })
    }

    function onChannelChange(value: string) {
        if (value === 'None') {
            setSelectedGateway({ ...selectedGateway, loggingChannelId: null })
        } else {
            setSelectedGateway({ ...selectedGateway, loggingChannelId: value })
        }
    }

    return (
        <div className="w-full flex gap-4">
            <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Payment Receiver</Label>
                    <Select value={selectedGateway.paymentReceiverId} onValueChange={onUserChange}>
                        <SelectTrigger className="w-full p-2 bg-gray-800">
                            <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800">
                            {guildUsers.map((user) => (
                                <SelectItem key={user.id} value={user.id} className="focus:bg-white/25">
                                    <div className="flex items-center gap-2">
                                        <Image src={user.avatarUrl ?? ''} width={20} height={20} alt="User Avatar" className="rounded-full" />
                                        <div>
                                            <span>{user.username}</span>
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.paymentReceiverIdError && <p className="text-red-500 text-sm">{errors.paymentReceiverIdError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Logging Channel</Label>
                    <Select value={selectedGateway?.loggingChannelId ?? undefined} onValueChange={onChannelChange}>
                        <SelectTrigger className="w-full p-2 bg-gray-800">
                            <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800">
                            <SelectItem value={'None'} className="focus:bg-white/25">
                                None
                            </SelectItem>
                            {guildChannels.map((channel) => (
                                <SelectItem key={channel.id} value={channel.id} className="focus:bg-white/25">
                                    {`# ${channel.name}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.loggingChannelIdError && <p className="text-red-500 text-sm">{errors.loggingChannelIdError}</p>}
                </div>
            </div>
        </div>
    )
}

function PlansEditor({ selectedGateway, setSelectedGateway, guildRoles, guildChannels, errors }: { selectedGateway: PaymentGateway, setSelectedGateway: (value: PaymentGateway) => void, guildRoles: RoleSummary[], guildChannels: { id: string, name: string }[], errors: EditError }) {

    enum DialogAction {
        create = "Create",
        edit = "Edit"
    }
    const [index, setIndex] = useState<number>(0)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null)
    const [dialogAction, setDialogAction] = useState<DialogAction>(DialogAction.create)
    const [dialogError, setDialogError] = useState<string | null>(null)

    function camelCaseToTitleCase(camelCase: string): string {
        const words = camelCase.match(/[A-Za-z][a-z]*/g) || [];
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function intToHexColor(colorInt: number): string {
        if (colorInt === 0) {
            // discord grey
            return '#99AAB5';
        }

        return '#' + colorInt.toString(16).padStart(6, '0');
    }

    function editPlan(index: number) {
        setIndex(index)
        setSelectedPlan(selectedGateway.plans[index])
        setDialogAction(DialogAction.edit)
        setDialogOpen(true)
    }

    function deletePlan(index: number) {
        setSelectedGateway({ ...selectedGateway, plans: selectedGateway.plans.filter((_, i) => i !== index) })
    }

    function createPlan() {
        setSelectedPlan({
            name: '',
            description: '',
            amountUSD: 0,
            successAction: SuccessAction.assignRole,
            assignRoleId: null,
            assignChannelId: null,
            triggerWebhookURL: null
        });
        setDialogAction(DialogAction.create)
        setDialogOpen(true)
    }

    function onDialogDone() {
        if (!selectedPlan) {
            return
        }

        if (selectedPlan.name.length < 1) {
            setDialogError("Plan name is required")
            return
        }

        if (selectedPlan.description.length < 1) {
            setDialogError("Plan description is required")
            return
        }

        if (selectedPlan.amountUSD < 0) {
            setDialogError("Amount must be greater than 0")
            return
        }

        if (selectedPlan.successAction === SuccessAction.assignRole && !selectedPlan.assignRoleId) {
            setDialogError("Role is required for assign role success action")
            return
        }

        if (selectedPlan.successAction === SuccessAction.assignChannel && !selectedPlan.assignChannelId) {
            setDialogError("Channel is required for assign channel success action")
            return
        }

        if (selectedPlan.successAction === SuccessAction.triggerWebhook && !selectedPlan.triggerWebhookURL) {
            setDialogError("Webhook URL is required for trigger webhook success action")
            return
        }


        if (dialogAction === DialogAction.create) {
            setSelectedGateway({ ...selectedGateway, plans: [...selectedGateway.plans, selectedPlan] })
        } else {
            setSelectedGateway({ ...selectedGateway, plans: selectedGateway.plans.map((plan, i) => i === index ? selectedPlan : plan) })
        }

        setDialogError(null)
        setDialogOpen(false)
        setSelectedPlan(null)
    }

    return (
        <div className="w-full">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px] bg-gray-700">
                    <DialogHeader>
                        <DialogTitle>{dialogAction === DialogAction.create ? "Create Plan" : "Edit Plan"}</DialogTitle>
                        <DialogDescription>
                            {dialogAction === DialogAction.create ? "Create a new payment plan" : "Edit an existing payment plan"}
                        </DialogDescription>
                    </DialogHeader>
                    {dialogError && <DialogDescription>
                        <p className="text-red-500 text-sm">{dialogError}</p>
                    </DialogDescription>
                    }
                    {
                        selectedPlan &&
                        <>
                            <div className="w-full flex flex-col gap-1">
                                <Label className="text-neutral-400">Plan Name</Label>
                                <Input placeholder="Any Name" value={selectedPlan?.name} onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })} maxLength={50} />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <Label className="text-neutral-400">Plan Description</Label>
                                <Textarea placeholder="Any Description" value={selectedPlan?.description} onChange={(e) => setSelectedPlan({ ...selectedPlan, description: e.target.value })} maxLength={200} />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <Label className="text-neutral-400">{"Amount (USD)"}</Label>
                                <Input type="number" value={selectedPlan?.amountUSD} onChange={(e) => setSelectedPlan({ ...selectedPlan, amountUSD: parseFloat(e.target.value) })} />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <Label className="text-neutral-400">Success Action</Label>
                                <Select value={selectedPlan?.successAction} onValueChange={(value) => setSelectedPlan({ ...selectedPlan, successAction: SuccessAction[value as keyof typeof SuccessAction] })}>
                                    <SelectTrigger className="w-full p-2 bg-gray-800">
                                        <SelectValue placeholder="Select a success action" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800">
                                        <SelectItem value="assignRole" className="hover:bg-white/25">Assign Role</SelectItem>
                                        <SelectItem value="assignChannel" className="hover:bg-white/25">Assign Channel</SelectItem>
                                        <SelectItem value="triggerWebhook" className="hover:bg-white/25">Trigger Webhook</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                {
                                    selectedPlan.successAction === SuccessAction.assignRole &&
                                    <>
                                        <Label className="text-neutral-400">Role</Label>
                                        <Select value={selectedPlan.assignRoleId ?? undefined} onValueChange={(value) => setSelectedPlan({ ...selectedPlan, assignRoleId: value })}>
                                            <SelectTrigger className="w-full p-2 bg-gray-800">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800">
                                                {guildRoles.map((role) => (
                                                    <SelectItem key={role.id} value={role.id} className="hover:bg-white/25">
                                                        <div className="flex items-center gap-3 rounded-lg p-1 px-2 bg-slate-600">
                                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: intToHexColor(role.color) }} />
                                                            <span className="text-xs">
                                                                {role.name}
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }
                                {
                                    selectedPlan.successAction === SuccessAction.assignChannel &&
                                    <>
                                        <Label className="text-neutral-400">Channel</Label>
                                        <Select value={selectedPlan.assignChannelId ?? undefined} onValueChange={(value) => setSelectedPlan({ ...selectedPlan, assignChannelId: value })}>
                                            <SelectTrigger className="w-full p-2 bg-gray-800">
                                                <SelectValue placeholder="Select a channel" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800">
                                                {guildChannels.map((channel) => (
                                                    <SelectItem key={channel.id} value={channel.id} className="hover:bg-white/25">
                                                        {`# ${channel.name}`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                }
                                {
                                    selectedPlan.successAction === SuccessAction.triggerWebhook &&
                                    <>
                                        <Label className="text-neutral-400">Webhook URL</Label>
                                        <Input placeholder="https://example.com/webhook" value={selectedPlan.triggerWebhookURL ?? ''} onChange={(e) => setSelectedPlan({ ...selectedPlan, triggerWebhookURL: e.target.value })} />
                                        <div className="text-xs text-neutral-400">
                                            {"The bot will send the JSON data in the POST body request to the webhook URL. For example:"}
                                            <div style={{ overflowX: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: 0 }}>
                                                <p>{"{"}</p>
                                                <p style={{ marginLeft: '20px' }}>{`"planName": "Plan Name",`}</p>
                                                <p style={{ marginLeft: '20px' }}>{`"userId": "832739171837913",`}</p>
                                                <p style={{ marginLeft: '20px' }}>{`"username": "exampleUser",`}</p>
                                                <p style={{ marginLeft: '20px' }}>{`"coin": "BTC",`}</p>
                                                <p style={{ marginLeft: '20px' }}>{`"amountPaidCoin": 0.001,`}</p>
                                                <p style={{ marginLeft: '20px' }}>{`"amountPaidUSD": 25.00,`}</p>
                                                <p style={{ marginLeft: '20px' }}>{`"time": "2021-10-10T10:10:10Z"`}</p>
                                                <p>{"}"}</p>
                                            </div>
                                        </div>

                                    </>
                                }
                            </div>
                        </>}
                    <DialogFooter>
                        <Button className="text-white" onClick={onDialogDone}>
                            Done
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="w-full flex flex-col gap-1">
                <div className="w-full flex items-center justify-between">
                    <Label className="text-neutral-400">Plans{` ${selectedGateway.plans.length}/5`}</Label>
                    {
                        selectedGateway.plans.length < 5 &&
                        <Button variant={"ghost"} size={"sm"} onClick={createPlan}>
                            <Plus />
                        </Button>
                    }
                </div>
                <div className="flex flex-col gap-1 pt-1">
                    {
                        selectedGateway.plans.map((plan, index) => (
                            <Card key={index} className="w-full flex justify-between items-center p-2 px-3 bg-gray-600 border-none">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-lg font-semibold">{`${plan.name} - $${plan.amountUSD}`}</h1>
                                    <h2 className="text-sm text-neutral-400">{plan.description.length > 100 ? plan.description.slice(0, 100) + '...' : plan.description}</h2>
                                </div>
                                <div className="flex flex-col items-center justify-between">
                                    {/* <p className="text-sm text-neutral-400">${plan.amountUSD}</p> */}
                                    {/* <p className="text-sm text-neutral-400">{camelCaseToTitleCase(plan.successAction.toString())}</p> */}
                                    <div className="flex items-center">
                                        <Button variant={"ghost"} size={"sm"} onClick={() => editPlan(index)}>
                                            <MdEdit className="text-blue-500" size={20} />
                                        </Button>
                                        <Button variant={"ghost"} size={"sm"} className="hover:bg-red-500/25" onClick={() => deletePlan(index)}>
                                            <MdDelete className="text-red-500" size={20} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                    {
                        selectedGateway.plans.length < 1 &&
                        <div className="w-full flex items-center justify-center mb-2">
                            <p className="text-neutral-500">No plans</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

function PaymentGatewayPreview({ gateway }: { gateway: PaymentGateway }) {

    let buttonClassName;

    if (gateway.buttonStyle === "PRIMARY") {
        buttonClassName = "text-white bg-blue-500 hover:bg-blue-600";
    } else if (gateway.buttonStyle === "SECONDARY") {
        buttonClassName = "text-white bg-gray-500 hover:bg-gray-600";
    } else if (gateway.buttonStyle === "SUCCESS") {
        buttonClassName = "text-white bg-green-500 hover:bg-green-600";
    } else if (gateway.buttonStyle === "DANGER") {
        buttonClassName = "text-white bg-red-500 hover:bg-red-600";
    } else {
        buttonClassName = "text-white bg-gray-800 hover:bg-gray-900";
    }

    const customLoader = ({ src }: ImageLoaderProps): string => {
        return src;
    };

    function isValidURL(url: string): boolean {
        const pattern = new RegExp('^(https?:\\/\\/)' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    }

    return (
        <div className="w-full flex gap-2 py-8 max-lg:px-2 max-md:p-0">
            <div className="flex flex-col justify-start">
                <Image src={"/icon-circle.png"} width={35} height={35} alt="CoinShot Icon" className="rounded-full overflow-hidden" />
            </div>
            <div className="flex flex-col gap-0.5">
                <div className="flex gap-1 font-medium">
                    <span style={{ color: '#FFD700' }}>CoinShot</span>
                </div>
                <Markdown className="prose text-sm whitespace-pre-wrap">{gateway.messageTextContent}</Markdown>
                <div className="rounded-sm overflow-hidden min-h-10 bg-[#2B2D31] max-w-96 flex flex-col gap-1 p-2" style={{ borderLeft: '4px solid', borderColor: gateway.embedColor }}>
                    <div className="flex gap-1">

                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-neutral-300 text-xs">{gateway.embedAuthor}</span>
                            <span className="font-semibold">{gateway.embedTitle}</span>
                            <Markdown className="prose text-sm whitespace-pre-wrap">{gateway.embedDescription}</Markdown>
                        </div>
                        {
                            isValidURL(gateway.embedThumbnailURL) &&
                            <div className="flex flex-col justify-start">
                                <Image loader={customLoader} src={gateway.embedThumbnailURL} width={300} height={200} alt="Embed Thumbnail" className="rounded-md overflow-hidden object-cover w-full" />
                            </div>
                        }
                    </div>
                    {
                        isValidURL(gateway.embedImageURL) &&
                        <Image loader={customLoader} src={gateway.embedImageURL} width={300} height={200} alt="Embed Image" className="rounded-md overflow-hidden object-cover w-full" />
                    }

                    <span className="font-semibold text-neutral-300 text-xs">{gateway.embedFooter}</span>
                </div>
                <div className="flex gap-1 justify-start mt-1">
                    <Button variant={'default'} size={'sm'} className={cn(buttonClassName, '')}>{gateway.buttonLabel}</Button>
                </div>
            </div>
        </div>
    )
}

function SendPaymentGateway({ guildChannels, selectedGateway }: { guildChannels: { id: string, name: string }[], selectedGateway: PaymentGateway }) {

    const [sendGatewayDialogOpen, setSendGatewayDialogOpen] = useState(false)
    const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    function onSendGateway() {
        if (!selectedGateway || !selectedChannelId) {
            return
        }

        setLoading(true)
        sendGateway(selectedGateway, selectedChannelId)
            .then(({ error }: { error?: string }) => {
                if (error) {
                    toast({ title: "Error", description: error, variant: "error" })
                }
                else {
                    toast({ title: "Success", description: "Payment gateway sent", variant: "success" })
                }
            })
            .finally(() => {
                setLoading(false)
                setSendGatewayDialogOpen(false)
                setSelectedChannelId(null)
            })
    }

    return (
        <Dialog modal={true} open={sendGatewayDialogOpen} onOpenChange={setSendGatewayDialogOpen}>
            <DialogTrigger asChild>
                <Button disabled={loading} className="text-white bg-green-600 hover:bg-green-700">
                    Send Gateway
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800">
                <DialogHeader>
                    <DialogTitle>Send Payment Gateway</DialogTitle>
                    <DialogDescription>
                        Select payment gateway to a channel in your server.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Select Channel</Label>
                    <Select value={selectedChannelId ?? undefined} onValueChange={(value) => setSelectedChannelId(value)}>
                        <SelectTrigger className="w-full p-2">
                            <SelectValue placeholder="Select a channel" />
                        </SelectTrigger>
                        <SelectContent>
                            {guildChannels.map((channel) => (
                                <SelectItem key={channel.id} value={channel.id} className="focus:bg-white/25 hover:bg-white/25">
                                    {`# ${channel.name}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    {
                        loading ?
                            <LoadingSpinner size={30} />
                            :
                            <Button onClick={onSendGateway} className="text-white" disabled={!selectedChannelId}>
                                Send
                            </Button>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function CreatePaymentGateway({ guildUsers }: { guildUsers: User[] }) {
    const [gatewayName, setGatewayName] = useState('');
    const [userId, setUserId] = useState<string>(guildUsers?.[0]?.id ?? '');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast()
    const guildId = useContext(ActiveGuildIdContext)
    const { data: session } = useSession();

    function onCreate() {
        setLoading(true);
        createPaymentGateway(guildId, gatewayName, userId)
            .then((result) => {
                if (result && result.error) {
                    setError(result.error);
                    setDialogOpen(true);
                } else {
                    toast({ title: "Success", description: "Payment gateway created", variant: "success" });
                    setDialogOpen(false);
                    setError(null);
                    setGatewayName('');
                }
                setLoading(false);
            })
    }

    return (
        <Dialog modal={true} open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"}>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-700">
                <DialogHeader>
                    <DialogTitle>Create Payment Gateway</DialogTitle>
                    <DialogDescription>
                        Create a new payment gateway for your server.
                    </DialogDescription>
                </DialogHeader>
                {
                    error &&
                    <DialogDescription>
                        <p className="text-red-500 text-sm">{error}</p>
                    </DialogDescription>
                }
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Gateway Name</Label>
                    <Input placeholder="Any Name" value={gatewayName} onChange={(e) => setGatewayName(e.target.value)} minLength={1} maxLength={50} />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Payment Receiver</Label>
                    <Select value={userId} onValueChange={(value) => setUserId(value)}>
                        <SelectTrigger className="w-full p-2 bg-gray-800">
                            <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800">
                            {guildUsers.map((user) => (
                                <SelectItem key={user.id} value={user.id} className="hover:bg-white/25">
                                    <div className="flex items-center gap-2">
                                        <Image src={user.avatarUrl ?? ''} width={20} height={20} alt="User Avatar" className="rounded-full" />
                                        <div>
                                            <span>{user.username}</span>
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    {
                        loading ?
                            <LoadingSpinner size={30} />
                            :
                            <Button onClick={onCreate} className="text-white" disabled={gatewayName.length < 1}>
                                Create
                            </Button>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function DeletePaymentGateway({ selectedGateway }: { selectedGateway: PaymentGateway }) {

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const guildId = useContext(ActiveGuildIdContext)
    const { toast } = useToast()


    function onDeleteGateway() {
        setLoading(true)

        deletePaymentGateway(guildId, selectedGateway.id)
            .then((result) => {
                if (result && result.error) {
                    toast({ title: "Error", description: result.error, variant: "error" });
                } else {
                    toast({ title: "Success", description: "Payment gateway deleted", variant: "success" });
                }
            })
            .catch((error) => {
                toast({ title: "Error", description: error.message, variant: "error" });
            })
            .finally(() => {
                setLoading(false);
                setDeleteAlertOpen(false);
            });
    }

    return (
        <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
            <AlertDialogTrigger asChild>
                <Button disabled={loading} className="text-white bg-red-500 hover:bg-red-600">
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-700">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will delete <span className="font-semibold">{selectedGateway.name}</span> payment gateway forever.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-white bg-gray-800 hover:bg-gray-900">
                        Cancel
                    </AlertDialogCancel>
                    {
                        loading ?
                            <LoadingSpinner size={30} />
                            :
                            <AlertDialogAction onClick={onDeleteGateway} className="text-white bg-red-500 hover:bg-red-800">
                                Yes
                            </AlertDialogAction>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function ControlButtons({ guildChannels, selectedGateway, setErrors }: { guildChannels: { id: string, name: string }[], selectedGateway: PaymentGateway, setErrors: (errors: EditError) => void }) {

    const [loading, setLoading] = useState(false)
    const guildId = useContext(ActiveGuildIdContext)
    const { toast } = useToast()

    function updateGateway() {
        setLoading(true)
        updatePaymentGateway(guildId, selectedGateway)
            .then((errors) => {
                if (errors && Object.keys(errors).length > 0) {
                    setErrors(errors)
                    toast({ title: "Error", description: "There was an error updating the payment gateway", variant: "error" })
                } else {
                    setErrors({})
                    toast({ title: "Success", description: "Payment gateway updated", variant: "success" })
                }
                setLoading(false)
            })
    }

    return (
        <div className="flex w-full justify-between gap-3">
            <SendPaymentGateway guildChannels={guildChannels} selectedGateway={selectedGateway} />
            <div className="flex gap-2 items-center">
                <DeletePaymentGateway selectedGateway={selectedGateway} />
                <Button onClick={updateGateway} disabled={loading} className="text-white">
                    Save
                </Button>
            </div>
        </div>
    )
}

function MessageEditor({ selectedGateway, setSelectedGateway, errors }: { selectedGateway: PaymentGateway, setSelectedGateway: (value: PaymentGateway) => void, errors: EditError }) {

    const [messageContentInputRef, setMessageContentInputRef] = useState<HTMLTextAreaElement | null>(null)
    const [embedDescriptionInputRef, setEmbedDescriptionInputRef] = useState<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if (messageContentInputRef) {
            messageContentInputRef.style.height = "auto";
            messageContentInputRef.style.height = (messageContentInputRef.scrollHeight + 2) + "px";
        }
    }, [selectedGateway?.messageTextContent, messageContentInputRef])

    useEffect(() => {
        if (embedDescriptionInputRef) {
            embedDescriptionInputRef.style.height = "auto";
            embedDescriptionInputRef.style.height = (embedDescriptionInputRef.scrollHeight + 2) + "px";
        }
    }, [selectedGateway?.embedDescription, embedDescriptionInputRef])

    return (
        <div className="w-full flex max-md:flex-col gap-4">
            <div className="w-1/2 flex flex-col gap-2 max-md:w-full">
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Message Text Content</Label>
                    <Textarea value={selectedGateway?.messageTextContent} onChange={(e) => setSelectedGateway({ ...selectedGateway, messageTextContent: e.target.value })} ref={setMessageContentInputRef} />
                    {errors.messageTextContentError && <p className="text-red-500 text-sm">{errors.messageTextContentError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Embed Author</Label>
                    <Input value={selectedGateway?.embedAuthor} onChange={(e) => setSelectedGateway({ ...selectedGateway, embedAuthor: e.target.value })} />
                    {errors.embedAuthorError && <p className="text-red-500 text-sm">{errors.embedAuthorError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Embed Title</Label>
                    <Input value={selectedGateway?.embedTitle} onChange={(e) => setSelectedGateway({ ...selectedGateway, embedTitle: e.target.value })} />
                    {errors.embedTitleError && <p className="text-red-500 text-sm">{errors.embedTitleError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Embed Description</Label>
                    <Textarea value={selectedGateway?.embedDescription} onChange={(e) => setSelectedGateway({ ...selectedGateway, embedDescription: e.target.value })} ref={setEmbedDescriptionInputRef} />
                    {errors.embedDescriptionError && <p className="text-red-500 text-sm">{errors.embedDescriptionError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Embed Footer</Label>
                    <Input value={selectedGateway?.embedFooter} onChange={(e) => setSelectedGateway({ ...selectedGateway, embedFooter: e.target.value })} />
                    {errors.embedFooterError && <p className="text-red-500 text-sm">{errors.embedFooterError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Embed Thumbnail URL</Label>
                    <Input value={selectedGateway?.embedThumbnailURL} onChange={(e) => setSelectedGateway({ ...selectedGateway, embedThumbnailURL: e.target.value })} />
                    {errors.embedThumbnailURLError && <p className="text-red-500 text-sm">{errors.embedThumbnailURLError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Embed Image URL</Label>
                    <Input value={selectedGateway?.embedImageURL} onChange={(e) => setSelectedGateway({ ...selectedGateway, embedImageURL: e.target.value })} />
                    {errors.embedImageURLError && <p className="text-red-500 text-sm">{errors.embedImageURLError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Button Label</Label>
                    <Input value={selectedGateway?.buttonLabel} onChange={(e) => setSelectedGateway({ ...selectedGateway, buttonLabel: e.target.value })} />
                    {errors.buttonLabelError && <p className="text-red-500 text-sm">{errors.buttonLabelError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Button Style</Label>
                    <Select value={selectedGateway?.buttonStyle} onValueChange={(value) => setSelectedGateway({ ...selectedGateway, buttonStyle: value.toUpperCase() })}>
                        <SelectTrigger className="w-full p-2 bg-gray-800">
                            <SelectValue placeholder="Select a button style" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800">
                            <SelectItem value="PRIMARY" className="focus:bg-white/25">Primary</SelectItem>
                            <SelectItem value="SECONDARY" className="focus:bg-white/25">Secondary</SelectItem>
                            <SelectItem value="SUCCESS" className="focus:bg-white/25">Success</SelectItem>
                            <SelectItem value="DANGER" className="focus:bg-white/25">Danger</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.buttonStyleError && <p className="text-red-500 text-sm">{errors.buttonStyleError}</p>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <Label className="text-neutral-400">Embed Color</Label>
                    <Input value={selectedGateway?.embedColor} onChange={(e) => setSelectedGateway({ ...selectedGateway, embedColor: e.target.value })} type="color" className="p-0 bg-transparent border-none" />
                    {errors.embedColorError && <p className="text-red-500 text-sm">{errors.embedColorError}</p>}
                </div>
            </div>
            <div className="w-1/2 p-2 max-md:w-full">
                <PaymentGatewayPreview gateway={selectedGateway} />
            </div>
        </div>
    )
}