import { FC } from "react"
import { Guild } from "../../utils/types"
import Image from 'next/image';

type Props = {
    guild: Guild;
}

export const GuildMenuItem: FC<Props> = ({ guild }) => {
    return (
        <div className='w-14'>
            <Image 
                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                height={70}
                width={70}
                className='rounded-full'
                alt={guild.name}
            />
        </div>
    ); 
}