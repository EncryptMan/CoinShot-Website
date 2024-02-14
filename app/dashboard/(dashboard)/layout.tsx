import { getServerSession } from "next-auth"
import { fetchGuilds } from "../../lib/actions"
import GuildsProvider from "../_components/GuildsProvider"
import { redirect } from "next/navigation"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const guilds = await fetchGuilds()

    const session = await getServerSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <GuildsProvider guilds={guilds}>
            {children}
        </GuildsProvider>
    )
}
