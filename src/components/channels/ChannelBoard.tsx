import React, { FC, useContext, useEffect, useState } from "react";
import { FaHashtag, FaUserPlus } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import { Channel, Message } from "../../utils/types";
import { useRouter } from "next/router";
import { ViewChannelsContext } from "../../utils/contexts/ViewChannelsContexts";
import { ViewChannel } from "./ViewChannel";
import { fetchChannelMessages } from "../../utils/api";
import useSWR from "swr";

const API_URL = 'http://localhost:3000/api';

const fetcher = async (ids?: string[]) => {
    let data: any = [];
    if (ids === undefined) return;

    for (const id of ids) {
        const response = await fetch(`${API_URL}/channels/${id}/messages`);
        data = data.concat(await response.json());
    }
    return data;
}

const GetMessages = (ids?: string[]) => {

    const { data, error } = useSWR([ ids ], fetcher);

    return {
        messages: data ,
        isLoading: !error && !data,
        isError: error
    }
}


export const ChannelBoard = () => {
    const { viewChannels } = useContext(ViewChannelsContext);

    const router = useRouter();
    const isGuildSelected = router.route === '/channels/[id]' ? true  : false;


    const { messages, isLoading, isError } = GetMessages(viewChannels?.map(ViewChannel => ViewChannel.id));

    if (isLoading && viewChannels != undefined) return <h2>Loading...</h2>
    if (isError && viewChannels != undefined) return <h2>An error has occurred</h2>

    return (
        <div className='flex flex-row items-center justify-center w-full p-4 text-white divide-x-2 divide-slate-900 bg-slate-700'>
            {viewChannels?.length === 0 ? 
                <> 
                    {isGuildSelected ?
                        <p>Select a channel to add to dashboard</p> 
                        : 
                        <p>Please select a guild</p>
                    } 
                </>   
                :
                <>
                    {viewChannels?.map((viewChannel) => (
                        <div key={viewChannel.id} className='flex flex-col justify-between h-screen px-4 grow'>
                            <ViewChannel channel={viewChannel} messages={messages?.filter((message: { channel_id: string; }) => message.channel_id === viewChannel.id).reverse()} />
                        </div>
                    ))}
                </>
                }    
        </div>
    )
}