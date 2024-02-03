import { RhytmEntity, RhytmJsonHandlerDS, RhytmRepositoryImplementation } from "../../../Models/Rhytm";
import { Message } from "discord.js";

const RhytmRepository = new RhytmRepositoryImplementation(
    new RhytmJsonHandlerDS()
);

async function rhytmsFunction(message: Message) {
    const rhytms: RhytmEntity[] = RhytmRepository.getRhytms();
    rhytms.forEach((rhytm) => {
        if (rhytm.pattern.test(message.content.toLowerCase())) {
            let nRandom: number = Math.floor(Math.random() * rhytm.responses.length);
            message.reply(rhytm.responses[nRandom]);
        }
    });
}

export default rhytmsFunction