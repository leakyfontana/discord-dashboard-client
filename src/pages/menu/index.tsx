import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useEffect } from 'react';
import { GuildMenuItem } from '../../components/guilds/GuildMenuItem';
import { DashboardLayout } from '../../components/layouts/dashboard';
import { Sidebar } from '../../components/misc/Sidebar';
import { fetchMutualGuilds } from '../../utils/api';
import { GuildsContext } from '../../utils/contexts/GuildContexts';
import { Guild, NextPageWithLayout } from '../../utils/types';

type Props = {
    guilds: Guild[];
};

const MenuPage: NextPageWithLayout<Props> = ({ guilds }) => {
    const { setGuilds } = useContext(GuildsContext);
    useEffect(() => {
        //console.log(guilds);
        setGuilds(guilds);
    }, []);

    return (
        <></>
    )
};

MenuPage.getLayout = function (page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return fetchMutualGuilds(context);
}

export default MenuPage;
