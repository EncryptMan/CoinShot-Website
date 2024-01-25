"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import authOptions from "@/auth.options";
import axios from "axios";
import { Guild } from "@prisma/client";


export async function fetchGuilds() {
  const session = await getServerSession(authOptions);

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

    if(!guildUser?.guild.botPresent) return [];

    const response = await axios.get(`https://discord.com/api/guilds/${guildId}/channels`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    });

    const guildChannels = response.data;

    const simplifiedGuildChannels = guildChannels.map((channel: any) => ({
      id: channel.id,
      name: channel.name,
    })) as { id: string, name: string }[];

    console.log('Guild channels fetched from Discord API');

    return simplifiedGuildChannels;
  } catch (error) {
    console.error(error);
  }

  return [];
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

    if(!guildUser?.guild.botPresent) return [];
    
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
    await prisma.guildSettings.update({
      where: {
        id: guildId,
      },
      data: {
        dataSource: source,
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
  try {
    await prisma.guildAutomations.update({
      where: {
        id: guildId,
      },
      data: {
        [`${automation}ChannelId`]: channelId,
      },
    });

    const automationName = automation.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
    const logMessage = `${automationName} automation channel updated`;
    await logDashboardActivity(guildId, logMessage);

    return true;
  } catch (error) {
    console.error(error);
  }

  return false;
}

export async function logDashboardActivity(guildId: string, message: string) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) throw new Error('User id is undefined')

    await prisma.dashboardLog.create({
      data: {
        guildId,
        userId,
        message
      }
    })

    revalidatePath(`/dashboard/${guildId}`)
    console.log('Dashboard activity logged in the database');
  } catch (error) {
    console.error(error);
  }
}