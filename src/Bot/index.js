const { Client, IntentsBitField } = require('discord.js')
const config = require("./config/config.json")
const Rhytmes = require("./config/rhytms.json")
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

client.on('messageCreate', (message) => {

  Rhytmes.rhythms.forEach(rhytme => {

    if (message.author.bot) {
      return ;
    }
    
    let regexp = new RegExp(rhytme.pattern)
    
    if (regexp.test(message.content.toLowerCase())) {
      let nRandom = Math.floor(Math.random() * rhytme.responses.length);

      message.reply(rhytme.responses[nRandom]);
    }
  });
});

client.login(config.discordToken)
