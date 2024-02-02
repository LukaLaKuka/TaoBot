import { Message } from "discord.js";
import rhytmsFunction from "./Modules/rhytms";
import loveUToo from "./Modules/loveUToo";


export async function messageManage(message: Message) {
    if (message.author.bot) {
        return;
    }
    await rhytmsFunction(message);
    await loveUToo(message);
}