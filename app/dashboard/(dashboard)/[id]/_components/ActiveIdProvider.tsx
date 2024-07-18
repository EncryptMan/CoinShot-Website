'use client'

import { createContext } from "react";

export const ActiveGuildIdContext = createContext("");

export default function ActiveGuildIdProvider({ children, activeId }: { children: React.ReactNode, activeId: string }) {
    return (
        <ActiveGuildIdContext.Provider value={activeId}>
            {children}
        </ActiveGuildIdContext.Provider>
    )
}