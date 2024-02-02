import { Client, IntentsBitField, Message, Events, Interaction } from "discord.js";
import { Configuration } from "./config";
import { messageManage } from "./app/Events";
import { commandLoader, TaoCommand, TaoCommandStringify } from "./app/Commands";

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

client.login(Configuration.DISCORD_TOKEN);
