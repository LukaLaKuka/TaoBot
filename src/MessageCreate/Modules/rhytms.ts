import { Message } from "discord.js";

interface Rhytm {
    pattern: string,
    responses: string[]
}

const Rhytmes = require("../../data/rhytms.json");

async function rhytmsFunction(message: Message) {
    if (message.author.bot) {
        return;
    }
    
    Rhytmes.rhythms.forEach((rhytme: Rhytm) => {
        let regexp: RegExp = new RegExp(rhytme.pattern)

        if (regexp.test(message.content.toLowerCase())) {
            let nRandom: number = Math.floor(Math.random() * rhytme.responses.length);

            message.reply(rhytme.responses[nRandom]);
        }
    })
}

export default rhytmsFunction