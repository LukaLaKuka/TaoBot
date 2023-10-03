import { Client, IntentsBitField, Message } from "discord.js";
import * as config from "./config/config.json"
import { manage } from "./MessageCreate/manager";
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

client.on('messageCreate', (message: Message) => manage(message));

client.on('interactionCreate', (interaction) => {})

client.login(config.discordToken)
