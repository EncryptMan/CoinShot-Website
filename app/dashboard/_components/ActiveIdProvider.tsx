'use client'

import { createContext } from "react";

export const ActiveIdContext = createContext("");

export default async function ActiveIdProvider({ children, activeId }: { children: React.ReactNode, activeId: string }) {
    return (
        <ActiveIdContext.Provider value={activeId}>
            {children}
        </ActiveIdContext.Provider>
    )
}