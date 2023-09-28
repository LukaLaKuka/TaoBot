const { Client, IntentsBitField } = require('discord.js')
const config = require("./config/config.json")
const rhytmsFunction = require('./additional_modules/rhytms');
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

client.on('messageCreate', (message) => rhytmsFunction(message));

client.login(config.discordToken)
