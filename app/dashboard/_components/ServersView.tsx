import ServerCard from "@/app/components/ServerCard";
import { Guild } from "@prisma/client";
import { fetchGuilds } from "@/app/lib/actions";

export default async function ServersView() {
    let guilds = await fetchGuilds();

    // Move guild at end of array where bot is not present
    guilds.sort((a: Guild, b: Guild) => {
        const isBotPresentA = a.botPresent;
        const isBotPresentB = b.botPresent;

        if (isBotPresentA && !isBotPresentB) {
            return -1;
        } else if (!isBotPresentA && isBotPresentB) {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <>
            {guilds.map((guild: Guild) => (
                <ServerCard key={guild.id} guild={guild} />
            ))}
        </>
    );
}

ServersView.Skeleton = () => {
    return (
        <>
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
        </>
    );
}