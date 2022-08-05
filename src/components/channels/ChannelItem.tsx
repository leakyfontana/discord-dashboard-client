import React, { FC, useContext } from "react";
import { FaHashtag, FaUserPlus } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import { Channel } from "../../utils/types";
import { ViewChannelsContext } from "../../utils/contexts/ViewChannelsContexts";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import { useDrag } from "react-dnd";


type Props = {
    channel: Channel
}

export const ChannelItem: FC<Props> = ({ channel }) => {

    const { viewChannels, setViewChannels } = useContext(ViewChannelsContext);

    // const [{isDragging}, drag] = useDrag(() => ({
    //     type: "channelItem",
    //     item: {id: Props.id},
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));

    //ref={drag}

    //${isDragging ? 'bg-discord-blue' : ''}

    const handleAdd = () => {
        if (viewChannels?.includes(channel)) {
            toast.warn('This channel has already been added');
            return;
        }
        
        const tempViewChannels = [...viewChannels ?? [], channel];

        if (tempViewChannels.length > 8) {
            toast.warn('Dashboard is full (8 channel maximum)');
            return;
        } 

        setViewChannels(tempViewChannels);
        console.log(viewChannels);       
    }

    return (
        <div className='flex flex-row items-center justify-start gap-5 px-3 py-1 text-white rounded-md bg-slate-600'
            onClick={handleAdd}>
            <FaHashtag className='w-3'  />
            <h2>{channel.name}</h2>
        </div>
    )
}