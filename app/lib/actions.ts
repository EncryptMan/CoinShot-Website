"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import authOptions from "@/auth.options";
import axios, { AxiosError } from "axios";
import { DataSource, Guild } from "@prisma/client";


export async function fetchGuilds() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return [];

  try {
    const guildUsers = await prisma.guildUser.findMany({
      where: {
        userId: session?.user?.id,
      },
      include: {
        guild: true,
      },
    });

    const guilds = guildUsers.map((guildUser: { guild: any; }) => guildUser.guild) as Guild[];

    console.log('Guilds fetched from database');
    return guilds;
  }
  catch (error) {
    console.error(error);
  }

  return [];
}

export async function fetchGuild(guildId: string) {
  const session = await getServerSession(authOptions);

  try {
    const guildUser = await prisma.guildUser.findUnique({
      where: {
        userId_guildId: {
          userId: session?.user?.id ?? '',
          guildId,
        },
      },
      include: {
        guild: true
      }
    })

    console.log('Guild fetched from database');

    if (guildUser?.guild.botPresent) return guildUser.guild
  }
  catch (error) {
    console.error(error);
  }

  return null;
}

export async function fetchGuildSettings(guildId: string) {
  const session = await getServerSession(authOptions);

  try {
    const guildUser = await prisma.guildUser.findUnique({
      where: {
        userId_guildId: {
          userId: session?.user?.id ?? '',
          guildId,
        },
      },
      include: {
        guild: {
          include: {
            guildSettings: true,
          },
        },
      }
    })

    if (guildUser?.guild.botPresent) {
      if (guildUser.guild.guildSettings) {
        console.log('Guild settings fetched from database');
        return guildUser.guild.guildSettings;
      } else {
        const guildSettings = await prisma.guildSettings.create({
          data: {
            id: guildId
          },
        });
        console.log('Guild settings created');
        return guildSettings;
      }
    }
  }
  catch (error) {
    console.error(error);
  }

  return null;
}

export async function fetchGuildCommands(guildId: string) {
  const session = await getServerSession(authOptions);

  try {
    const guildUser = await prisma.guildUser.findUnique({
      where: {
        userId_guildId: {
          userId: session?.user?.id ?? '',
          guildId,
        },
      },
      include: {
        guild: {
          include: {
            guildCommands: true,
          },
        },
      }
    })

    if (guildUser?.guild.botPresent) {
      if (guildUser.guild.guildCommands) {
        console.log('Guild commands fetched from database');
        return guildUser.guild.guildCommands;
      } else {
        const guildCommands = await prisma.guildCommands.create({
          data: {
            id: guildId
          },
        });
        console.log('Guild commands created');
        return guildCommands;
      }
    }
  }
  catch (error) {
    console.error(error);
  }

  return null;
}

export async function fetchGuildAutomations(guildId: string) {
  const session = await getServerSession(authOptions);

  try {
    const guildUser = await prisma.guildUser.findUnique({
      where: {
        userId_guildId: {
          userId: session?.user?.id ?? '',
          guildId,
        },
      },
      include: {
        guild: {
          include: {
            guildAutomations: true,
          },
        },
      }
    })

    if (guildUser?.guild.botPresent) {
      if (guildUser.guild.guildAutomations) {
        console.log('Guild automations fetched from database');
        return guildUser.guild.guildAutomations;
      } else {
        const guildAutomations = await prisma.guildAutomations.create({
          data: {
            id: guildId
          },
        });
        console.log('Guild automations created');
        return guildAutomations;
      }
    }
  }
  catch (error) {
    console.error(error);
  }

  return null;
}

export async function fetchGuildChannels(guildId: string) {
  const session = await getServerSession(authOptions);

  try {
    const guildUser = await prisma.guildUser.findUnique({
      where: {
        userId_guildId: {
          userId: session?.user?.id ?? '',
          guildId,
        },
      },
      include: {
        guild: true
      }
    })

    if (!guildUser) return { error: 'You do not have access to this server 😅' }

    if (!guildUser.guild.botPresent) return { error: 'Bot is not present in this server 😅' };

    const response = await axios.get(`https://discord.com/api/guilds/${guildId}/channels`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    });

    const guildChannels = response.data;

    const simplifiedGuildChannels = guildChannels
      .filter((channel: any) => ![2, 4, 13, 14, 15, 16].includes(channel.type))
      .map((channel: any) => ({
        id: channel.id,
        name: channel.name,
      })) as { id: string, name: string }[];

    console.log('Guild channels fetched from Discord API');

    return simplifiedGuildChannels;
  } catch (error) {

    const axiosError = error as AxiosError;

    // 429 Too Many Requests
    if (axiosError.response && axiosError.response.status === 429) {
      return { error: 'You are being rate limited due to too many requests. Please wait and try again later 😟' };
    }

    console.error(error);
  }

  return { error: 'Something went wrong while fetching server channels 😟' };
}

