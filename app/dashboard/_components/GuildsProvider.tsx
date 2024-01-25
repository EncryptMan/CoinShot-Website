'use client'

import { Guild } from "@prisma/client";
import { createContext } from "react";

export const GuildsContext = createContext([] as Guild[]);

export default async function GuildsProvider({ children, guilds }: { children: React.ReactNode, guilds: Guild[] }) {
    return (
        <GuildsContext.Provider value={guilds}>
                {children}
        </GuildsContext.Provider>
    )
}