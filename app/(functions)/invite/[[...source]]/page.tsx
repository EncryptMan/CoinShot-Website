import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";


export default async function Page({ params }: { params: { source?: string[] } }) {

    const source = params.source ?? ['unknown'];

    try {
        await prisma.inviteTracking.create({
            data: {
                source: source.join('/'),
            }
        });
    } catch (error) {
        console.error(error);
    }

    redirect(process.env.BOT_INVITE_URL ?? '/');
}