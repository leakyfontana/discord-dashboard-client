import { createContext } from "react";
import { Channel } from "../types";

type ViewChannelsContextType = {
    viewChannels?: Channel[],
    setViewChannels: (channels: Channel[]) => void;
}
export const ViewChannelsContext = createContext<ViewChannelsContextType>({
    setViewChannels: () => {}, 
});