import type { NextPage } from 'next'
import Link from 'next/link';
import React from 'react';
import { FaDiscord} from 'react-icons/fa';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Home: NextPage = () => {

  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/discord`
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-5 p-48 bg-slate-800'>
      <button className='py-4 px-10 text-lg rounded-md text-[#7289DA] bg-lime-300 flex flex-row gap-4 items-center'
        onClick={handleLogin}>
        <FaDiscord size='30' color='#7289DA'/>
        <span className='whitespace-nowrap'>Login with Discord</span>
      </button>
      <div className='flex flex-row gap-1 text-lime-300'>
        <Link href="https://discord.com/api/oauth2/authorize?client_id=982418186068697128&redirect_uri=https%3A%2F%2Fapi.jasn.site%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email%20activities.read%20guilds%20guilds.members.read%20connections%20messages.read%20rpc.voice.read">
          <p className='underline cursor-pointer'>Click here</p>
        </Link> 
        <p>to add JASN to your guilds</p>
      </div>
  </div>
  )
}

export default Home
