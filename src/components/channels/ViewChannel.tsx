import React, { FC, useContext, useEffect, useState } from "react";
import { Channel, Message } from "../../utils/types";
import { FaHashtag } from 'react-icons/fa';
import { AiFillCloseCircle, AiFillPlusCircle } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { ViewChannelsContext } from "../../utils/contexts/ViewChannelsContexts";
import Image from "next/image";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { fetchChannelMessages, postChannelMessage } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";

const API_URL = 'http://localhost:3000/api';

type Props = {
    channel: Channel
    messages: Message[] | undefined
}

export const ViewChannel: FC<Props> = ({ channel, messages }) => {

    const { viewChannels, setViewChannels } = useContext(ViewChannelsContext);
    const [ pendingMessage, setPendingMessage ] = useState('');

    const handleRemove = () => {
        
        const tempViewChannels = viewChannels?.filter(vc => vc.id !== channel.id);
        setViewChannels(tempViewChannels ?? []);
    }

    const handleSubmit = async () => {
        if (pendingMessage === '') {
            toast.warn('Please enter a message');
        }

        const response = await postChannelMessage(channel.id);
        messages?.push( response );


        console.log(pendingMessage);
        setPendingMessage('');
    }

    return (
        <>
            <div className='flex flex-row items-center w-full gap-1 py-2 text-2xl text-center'>
                <FaHashtag className='w-3'  />
                <h2>{channel.name}</h2>
                <button className='pr-4 ml-auto'>
                    <AiFillCloseCircle size={30} onClick={handleRemove}/>
                </button>
            </div>
            <div className='flex flex-col gap-3 mt-auto overflow-scroll'>
                {messages?.map((message: Message) => {
                    return (
                    <div key={message.id} className='flex flex-row items-center justify-center'>
                        <div className="h-16 mr-auto">
                            <Image 
                                src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`}
                                className='rounded-full'
                                height={50}
                                width={50}
                                layout='fixed'
                            />
                        </div>
                        <div className='flex flex-col w-9/12 gap-2'>
                            <h2 className='font-bold'>{message.author.username}</h2>
                            {message.type === 0 ? 
                            <p className='px-4 py-2 text-white bg-[#5865F2] rounded-xl'>{message.content}</p>
                            : 
                            <p>{message.author.username} has joined the channel.</p>}                          
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className='flex flex-row w-auto gap-3 p-2 bg-discord-grey'>
                <input 
                    className='w-full p-1 text-black rounded-md bg-discord-dark-grey' 
                    type='text' 
                    placeholder='Send Message'
                    value={pendingMessage}
                    onChange={e => setPendingMessage(e.target.value)}
                    >
                </input>
                <button>
                    <FiSend 
                        className='w-5'
                        onClick={handleSubmit}
                    />
                </button>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return fetchChannelMessages(ctx);
}

