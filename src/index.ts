import { Client, IntentsBitField, Message, Events } from "discord.js";
import * as config from "./config/config.json"
import { messageManage } from "./Events/MessageCreate/messageManager";
import { commandLoader } from "./SlashCommands/commandManager";
const client = new Client({ 
  intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages, 
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent
  ]
});

const myCommands = commandLoader();

client.on('ready', () => {
    console.log("TaoBot ready!");
    client.application?.commands.set(myCommands.textCommands);
});

client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  myCommands.commands.map((singleCommand: any) => {
    if (singleCommand.data.name == interaction.commandName) {
      singleCommand.execute(interaction);
    }
  })
});

client.on('messageCreate', (message: Message) => messageManage(message));

client.login(config.discordToken)
