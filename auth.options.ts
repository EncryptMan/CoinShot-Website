import DiscordProvider from "next-auth/providers/discord";
import { AuthOptions } from "next-auth";
import axios from "axios";

const scopes = ['identify', 'guilds']

const authOptions: AuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID ?? "",
            clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
            authorization: { params: { scope: scopes.join(' ') } },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {

            try {
                if (account) {
                    token.id = account.providerAccountId;
                    token.accessToken = account.access_token;
                }

                if (profile) {
                    token.globalName = profile.global_name
                    token.discriminator = profile.discriminator
                }
            } catch (error) {
                console.log('Error in jwt callback');
                console.error(error);
            }

            return token;
        },
        async session({ session, token }) {

            try {
                if (session.user) {
                    session.user.id = token.id;
                    session.user.accessToken = token.accessToken;
                    session.user.globalName = token.globalName
                    session.user.discriminator = token.discriminator
                }
            } catch (error) {
                console.log('Error in session callback');
                console.error(error);
            }

            return session;
        },
        async signIn({ profile, user, account }) {

            console.log('Sign in function executing');

            if (!profile) {
                console.log('Profile is null in sign in function');
                return false;
            };

            if (!account) {
                console.log('Account is null in sign in function');
                return false;
            };

            try {
                await axios.post(`${process.env.COINSHOT_SERVICES_API}/signin`, {
                    profile,
                    user,
                    account
                }, {
                    headers: {
                        'x-api-key': process.env.COINSHOT_SERVICES_KEY,
                    },
                    timeout: 10000,
                });
            } catch (error) {
                console.error(error);
            }

            return true;

        }
    }
};


export default authOptions;