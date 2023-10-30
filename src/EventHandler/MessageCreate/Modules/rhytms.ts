import { JsonHandler } from "@tomhuel/jsonhandler";
import { Message } from "discord.js";
import { projectPaths } from "@config/projectPaths";
import * as path from "node:path"

interface Rhytm {
    pattern: string,
    responses: string[]
}

const RhytmesJsonHandler = new JsonHandler(path.join(projectPaths.jsonDir, "rhytms.json"));
const Rhytmes: Rhytm[] = RhytmesJsonHandler.getJson() as Rhytm[];

async function rhytmsFunction(message: Message) {
    Rhytmes.forEach((rhytme: Rhytm) => {
        let regexp: RegExp = new RegExp(rhytme.pattern)

        if (regexp.test(message.content.toLowerCase())) {
            let nRandom: number = Math.floor(Math.random() * rhytme.responses.length);

            message.reply(rhytme.responses[nRandom]);
        }
    });
}

export default rhytmsFunction