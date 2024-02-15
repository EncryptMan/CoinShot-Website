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
                    {"Oops! 😮 We couldn't find any servers where you have 'Manage Guild' or higher permissions. Just logged in? Please give us a moment, then refresh the page. 🔄 If you're still having trouble, try logging in again and we'll update your information. 🔄 Need a hand? 🤔 Don't hesitate to join our support server. 🚀 We're here to help and appreciate your patience! 😊"}
                </span>
            ) :
                <Grid>
                    {guilds.map((guild: Guild) => (
                        <ServerCard key={guild.id} guild={guild} />
                    ))}
                </Grid>}
        </>
    );
}

ServersView.Skeleton = function ServerViewSkeleton() {
    return (
        <Grid>
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
            <ServerCard.Skeleton />
        </Grid>
    );
}

function Grid({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-10">
            {children}
        </div>
    );
}