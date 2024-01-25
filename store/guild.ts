import { Guild } from '@prisma/client'
import { create } from 'zustand'


export const guilds = create((set) => ({
    guilds: [],
    setGuildList: (guildList: Guild[]) => set({ guilds }),
}))