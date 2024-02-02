import { LovedUserJsonHandlerDS, LovedUserRepositoryImplementation } from "../../../Models/LovedUser";
import { Message } from "discord.js";

const LovedUserRepository = new LovedUserRepositoryImplementation(
    new LovedUserJsonHandlerDS()
);

export default async function loveUToo(message: Message) {
    const lovedUsers = LovedUserRepository.getLovedUsers();
    for (let user of lovedUsers) {
        if (user.USER_ID == message.author.id && message.content.toLowerCase() == "te amo hu tao") {
            message.reply(`Yo también te amo a tí, ${user.name}`);
        }
    }
}