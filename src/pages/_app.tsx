import React, { useState } from 'react';
import { GuildsContext } from '../utils/contexts/GuildContexts';
import { ViewChannelsContext } from '../utils/contexts/ViewChannelsContexts';
import '../utils/styles/globals.css'
import { AppPropsWithLayout, Channel, Guild } from '../utils/types'

function MyApp({ Component, pageProps }: AppPropsWithLayout<any>) {

  const [guilds, setGuilds] = useState<Guild[]>();
  const [viewChannels, setViewChannels] = useState<Channel[]>();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <GuildsContext.Provider value={{ guilds, setGuilds }}>
      <ViewChannelsContext.Provider value={{ viewChannels, setViewChannels}}>
        {getLayout(<Component {...pageProps} />)}
      </ViewChannelsContext.Provider>
    </GuildsContext.Provider>
  );
}

export default MyApp
