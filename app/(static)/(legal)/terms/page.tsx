import { anton } from "@/app/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
    return (
        <main className="w-full max-w-5xl pt-5 max-sm:pt-0 px-5 mt-16 mx-auto flex-grow text-neutral-400">
                <h1 className={cn("text-5xl font-semibold  text-neutral-200 w-full capitalize", anton.className)}>{"COINSHOT'S TERMS OF SERVICE"}</h1>
                <p className="pt-2">Effective: March 11, 2024</p>
                <p className="">Last Updated: March 11, 2024</p>
                <p className="">Author: EncryptMan</p>
                <ul className="pt-3 gap-6 flex flex-col">
                    <li>
                        <h2 className="text-xl text-neutral-200 font-semibold pb-2">1. Introduction</h2>
                        {'This Terms of Service ("TOS") agreement outlines the terms and conditions governing your use of the CoinShot Discord bot ("Bot"), created by EncryptMan (an individual). '}
                        {'As a responsible user of the CoinShot Discord bot, you agree to certain terms and conditions to ensure a safe and ethical environment for everyone. By using the Bot, you agree to be bound by these TOS. If you do not agree to these TOS, you may not use the Bot. I reserve the right to update these TOS at any time, and it is your responsibility to review these TOS periodically. Your continued use of the Bot after any changes to these TOS constitutes acceptance of those changes.'}
                    </li>
                    <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">2. Use of the Bot</h2>
                        {'First and foremost, you are accountable for all activity that happens on your Discord server while the bot is running. It\'s important to use the bot for legitimate purposes only, complying with both '}<Link href='https://discord.com/terms' target="_blank" className="text-blue-400">{'Discord\'s Terms of Service'}</Link>{' and legal regulations.'}
                        <br />
                        <br />
                        {'When it comes to data security, your privacy is important. You should refrain from sharing any sensitive financial information to the bot or anywhere in Discord. This includes, but is not limited to, critical details like credit card numbers, bank account information, social security numbers, or the all-important seed phrases used to access your cryptocurrency wallets.'}
                    </li>
                    <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">3. Data and Privacy</h2>
                        {'I respect your privacy and am committed to protecting your information. The CoinShot Discord bot collects and stores some data to function effectively. This data includes cryptocurrency information you request (e.g., prices, charts) and server identifiers to link the Bot\'s activity to your specific server. This is done to prevent abuse and ensure the Bot operates as intended.'}
                        <br />
                        <br />
                        {'For users with access to CoinShot\'s Dashboard (if applicable):  only basic user information is collected to provide those features. This include your Discord username, profile picture (if available), and a list of your servers. Additionally, information about your permissions within those servers to manage Dashboard access effectively is stored.'}
                        <br />
                        <br />
                        {'This collected data is used solely for three purposes: improving the Bot\'s functionality and performance through analysis, monitoring overall usage patterns to ensure efficient operation, and providing functionalities within the user dashboard (if applicable). Your privacy is a priority. Your data will never be shared with any third-party without your explicit permission, except as required by law. It\'s important to remember that you are responsible for complying with all applicable data privacy laws and regulations regarding any user data collected on your server while using the Bot.'}
                    </li>
                    <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2"> 4. Disclaimers</h2>
                        {'The Bot is provided "as is" and without warranties of any kind, express or implied. I disclaim all warranties regarding the accuracy, timeliness, and completeness of data provided by the Bot. The Bot retrieves data from third-party cryptocurrency exchange APIs (including Binance, Bitget, OKX, and Coingecko) and I cannot guarantee the accuracy or reliability of that data.'}
                        <br />
                        <br />
                        {'The information provided by the Bot is for informational purposes only and should not be considered financial advice. I am not responsible for any investment decisions you make based on the Bot\'s data and will not be liable for any losses you may incur. Cryptocurrency investments are inherently risky and you should always do your own research before making any investment decisions.'}
                        <br />
                        <br />
                        {'The CoinShot bot will never directly ask anyone for money, including but not limited to, through direct messages (DMs). Additionally, I am not responsible for any impersonations of the CoinShot bot attempting to scam users. If you encounter such attempts, please report them to Discord immediately.'}
                    </li>
                    <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">5. Limitation of Liability</h2>
                        {'In no event will EncryptMan be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Bot.'}
                    </li>
                    <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">6. Termination</h2>
                        {'Your access to the Bot may be terminated at any time, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account. This may be done because of a violation of these TOS, or any other reason.'}
                        <br />
                        <br />
                        {'I reserve the right to modify or discontinue, temporarily or permanently, the Bot (or any part of it) with or without notice. I will not be liable to you or to any third party for any modification, suspension, or discontinuance of the Bot.'}
                    </li>
                    <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">7. Governing Law</h2>
                        {'This TOS will be governed by and construed in accordance with the laws chosen by the user at the time of dispute resolution.'}
                    </li>
                    <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">8. Entire Agreement</h2>
                        {'This TOS constitutes the entire agreement between you and me regarding your use of the Bot. It supersedes all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning its subject matter.'}
                    </li>
                    <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">9. Changes to the TOS</h2>
                        {'I reserve the right to update these TOS at any time. You will be notified of any changes by posting the new TOS on the Bot\'s website or through a message within the Bot itself.'}
                    </li>
                    <li>

                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">10. Contact</h2>
                        {'If you have any questions about these TOS, please contact me at '}<Link href='mailto:swing_stitch.0c@icloud.com' className="text-blue-400">{'swing_stitch.0c@icloud.com'}</Link>
                        {' or join '}<Link href={process.env.SUPPORT_SERVER_URL ?? ''} className="text-blue-400" target="_blank">{'CoinShot\'s Support Server'}</Link>{' on Discord.'}
                    </li>
                </ul>
        </main>
    );
}