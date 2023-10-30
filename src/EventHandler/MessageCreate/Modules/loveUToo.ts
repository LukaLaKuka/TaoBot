import { JsonHandler } from "@tomhuel/jsonhandler";
import { Message } from "discord.js";
import { projectPaths } from "@config/projectPaths";
import * as path from "node:path"

const lovedUsersJsonHandler = new JsonHandler(path.join(projectPaths.jsonDir, "lovedUsers.json"));
const lovedUsers: Array<any> = lovedUsersJsonHandler.getJson() as Array<any>;

export default async function loveUToo(message: Message) {
    for (let user of lovedUsers) {
        if (user.USER_ID == message.author.id && message.content.toLowerCase() == "te amo hu tao") {
            message.reply(`Yo también te amo a tí, ${user.name}`);
        }
    }
}