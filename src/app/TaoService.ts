import { Configuration } from "../config";
import { TaoCommand, TaoCommandStringify, commandLoader } from "./Commands";
import { Client, Events, Guild, IntentsBitField, Interaction, Message, REST, Routes } from "discord.js";
import { messageManage } from "./Events";
import { GuildEntity, GuildPrismaDatasource, GuildRepository } from "./Models/Guild";


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
            await servers.forEach(async (guild) => {
                await TaoService.checkServerOnDB(guild);
                rest.put(Routes.applicationGuildCommands(Configuration.CLIENT_ID, guild.id), { body: this.TaoCommands.textCommands });
            })
            await console.log(`${client.user?.username} ready`);
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

    private static async checkServerOnDB(guild: Guild): Promise<void> {
        const guildRepository = new GuildRepository(new GuildPrismaDatasource());
        const guildAtDB = await guildRepository.getById(guild.id);
        if (!guildAtDB) {
            guildRepository.create(new GuildEntity({guild_id: guild.id}));
        }
    }
}