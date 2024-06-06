import { RhytmPrismaService } from "app/Models/Rhytm/Services/RhytmPrismaService";
import { RhytmEntity, RhytmRepository } from "../../../Models/Rhytm";
import { Message } from "discord.js";

const rhytmRepo = new RhytmRepository(new RhytmPrismaService());

async function rhytmsFunction(message: Message) {
    if (!message.guild) return;
    const rhytms = await rhytmRepo.get({
        where: {
            guildId: message.guild.id,
        }
    });
    if (!rhytms) return;
    const reply = (async (rhytm: RhytmEntity) => {
        if (rhytm.pattern.test(message.content.toLocaleLowerCase())) {
            let responses = await rhytmRepo.getResponses(rhytm.id);
            if (!responses) return;
            let nRandom: number = Math.floor(Math.random() * responses.length);
            message.reply(responses[nRandom].response);
        }
    });
    if (Array.isArray(rhytms)) {
        rhytms.forEach(async rhytm => {
            await reply(rhytm);
        });
    } else {
        await reply(rhytms);
    }
}

export default rhytmsFunction