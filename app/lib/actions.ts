"use server";

import { Session, User, getServerSession } from "next-auth";
import axios from "axios";
import { prisma } from "@/utils/db";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache";
import authOptions from "@/auth.options";


export async function refreshUserGuilds() {
  console.log('Refreshing user guilds');

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.log('Session or user is null');
    return redirect('/dashboard');
  }

  if (!session.user.accessToken || !session.user.accessTokenType) {
    console.log('Access token or access token type is null');
    return redirect('/dashboard');
  }

  if (!session.user.id) {
    console.log('Session user id is null');
    return redirect('/dashboard');
  }

  try {
    const res = await axios.get('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `${session.user.accessTokenType} ${session.user.accessToken}`,
      },
      timeout: 10000,
      params: {
        with_counts: true,
      }
    });

    const MANAGE_GUILD = BigInt(0x20); // The bit for the MANAGE_GUILD permission

    const userGuilds = res.data.filter((guild: { permissions_new: string | number | bigint | boolean; }) =>
      (BigInt(guild.permissions_new) & MANAGE_GUILD) !== BigInt(0)
    )

    for (const guild of userGuilds) {
      let guildMatch = await prisma.guild.findUnique({
        where: {
          id: guild.id,
        },
      });


      if (!guildMatch) {

        const iconSrc = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png';

        guildMatch = await prisma.guild.create({
          data: {
            id: guild.id,
            name: guild.name,
            iconUrl: iconSrc,
            memberCount: guild.approximate_member_count,
          },
        });

      }

      let guildUserMatch = await prisma.guildUser.findFirst({
        where: {
          userId: session.user.id,
          guildId: guildMatch.id,
        },
      });

      if (!guildUserMatch) {
        guildUserMatch = await prisma.guildUser.create({
          data: {
            userId: session.user.id,
            guildId: guild.id,

            owner: guild.owner,
            permissions: guild.permissions,
            newPermissions: guild.permissions_new,
          },
        });
      }
    }

    console.log('Guilds fetched');
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/dashboard');
  return redirect('/dashboard');
}

export async function fetchGuilds(session: Session | null) {
  if (session === null) {
    console.log('Session is null');
    return [];
  }

  if (!session.user) {
    console.log('Session user is null');
    return [];
  }

  if (!session.user.id) {
    console.log('Session user id is null');
    return [];
  }

  try {

    const guildUsers = await prisma.guildUser.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        guild: true,
      },
    });

    const guilds = guildUsers.map((guildUser: { guild: any; }) => guildUser.guild);

    console.log('Guilds fetched from database');
    return guilds;
  }
  catch (error) {
    console.error(error);
  }

  return [];
}

// export async function logIn() {
//   signIn('discord');
// }

// export async function logOut() {

// }