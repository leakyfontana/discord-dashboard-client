import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { ChannelDropdown } from "../../../components/channels/ChannelDropdown";
import { GuildMenuItem } from "../../../components/guilds/GuildMenuItem";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { fetchChannels, fetchChannelsAndGuilds, fetchMutualGuilds } from "../../../utils/api";
import { GuildsContext } from "../../../utils/contexts/GuildContexts";
import { Channel, Guild, NextPageWithLayout } from "../../../utils/types";

type Props = {
    guilds: Guild[];
    channels: Channel[];
}

const DashboardPage: NextPageWithLayout<Props> = ({ guilds, channels }) => {

    const router = useRouter();
    const { setGuilds } = useContext(GuildsContext);
    useEffect(() => {
        setGuilds(guilds);
    }, []);

    const { id } = router.query;
    const currentGuildIdx = guilds.findIndex((guild) => guild.id === id);


    return (
        <div className='flex flex-col items-start h-screen gap-3 p-4 ml-24 overflow-scroll text-white w-60 bg-slate-800'>
            <h2 className='text-xl'>{guilds[currentGuildIdx].name}</h2>
            <hr className='w-full divide-white'/>
            {channels?.filter(channel => channel.type === 4 && channel.name !== "Voice Channels").map((channel) => (
                <div className='w-full cursor-pointer' key={channel.id}>
                    <ChannelDropdown 
                        parentChannel={channel} 
                        childrenChannels={channels?.filter(c => c.parent_id === channel.id )} 
                    />
                </div>
            ))}
        </div>
    ); 
};

DashboardPage.getLayout = function (page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return fetchChannelsAndGuilds(ctx);
}

export default DashboardPage;