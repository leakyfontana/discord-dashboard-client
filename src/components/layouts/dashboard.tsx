import React, { useContext } from "react";
import { ReactElement } from "react";
import { GuildsContext } from "../../utils/contexts/GuildContexts";
import { ChannelBoard } from "../channels/ChannelBoard";
import { Sidebar } from "../misc/Sidebar";

export function DashboardLayout({ children }: {children: ReactElement}) {
    const { guilds } = useContext(GuildsContext);

    return (
        <div className='flex flex-row h-screen'>
            <Sidebar guilds={guilds} />
            <div className='h-full'>
                <>{children}</>
            </div>
            <ChannelBoard />
        </div>
    )
}