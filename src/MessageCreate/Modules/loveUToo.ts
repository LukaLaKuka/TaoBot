import { Message } from "discord.js";
import * as lovedUsers from "../../data/lovedUsers.json"

export async function loveUToo(message: Message) {
    for (let user of lovedUsers.users) {
        if (user.USER_ID == message.author.id && message.content.toLowerCase() == "te amo hu tao") {
            message.reply(`Yo también te amo a tí, ${user.name}`);
        }
    }
}