import GatewayEditor from "./_components/GatewayEditor";
import DashboardPage from "../_components/DashboardPage";
import { fetchGuildRoles, fetchGuildUsers, fetchPaymentGateways } from "@/app/lib/actions/payment-gateway";
import { fetchGuildChannels } from "@/app/lib/actions";


export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const paymentGateways = await fetchPaymentGateways(id);
    let guildChannels = await fetchGuildChannels(id);
    const guildUsers = await fetchGuildUsers(id);
    const guildRoles = await fetchGuildRoles(id);

    if ('error' in guildChannels) {
        // Handle error, for example, by setting guildChannels to an empty array or showing an error message
        guildChannels = [];
    }

    return (
        <DashboardPage>
            <h1 className="text-2xl font-semibold w-full">Cryptocurrency Payment Gateway</h1>
            <h2 className="text-lg text-neutral-400 w-full">Make sure to save your changes</h2>
            <GatewayEditor paymentGateways={paymentGateways} className="mt-4" guildChannels={guildChannels} guildUsers={guildUsers} guildRoles={guildRoles} />
        </DashboardPage>
    );
}