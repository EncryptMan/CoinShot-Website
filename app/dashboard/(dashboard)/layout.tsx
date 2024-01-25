import { fetchGuilds } from "../../lib/actions"
import GuildsProvider from "../_components/GuildsProvider"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const guilds = await fetchGuilds()

    return (
        <GuildsProvider guilds={guilds}>
            {children}
        </GuildsProvider>
    )
}
