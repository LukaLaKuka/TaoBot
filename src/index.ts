import { Client, IntentsBitField, Message } from "discord.js";
import * as config from "./config/config.json"
import rhytmsFunction from "./additional_modules/rhytms";
const client = new Client({ 
  intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages, 
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent
  ]
});



client.on('ready', () => {
    console.log("TaoBot ready!")
});

client.on('messageCreate', (message: Message) => rhytmsFunction(message));

client.login(config.discordToken)
