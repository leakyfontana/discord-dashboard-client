import { useRouter } from 'next/router';
import { Guild } from '../../utils/types';
import React, { FC } from 'react';
import { GuildMenuItem } from '../guilds/GuildMenuItem';

// const routes = [
//     {
//         name: 'dashboard',
//         icon: <MdSpaceDashboard size={36} />,
//         getPath: (id: string) => `/dashboard/${id}`
//     },
//     {
//         name: 'commands',
//         icon: <BsTerminal size={36} />,
//         getPath: (id: string) => `/dashboard/${id}/commands`
//     },
//     {
//         name: 'settings',
//         icon: <FaWrench size={36} />,
//         getPath: (id: string) => `/dashboard/${id}/settings`
//     },
// ];

type Props = {
    guilds?: Guild[];
};

export const Sidebar: FC<Props> = ({ guilds }) => {
    const router = useRouter();
    return (
        <div className='fixed top-0 left-0 flex flex-col items-center w-24 h-full gap-5 p-8 overflow-scroll text-white bg-slate-900'>
            {guilds?.map((guild) => (
                <div className='cursor-pointer' key={guild.id} onClick={() => router.push(`/channels/${guild.id}`)}>
                    <GuildMenuItem guild={guild} />
                </div>
            ))}
        </div>
    )
}