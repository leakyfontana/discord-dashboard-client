import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import axios from "axios";
import { validateCookies } from "./helpers";
import { Channel, Guild, Message } from "./types";

const API_URL = 'http://localhost:3000/api';

export const fetchMutualGuilds = async (context: GetServerSidePropsContext) => {
  const headers = validateCookies(context);
  console.log(headers);
  if (!headers) return { redirect: { destination: '/' } };
  try {
    const { data: guilds } = await axios.get<Guild[]>(`${API_URL}/guilds`, {
      headers,
    });
    //console.log(guilds);
    return { props: { guilds, headers } };
  } catch (err) {
    console.log(err);
    return { redirect: { destination: '/' } };
  }
};

export const fetchGuild = async (ctx: GetServerSidePropsContext) => {
  const headers = validateCookies(ctx);
  console.log(headers);
  if (!headers) return { redirect: { destination: '/' } };
  try {
    const { data: guild } = await axios.get<Guild>(
      `${API_URL}/guilds/${ctx.query.id}`,
      {
        headers,
      }
    );
    //console.log(guild);
    return { props: { guild } };
  } catch (err) {
    console.log(err);
    return { redirect: { destination: '/' } };
  }
};

export const fetchValidGuild = (id: string, headers: HeadersInit) => {
  return fetch(`${API_URL}/guilds/${id}/permissions`, {
    headers,
  });
};

export const fetchChannels = async (ctx: GetServerSidePropsContext) => {
  const headers = validateCookies(ctx);
  if (!headers) return { redirect: { destination: '/' } };
  try {
    const { data: channels } = await axios.get<Channel[]>(
      `${API_URL}/guilds/${ctx.query.id}/channels`,
      {
        headers,
      }
    );
    //console.log(channels);
    return { props: { channels } };
  } catch (err) {
    console.log(err);
    return { redirect: { destination: '/' } };
  }
};

export const fetchChannelsAndGuilds = async (ctx: GetServerSidePropsContext) => {
  const headers = validateCookies(ctx);
  if (!headers) return { redirect: { destination: '/' } };
  try {
    const { data: channels } = await axios.get<Channel[]>(
      `${API_URL}/guilds/${ctx.query.id}/channels`,
      {
        headers,
      }
    );
    const { data: guilds } = await axios.get<Guild[]>(`${API_URL}/guilds`, {
      headers,
    });
    //console.log(channels);
    return { props: { guilds, channels } };
  } catch (err) {
    console.log(err);
    return { redirect: { destination: '/' } };
  }
};

export const fetchChannelMessages = async (ctx: GetServerSidePropsContext) => {
  try {
    const headers = validateCookies(ctx);
    if (!headers) return { redirect: { destination: '/' } };
    const { data: messages } = await axios.get<Message[]>(`${API_URL}/channels/${ctx.query.id}/messages`, {
      headers,
    });
    console.log(messages);
    return {  messages  };
  } catch (err) {
    console.log(err);
    return { redirect: { destination: '/' } };
  }
}

export const postChannelMessage = async (channelId: string) => {
  try {
    const response = await fetch 
    (
        `${API_URL}/channels/${channelId}/messages`,
        {
            method: 'POST'
        }
    );
    return await response?.json();
  }
  catch (err) {
    console.log(err);
    return { redirect: { destination: '/menu' } };
  }
}



// export const fetchGuild = async (ctx: GetServerSidePropsContext) => {
//   const headers = validateCookies(ctx);
//   console.log(headers);
//   if (!headers) return { redirect: { destination: '/' } };
//   try {
//     const { data: guild } = await axios.get<Guild>(
//       `${API_URL}/guilds/${ctx.query.id}`, 
//       {
//         headers,
//       }
//     );
//     console.log(guild);
//     return { props: { guild } };
//   } catch (err) {
//     console.log(err);
//     return { redirect: { destinations: '/' } };
//   }
// }

// export const fetchValidGuild = async (id: string | string[], headers: HeadersInit) => {
//   console.log(headers);
//   return fetch(`${API_URL}/guilds/${id}/permissions`, {
//     headers,
//   });
// }