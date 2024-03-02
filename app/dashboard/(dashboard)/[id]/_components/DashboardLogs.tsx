import { fetchGuildDashboardLogs } from "@/app/lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { format, formatDistanceToNow, isToday } from 'date-fns';

function formatLogDate(date: Date) {
    if (isToday(date)) {
        // If the date is today, format it as a relative time
        return formatDistanceToNow(date, { addSuffix: true });
    } else {
        // If the date is not today, format it as '20 March'
        return format(date, 'd MMMM');
    }
}

export default async function DashboardLogs({ guildId, className }: { guildId: string, className?: string }) {
    const guildDashboardLogs = await fetchGuildDashboardLogs(guildId);

    return (
        <Card className={cn(`bg-slate-700 flex-grow w-full`, className)}>
            <h1 className="font-semibold text-2xl px-5 pt-4 pb-2">Recent Dashboard Activity</h1>
            {(guildDashboardLogs === null || guildDashboardLogs.length === 0) ? <div className="px-5 py-2 text-neutral-200">No Logs</div> :
                <div>
                    {guildDashboardLogs.map((log, index) => (
                        <div className="flex justify-between px-5 py-2" key={index}>
                            <div className="flex gap-2 items-center">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={log.user?.avatarUrl ?? ''} alt={`${log?.user?.username}'s avatar`} />
                                    <AvatarFallback>
                                        {log?.user?.username[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm text-neutral-100">{log.message}</p>
                                    <p className="text-xs text-neutral-400">{log?.user?.username}</p>
                                </div>
                            </div>
                            <p className="text-xs text-neutral-300">{formatLogDate(log.createdAt)}</p>
                        </div>
                    ))}
                </div>
            }
        </Card>
    )
}

DashboardLogs.Skeleton = function DashboardLogsSkeleton({ className }: { className?: string}) {
    return (
        <Skeleton className={cn("flex-grow w-full", className)} />
    )
}