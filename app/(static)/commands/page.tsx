import { anton } from "@/app/lib/fonts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export default function Page() {
    return (
        <main className="w-full max-w-5xl max-sm:pt-5 px-5 mt-16 max-sm:mt-10 mx-auto flex-grow">
            <h1 className={cn("text-5xl font-semibold  text-neutral-200 w-full max-md:text-center", anton.className)}>Commands ⚙️</h1>
            <div className="flex flex-col gap-5 w-full mt-5">
                <Accordion type="multiple">
                    <Command name="ask" requiredParameters={["question"]} optionalParameters={[]} description="Ask CoinShot AI anything about cryptocurrency." usages={["/ask What are the latest news about Bitcoin?", "/ask What is the price of Ethereum?"]} />
                    <Command name="balance" requiredParameters={[]} optionalParameters={["user"]} description="Check your cryptocurrency exchange balances." usages={["/balance", "/balance @Cyde"]} />
                    <Command name="chart" requiredParameters={["symbol"]} optionalParameters={[]} description="See the chart of a coin or token." usages={["/chart btc", "/chart eth/btc", "/chart solana"]} />
                    <Command name="convert" requiredParameters={["input"]} optionalParameters={[]} description="Convert a coin or token to another." usages={["/convert 10 btc to eth", "/convert 5 dot ada"]} />
                    <Command name="create-invoice" requiredParameters={["coin"]} optionalParameters={["amount_coin", "amount_usd", "recipient", "decription"]} description="Create an invoice for a cryptocurrency payment." usages={["/create-invoice coin:BTC amount_coin:0.001 amount_usd:50 recipient:@Cyde description:Payment for services"]} new />
                    <Command name="fear-greed-index" requiredParameters={[]} optionalParameters={[]} description="View fear and greed index of cryptocurrency market." usages={["/fear-greed-index"]} />
                    <Command name="heatmap" requiredParameters={[]} optionalParameters={[]} description="View heatmap of cryptocurrency market." usages={["/heatmap"]} />
                    <Command name="information" requiredParameters={["name"]} optionalParameters={[]} description="Get information about a coin or token." usages={["/information btc", "/information ethereum"]} />
                    <Command name="news" requiredParameters={[]} optionalParameters={["page"]} description="View the latest news in the cryptocurrency market." usages={["/news", "/news 5"]} />
                    <Command name="price" requiredParameters={["symbol"]} optionalParameters={[]} description="Check the price of a coin or token." usages={["/price btc", "/price eth/btc", "/price solana"]} />
                    <Command name="wallet-address" requiredParameters={["coin"]} optionalParameters={["chain", "user"]} description="Show your cryptocurrency wallet address." usages={["/wallet-address coin:BTC", "/wallet-address coin:ETH chain:bsc"]} new />
                    <Command name="watchlist" requiredParameters={[]} optionalParameters={["user"]} description="Displays your watchlist or the watchlist of the specified user." usages={["/watchlist", "/watchlist @Cyde"]} />
                </Accordion>
            </div>
        </main>
    )
}

function Command({ name, requiredParameters, optionalParameters, description, usages, new: isNew }: { name: string, requiredParameters: string[], optionalParameters: string[], description: string, usages: string[], new?: boolean }) {
    return (
        <AccordionItem value={name} className="border border-slate-600 my-3 rounded-lg ">
            <AccordionTrigger className="data-[state=open]:bg-gray-700/75 px-3 no-underline hover:no-underline hover:bg-white/10">
                <div className="flex items-center gap-2">
                    <h2 className="text-neutral-200 text-xl hover:underline">/{name}</h2>
                    {isNew &&
                        <span className="text-xs text-neutral-200 rounded-lg px-2 py-1 ml-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border border-transparent bg-clip-padding">
                            New
                        </span>
                    }
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-neutral-400 text-lg p-3">
                <p className="text-xl">{description}</p>
                <br />
                {
                    requiredParameters.length > 0 && <p><span className="font-semibold text-neutral-200">Required Parameters:</span> {requiredParameters.map(value => `<${value}>`).join(" ")}</p>
                }
                {
                    optionalParameters.length > 0 && <p><span className="font-semibold text-neutral-200">Optional Parametes:</span> {optionalParameters.map(value => `<${value}>`).join(" ")}</p>
                }
                <div className="flex gap-2">
                    <span className="font-semibold text-neutral-200">Usage:</span>
                    <div className="">
                        {
                            usages.map((value, index) => <p key={index}>{value}</p>)
                        }
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}