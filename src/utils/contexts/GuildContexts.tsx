import { createContext } from "react";
import { Guild } from "../types";

type GuildsContextType = {
    guilds?: Guild[],
    setGuilds: (guilds: Guild[]) => void;
}
export const GuildsContext = createContext<GuildsContextType>({
    setGuilds: () => {}, 
});