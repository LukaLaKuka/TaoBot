import { Client, IntentsBitField, Message, Events, Interaction } from "discord.js";
import { config } from "@config";
import { messageManage } from "@events";
import { commandLoader } from "@slashcommand";
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

client.on(Events.InteractionCreate, (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  myCommands.commands.map((singleCommand: any) => {
    if (singleCommand.data.name == interaction.commandName) {
      singleCommand.execute(interaction);
    }
  })
});

client.on('messageCreate', (message: Message) => messageManage(message));

client.login(config.discordToken)
