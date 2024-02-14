import ServersView from "../_components/ServersView";
import { Suspense } from "react";

export default async function Page() {

    return (
        <main className="w-full">
            <h1 className="text-3xl text-white font-semibold my-8 text-center">Your Servers</h1>
            <div className="flex w-full gap-4 mx-auto max-w-4xl px-5 mb-10">
                
                    <Suspense fallback={<ServersView.Skeleton />}>
                        <ServersView />
                    </Suspense>
            </div>
        </main>

    );
}