export async function fetchGuildDashboardLogs(guildId: string) {
  const session = await getServerSession(authOptions);

  try {
    const guildUser = await prisma.guildUser.findUnique({
      where: {
        userId_guildId: {
          userId: session?.user?.id ?? '',
          guildId,
        },
      },
      include: {
        guild: true
      }
    })

    if (!guildUser?.guild.botPresent) return [];

    const guildDashboardLogs = await prisma.dashboardLog.findMany({
      where: {
        guildId: guildId,
      },
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true
      }
    });

    console.log('Dashboard logs fetched from database');

    return guildDashboardLogs;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export async function setGuildDataSource(guildId: string, source: string) {
  try {
    await authorizeUser(guildId);

    let enumValue: DataSource = DataSource[source as keyof typeof DataSource];

    if (enumValue === undefined) {
      throw new Error(`Invalid source: ${source}`);
    }

    await prisma.guildSettings.update({
      where: {
        id: guildId,
      },
      data: {
        dataSource: enumValue,
      },
    });

    const logMessage = `Data source updated to ${source}`;
    await logDashboardActivity(guildId, logMessage);

    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function setGuildCommandEnabled(guildId: string, command: string, enabled: boolean) {
  try {
    await authorizeUser(guildId);

    await prisma.guildCommands.update({
      where: {
        id: guildId,
      },
      data: {
        [command]: enabled,
      },
    });

    const action = enabled ? 'enabled' : 'disabled';
    const commandName = command.replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase()).replace(/^-/, "");
    const logMessage = `/${commandName} command ${action}`;
    await logDashboardActivity(guildId, logMessage);

    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function setGuildAutomationEnabled(guildId: string, automation: string, enabled: boolean) {
  try {
    await authorizeUser(guildId);

    await prisma.guildAutomations.update({
      where: {
        id: guildId,
      },
      data: {
        [automation]: enabled,
      },
    });

    const action = enabled ? 'enabled' : 'disabled';
    const automationName = automation.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
    const logMessage = `${automationName} automation ${action}`;
    await logDashboardActivity(guildId, logMessage);

    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function setGuildAutomationChannel(guildId: string, automation: string, channelId: string) {
  const { error: authError } = await authorizeUserSafe(guildId);
  if (authError) return { error: authError }

  try {
    await axios.post(`https://discord.com/api/channels/${channelId}/messages`, {
      content: `${camelToTitle(automation)} automation enabled in this channel ✅`,

    }, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    });


  } catch (error) {
    const axiosError = error as AxiosError;

    interface DiscordErrorData {
      message?: string;
      code?: number;
    }

    const discordErrorData = axiosError.response?.data as DiscordErrorData;

    console.error(discordErrorData);

    // Check if the error is a Discord error with a specific code
    if (discordErrorData && discordErrorData.code === 50008) {
      return { error: 'This is not a text channel' };
    }

    // 403 Forbidden
    if (axiosError.response && axiosError.response.status === 403) {
      return { error: 'Bot does not have permission to send messages in this channel' };
    }

    // 429 Too Many Requests
    if (axiosError.response && axiosError.response.status === 429) {
      return { error: 'You are being rate limited due to too many requests' };
    }

    // 404 Not Found
    if (axiosError.response && axiosError.response.status === 404) {
      return { error: 'This channel was not found' };
    }

    console.error(axiosError);

    return { error: 'Something went wrong!' };
  }

  try {
    await prisma.guildAutomations.update({
      where: {
        id: guildId,
      },
      data: {
        [`${automation}ChannelId`]: channelId,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update automation channel' }
  }

  const automationName = automation.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
  const logMessage = `${automationName} automation channel updated`;
  await logDashboardActivity(guildId, logMessage);

  return {}
}

export async function setGuildAutomationTime(guildId: string, automation: string, time: number) {
  try {
    await authorizeUser(guildId);

    // Validate time
    if (time < 0 || time > 23) return { error: 'Invalid hour' }

    await prisma.guildAutomations.update({
      where: {
        id: guildId,
      },
      data: {
        [`${automation}Time`]: time,
      },
    });

    const automationName = automation.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
    const logMessage = `${automationName} automation time updated`;
    await logDashboardActivity(guildId, logMessage);

    return {}
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update automation time' }
  }
}

export async function logDashboardActivity(guildId: string, message: string) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    await axios.post(`${process.env.COINSHOT_SERVICES_API}/logActivity`, {
      guildId,
      user,
      message
    }, {
      headers: {
        'x-api-key': process.env.COINSHOT_SERVICES_KEY,
      },
      timeout: 10000,
    });

    revalidatePath(`/dashboard/${guildId}`)
  } catch (error) {
    console.error(error);
  }
}

async function authorizeUser(guildId: string) {
  const session = await getServerSession(authOptions);
  const guildUserCount = await prisma.guildUser.count({
    where: {
      userId: session?.user?.id,
      guildId,
    },
  });

  if (guildUserCount === 0) throw new Error('You must be signed in to perform this action');
}

async function authorizeUserSafe(guildId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { error: 'You must be signed in to perform this action' }

  const guildUserCount = await prisma.guildUser.count({
    where: {
      userId: session?.user?.id,
      guildId,
    },
  });

  if (guildUserCount === 0) return { error: 'You dont have access to this server' }

  return {}
}

function camelToTitle(camelCase: string) {
  // Insert a space before all caps
  let result = camelCase.replace(/([A-Z])/g, ' $1');

  // Uppercase the first character
  return result.charAt(0).toUpperCase() + result.slice(1);
}