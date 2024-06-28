import { fetchConnections } from "@/app/lib/actions";
import ProfilePage from "../_components/ProfilePage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CreateConnection from "./_components/CreateConnection";
import Connection from "./_components/Connection";


export default async function Page() {

    const connections = await fetchConnections();

    return (
        <ProfilePage>
            <h1 className="text-2xl font-semibold w-full">Connections</h1>
            <h2 className="text-lg text-neutral-400 w-full">Connect Your Favorite Third-Party Applications to Enhance Your Experience</h2>
            <CreateConnection className="mt-4" />
            <div className="mt-4 flex flex-col gap-3 w-full">
            {connections.map((connection) => (
                <Connection key={connection.exchange} exchange={connection.exchange} createdAt={connection.createdAt} />
            ))}     
            </div>
        </ProfilePage>
    );
}