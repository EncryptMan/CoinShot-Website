import { redirect } from "next/navigation";


export default function Page() {
    redirect(process.env.BOT_INVITE_URL ?? '/');
}