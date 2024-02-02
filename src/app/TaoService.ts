import { Configuration } from "../config";
import { TaoCommand, TaoCommandStringify, commandLoader } from "./Commands";
import { Client, Events, IntentsBitField, Interaction, Message } from "discord.js";
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

        client.on('ready', () => {
            console.log("TaoBot ready!");
            client.application?.commands.set(this.TaoCommands.textCommands);
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