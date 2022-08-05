import type { NextPage } from 'next'
import React from 'react';
import { FaDiscord} from 'react-icons/fa';


const Home: NextPage = () => {

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/discord'
  };

  return (
    <div className='flex items-center justify-center h-screen p-48 bg-slate-800'>
      <div>
        <button className='py-4 px-10 text-lg rounded-md text-[#7289DA] bg-lime-300 flex flex-row gap-4 items-center'
          onClick={handleLogin}>
          <FaDiscord size='30' color='#7289DA'/>
          <span className='whitespace-nowrap'>Login with Discord</span>
        </button>
      </div>
    </div>
  )
}

export default Home
