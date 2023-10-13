import { Message } from "discord.js";
import rhytmsFunction from "./Modules/rhytms";
import loveUToo from "./Modules/loveUToo";


export function messageManage(message: Message) {
    if (message.author.bot) {
        return;
    }
    rhytmsFunction(message);
    loveUToo(message);
}