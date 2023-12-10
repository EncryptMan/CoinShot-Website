import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import { AuthOptions } from "next-auth";
import { prisma } from "@/utils/db";
import { refreshUserGuilds } from "@/app/lib/actions";

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
        async jwt({ token, account }) {

            try {
                if (account) {
                    token.id = account.providerAccountId;
                    token.accessToken = account.access_token;
                    token.accessTokenType = account.token_type;
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
                    session.user.accessTokenType = token.accessTokenType;
                }
            } catch (error) {
                console.log('Error in session callback');
                console.error(error);
            }

            return session;
        },
        async signIn({ profile, user, account }) {

            // console.log('Sign in');
            // console.log(profile);
            // console.log(user);

            if (!profile || !account) {
                console.log('Profile or account is null');
                return false;
            }

            // try {
            //     const match = await prisma.user.findUnique({
            //         where: {
            //             id: account.providerAccountId,
            //         },
            //     });

            //     if (!match) {
            //         const newUser = await prisma.user.create({
            //             data: {
            //                 id: account.providerAccountId,
            //                 username: profile.username,
            //                 avatarUrl: user.image,
            //             },
            //         });
            //     }
            // } catch (error) {
            //     console.error(error);
            // }

            return true;
        }
    }
};


export default authOptions;