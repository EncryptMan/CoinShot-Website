import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import { AuthOptions } from "next-auth";
import { prisma } from "@/utils/db";
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

            // console.log(profile);
            // console.log(user);
            // console.log(account);

            try {
                // Update the user's info in the database
                const userModel = await prisma.user.upsert({
                    where: {
                        id: profile.id,
                    },
                    update: {
                        globalName: profile.global_name ?? profile.username,
                        username: profile.username,
                        discriminator: profile.discriminator,
                        avatarUrl: user.image,
                    },
                    create: {
                        id: profile.id,
                        globalName: profile.global_name ?? profile.username,
                        username: profile.username,
                        discriminator: profile.discriminator,
                        avatarUrl: user.image,
                    },
                });

                // Get the user's guilds
                const userGuildsData = await axios.get('https://discord.com/api/users/@me/guilds', {
                    headers: {
                        Authorization: `Bearer ${account?.access_token}`,
                    },
                    timeout: 10000,
                    params: {
                        with_counts: true,
                    }
                });

                // Get the bot's guilds (for checking if the bot is in the guild)
                const botGuildIds = (await axios.get('https://discord.com/api/users/@me/guilds', {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                    },
                    timeout: 10000,
                })).data.map((guild: { id: any; }) => guild.id);

                const manageChannelPermission = BigInt(0x10); // The bit for the MANAGE_CHANNELS permission

                // filter out guilds that the user doesn't have the MANAGE_CHANNELS permission in
                const userGuildsWithPermission = userGuildsData.data.filter((guild: { permissions_new: string | number | bigint | boolean; }) =>
                    (BigInt(guild.permissions_new) & manageChannelPermission) !== BigInt(0)
                )

                // Update the user's guilds in the database
                for (const guild of userGuildsWithPermission) {

                    const iconSrc = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png';

                    const botPresent = botGuildIds.includes(guild.id);

                    // Update the guild's info in the database
                    await prisma.guild.upsert({
                        where: {
                            id: guild.id,
                        },
                        update: {
                            name: guild.name,
                            iconUrl: iconSrc,
                            memberCount: guild.approximate_member_count,
                            botPresent,
                        },
                        create: {
                            id: guild.id,
                            name: guild.name,
                            iconUrl: iconSrc,
                            memberCount: guild.approximate_member_count,
                            botPresent,
                        },
                    });


                    // Update the user's guild profile in the database
                    try {
                        await prisma.guildUser.upsert({
                            where: {
                                userId_guildId: {
                                    userId: profile.id,
                                    guildId: guild.id,
                                },
                            },
                            update: {
                                owner: guild.owner,
                                permissions: guild.permissions,
                                newPermissions: guild.permissions_new,
                            },
                            create: {
                                userId: profile.id,
                                guildId: guild.id,
                                owner: guild.owner,
                                permissions: guild.permissions,
                                newPermissions: guild.permissions_new,
                            },
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }

                // filter out guilds that the user have the MANAGE_CHANNELS permission in
                // const userGuildsWithoutPermission = userGuildsData.data.filter((guild: { permissions_new: string | number | bigint | boolean; }) =>
                //     (BigInt(guild.permissions_new) & manageChannelPermission) === BigInt(0)
                // )

                // // delete guild user if user doesn't have the MANAGE_CHANNELS permission in the guild
                // for (const guild of userGuildsWithoutPermission) {
                //     try {
                //         await prisma.guildUser.delete({
                //             where: {
                //                 userId_guildId: {
                //                     userId: profile.id,
                //                     guildId: guild.id,
                //                 },
                //             },
                //         });
                //     } catch (error) {
                //         console.error(error);
                //     }
                // }

            } catch (error) {
                console.log(error);
            }


            return true;
        }
    }
};


export default authOptions;