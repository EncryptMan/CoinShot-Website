import ServerCard from "@/app/dashboard/_components/ServerCard";
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
            {guilds.length === 0 ? (
                <span className="text-neutral-300 text-center text-lg">
                    {"Oops! We couldn't find any servers where you're an admin or moderator. If you've just logged in, please take a moment to refresh the page. Still no luck? Try logging in again and we'll do our best to update your information. Need more help? Feel free to join our support server. We appreciate your patience and are here to help!"}
                </span>
            ) :
                <div className="w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-10">
                    {guilds.map((guild: Guild) => (
                        <ServerCard key={guild.id} guild={guild} />
                    ))}
                </div>}
        </>
    );
}

ServersView.Skeleton = function ServerViewSkeleton() {
    return (
        <div className="w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-10">
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
        </div>
    );
}