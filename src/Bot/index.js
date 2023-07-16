const { Client, IntentsBitField } = require('discord.js');
const config = require("./config.json")
const client = new Client({ 
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildMembers,
IntentsBitField.Flags.MessageContent] 
});

client.on('ready', () => {
    console.log("TaoBot ready!")
});

client.login(config.discordToken);
