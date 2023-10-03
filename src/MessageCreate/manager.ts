import { Message } from "discord.js";
import rhytmsFunction from "./Modules/rhytms";

export function manage(message: Message) {
    rhytmsFunction(message);
}