import { LovedUserPrismaService, LovedUserRepository } from "../../../Models/LovedUser";
import { Message } from "discord.js";

const lovedUserRepo = new LovedUserRepository(new LovedUserPrismaService());

export default async function loveUToo(message: Message) {
    if (message.guild?.id === undefined) {
        return;
    }
    const lovedUsers = await lovedUserRepo.get({where: {
        guildId: message.guild.id
    }})

    if (!lovedUsers) {
        return;
    }

    for (let user of lovedUsers) {
        if (user.userId == message.author.id && message.content.toLowerCase() == "te amo hu tao") {
            message.reply(user.customMessage());
        }
    }
}