import { Configuration } from "../config";
import { TaoCommand, TaoCommandStringify, commandLoader } from "./Commands";
import { Client, Events, Guild, IntentsBitField, Interaction, Message, REST, Routes } from "discord.js";
import { messageManage } from "./Events";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "@prisma/client/runtime/library";


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
        const prisma = new PrismaClient();
        try {
            const guildAtDB = await prisma.guild.findFirstOrThrow({
                where: {
                    guild_id: guild.id
                },
            });
            console.log(guildAtDB.name);
        } catch (err: unknown) {
            if (err instanceof NotFoundError) {
                console.error(`Guild ${guild.name} not found at DB. Adding...`);
                await prisma.guild.create({
                    data: {
                        guild_id: guild.id,
                        name: guild.name
                    }
                });
            }
        }
        await prisma.$disconnect();
    }
}