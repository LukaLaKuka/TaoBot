import { Message } from "discord.js";
import rhytmsFunction from "./Modules/rhytms";
import { loveUToo } from "./Modules/loveUToo";


export function manage(message: Message) {
    rhytmsFunction(message);
    loveUToo(message);
}