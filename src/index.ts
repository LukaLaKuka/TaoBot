import { Client, IntentsBitField, Message, Events, Interaction } from "discord.js";
import { config } from "./config";
import { messageManage } from "./EventHandler";
import { commandLoader } from "./SlashCommands";
import { TaoCommand, TaoCommandStringify } from "./SlashCommands/commandManager";
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent
  ]
});

const myCommands: TaoCommandStringify = commandLoader();

client.on('ready', () => {
  console.log("TaoBot ready!");
  client.application?.commands.set(myCommands.textCommands);
});

client.on(Events.InteractionCreate, (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  myCommands.commands.map((singleCommand: TaoCommand) => {
    console.log(singleCommand);
    if (singleCommand.data.name == interaction.commandName) {
      singleCommand.execute(interaction);
    }
  })
});

client.on('messageCreate', (message: Message) => messageManage(message));

client.login(config.discordToken)
