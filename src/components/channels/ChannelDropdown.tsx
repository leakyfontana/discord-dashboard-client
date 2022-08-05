import React, { FC, useState } from "react";
import { Channel } from "../../utils/types";
import { FaCaretDown, FaCaretUp, FaPlus } from 'react-icons/fa';
import { ChannelItem } from "./ChannelItem";

type Props = {
    parentChannel: Channel,
    childrenChannels: Channel[]
}

export const ChannelDropdown: FC<Props> = ({ parentChannel, childrenChannels }) => {
    const [isExpanded, setExpanded] = useState(false);

    const expand = () => {
        setExpanded(!isExpanded);
    };

    return (
        <>
            <div className='flex flex-row justify-between my-2 text-discord-light-grey'>
                <span className='flex flex-row gap-2' onClick={expand}>
                    <FaCaretDown className={`w-3 ${isExpanded ? 'block': 'hidden'}`} />
                    <FaCaretUp className={`w-3 ${isExpanded ? 'hidden': 'block'}`} />
                    <h2>{parentChannel.name}</h2>
                </span>
            </div>
            <div className={`${isExpanded ? 'flex flex-col gap-2': 'hidden'}`} > {childrenChannels.map((channel) => {
                if (channel.type != 0) return <div key={channel.id}></div>
                return (
                    <div key={channel.id}>
                        <ChannelItem channel={channel} />
                    </div>
                )
            })}
            </div>
        </>
    );
}