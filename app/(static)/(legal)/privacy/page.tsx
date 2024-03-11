import { anton } from "@/app/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
    return (
        <main className="w-full max-w-5xl pt-5 max-sm:pt-0 px-5 mt-16 mx-auto flex-grow text-neutral-400">
            <h1 className={cn("text-5xl font-semibold  text-neutral-200 w-full capitalize", anton.className)}>{"COINSHOT PRIVACY POLICY"}</h1>
            <p className="pt-2">Effective: March 11, 2024</p>
            <p className="">Last Updated: March 11, 2024</p>
            <ul className="pt-3 gap-6 flex flex-col">
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">Introduction</h2>
                    {'Welcome! This privacy policy ("Policy") describes how we ("EncryptMan", the creator) collect, use, and disclose your information in connection with your use of the CoinShot Discord bot ("Bot"). We are committed to protecting your privacy and ensuring that you have a safe and secure experience while using the Bot. By using the Bot, you agree to the terms of this Policy. If you do not agree to the terms of this Policy, please do not use the Bot.'}
                </li>
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">Information We Collect</h2>
                    {'We collect the following information when you use the CoinShot Discord Bot:'}
                    <ul className="list-disc pl-5 gap-2 my-3 flex flex-col">
                        <li>
                            <span className="font-semibold text-neutral-300">Bot Interactions:</span>{' We collect and store data about your interactions with the Bot, including commands you use and the content of your messages. This is done to improve the Bot\'s functionality and performance through analysis.'}  
                        </li>
                        <li>
                            <span className="font-semibold text-neutral-300">Server Identifiers:</span>{' We collect server identifiers to link the Bot\'s activity to your specific server. This is done to prevent abuse and ensure the Bot operates as intended.'}
                        </li>
                        <li>
                            <span className="font-semibold text-neutral-300">Error Information:</span>{' We collect and store error information to troubleshoot and fix issues with the Bot. This includes, but is not limited to, error messages, command usage, and server identifiers.'}
                        </li>
                        <li>
                            <span className="font-semibold text-neutral-300">Cryptocurrency Information:</span>{' We collect and store cryptocurrency information you request (e.g., prices, charts) to provide the Bot\'s functionalities.'}
                        </li>
                    </ul>
                    {'For Dashboard website users, we collect the following additional information (if applicable):'}
                    <ul className="list-disc pl-5 gap-2 mt-3 flex flex-col">
                        <li>
                            <span className="font-semibold text-neutral-300">User information:</span>{' We collect basic user information to provide Dashboard features. This includes your Discord username, profile picture (if available), and a list of your servers. Additionally, information about your permissions within those servers to manage Dashboard access effectively is stored.'}
                        </li>
                        <li>
                            <span className="font-semibold text-neutral-300">Server settings:</span>{' We store settings information linked to your server as modified by you through the Dashboard. This includes, but is not limited to, automation channels, disabled commands, and other server-specific settings only to be used by CoinShot bot.'}
                        </li>
                        <li>
                            <span className="font-semibold text-neutral-300">Analytics:</span>{' We collect and store website analytics data to improve the Dashboard experience. This includes, but is not limited to, page views, and other website usage data. No website analytic data is linked to any specific user or Discord server.'}
                        </li>
                        <li>
                            <span className="font-semibold text-neutral-300">Cookies:</span>{' We use cookies on our website. We use cookies for the sole purpose of keeping users signed in. When you sign in to our website, we will set a cookie in your browser. This cookie does not track you or store any personal data apart from what is necessary to keep you signed in.'}
                        </li>
                    </ul>

                </li>
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">How We Use Your Information</h2>
                    {'We use the information we collect for the following purposes:'}
                    <ul className="list-disc pl-5 gap-2 mt-3 flex flex-col">
                        <li>
                            {'To improve the Bot\'s functionality and performance through analysis.'}
                        </li>
                        <li>
                            {'To monitor overall usage patterns to ensure efficient operation.'}
                        </li>
                        <li>
                            {'To provide functionalities within the user dashboard (if applicable).'}
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">Information Sharing</h2>
                    {'We will not share your information with any third-party without your explicit consent, except as required by law.'}
                </li>
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">Data Retention</h2>
                    {'We will retain your information for a reasonable period to fulfill the purposes outlined above and comply with legal obligations. Once the data is no longer necessary, we will securely delete it.'}
                </li>
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">Your Rights</h2>
                    {'You have certain rights regarding your information:'}
                    <ul className="list-disc pl-5 gap-2 mt-3 flex flex-col">
                        <li>
                            {'You have the right to access the information we hold about you.'}
                        </li>
                        <li>
                            {'You have the right to request that we delete your information.'}
                        </li>
                        <li>
                            {'You have the right to request that we correct any information you believe is inaccurate.'}
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">Security</h2>
                    {'We take reasonable security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission or electronic storage is ever completely secure. Therefore, we cannot guarantee the absolute security of your information.'}
                </li>
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">{'Children\'s Privacy'}</h2>
                    {'The CoinShot Discord Bot is not directed to children under 13. We do not knowingly collect information from children under 13. If you are a parent or guardian and you believe your child has provided us with information, please contact us and we will take steps to delete such information.'}
                </li>
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">{'Changes to this Privacy Policy'}</h2>
                    {'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website or within the Bot.'}
                </li>
                <li>
                    <h2 className="text-xl text-neutral-200 font-semibold pb-2">Contact</h2>
                    {'If you have any questions about this Privacy Policy, please contact us at '}<Link href='mailto:swing_stitch.0c@icloud.com' className="text-blue-400">{'swing_stitch.0c@icloud.com'}</Link>
                    {' or join '}<Link href={process.env.SUPPORT_SERVER_URL ?? ''} className="text-blue-400" target="_blank">{'CoinShot\'s Support Server'}</Link>{' on Discord.'}
                </li>
            </ul>
        </main>
    );
}