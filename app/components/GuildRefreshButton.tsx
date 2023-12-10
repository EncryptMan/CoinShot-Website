"use client";

import { useFormState } from "react-dom";
import { refreshUserGuilds } from "../lib/actions";

export default function GuildRefreshButton() {

    const [state, dispatch] = useFormState(refreshUserGuilds, null);

    return (
        <form action={dispatch}>

        <button type="submit" className="rounded-xl bg-green-800 text-white text-xl hover:bg-green-900 p-2">
            Refresh Server
        </button>
        </form>
    );
}