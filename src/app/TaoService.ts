import { Configuration } from "../config";
import { TaoCommand, TaoCommandStringify, commandLoader } from "./Commands";
import { Client, Events, IntentsBitField, Interaction, Message, REST, Routes } from "discord.js";
import { messageManage } from "./Events";


export class TaoService {
    protected static TaoCommands: TaoCommandStringify = commandLoader();

    static async run() {
        const client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.MessageContent
            ]
        });

        const rest = new REST({ version: '10' }).setToken(Configuration.DISCORD_TOKEN);

        const servers = client.guilds.cache;

        client.on('ready', async () => {
            servers.forEach((guild) => {
                console.log(guild.name);
                rest.put(Routes.applicationGuildCommands(Configuration.CLIENT_ID, guild.id), { body: this.TaoCommands.textCommands });
            })
            console.log(`${client.user?.username} ready`);
        });

        client.on(Events.InteractionCreate, (interaction: Interaction) => {
            if (!interaction.isChatInputCommand()) return;

            this.TaoCommands.commands.map((singleCommand: TaoCommand) => {
                if (singleCommand.data.name == interaction.commandName) {
                    singleCommand.execute(interaction);
                }
            })
        });

        client.on('messageCreate', (message: Message) => messageManage(message));

        client.login(Configuration.DISCORD_TOKEN);
    }
}