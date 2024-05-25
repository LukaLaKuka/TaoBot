import { UserEntity, UserPrismaDatasource, UserRepository } from "../../Models/User";
import { LovedUserEntity, LovedUserPrismaDatasource, LovedUserRepository } from "../../Models/LovedUser";
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("loveduser")
        .setDescription('Manage loveduser module')
        .addSubcommand(subCommand =>
            subCommand.setName('add').setDescription('Add a new loved user in this guild').addUserOption(option =>
                option.setName('target').setDescription('Select an User').setRequired(true)
            ).addStringOption(option =>
                option.setName('username').setDescription('type a username to answer with a custom username').setRequired(false)
            ))
        .addSubcommand(subCommand =>
            subCommand.setName('remove').setDescription('Remove loved user in this guild').addUserOption(option =>
                option.setName('target').setDescription('Select an User').setRequired(true)
            )),
    async execute(interaction: ChatInputCommandInteraction) {

        let user = interaction.options.get('target')?.user;
        if (user === undefined || user === null) {
            interaction.reply('This user doesn\'t exists');
            return;
        }

        if (interaction.guild === undefined || interaction.guild === null) {
            interaction.reply('This user doesn\'t exists');
            return;
        }

        if (user.id === undefined || user.id === null) {
            interaction.reply('This user ID doesn\'t exists');
            return;
        }

        if (interaction.guild.id === undefined || interaction.guild.id === null) {
            interaction.reply('This user ID doesn\'t exists');
            return;
        }

        let rawUsername = interaction.options.get('username')?.value ?? user.username;

        let username: string = String(rawUsername);

        const addUser = async (guildId: string, userId: string, userName: string) => {

            let lovedUserRepo: LovedUserRepository = new LovedUserRepository(new LovedUserPrismaDatasource());
            let userRepo: UserRepository = new UserRepository(new UserPrismaDatasource());

            let userDB = await userRepo.getById(user.id);

            if (!userDB) {
                await userRepo.create(new UserEntity(user));
            }

            let lovedUser = new LovedUserEntity({
                guildId,
                userId,
                userName,
            });

            lovedUserRepo.create(lovedUser);

            return 'Loved User created succesfully';
        }

        const deleteUser = async (guildId: string, userId: string) => {
            let lovedUserRepo: LovedUserPrismaDatasource = new LovedUserPrismaDatasource();

            let user = await lovedUserRepo.getByUserAndGuild(guildId, userId);

            if (!user) {
                return 'Error deleting user';
            }

            await lovedUserRepo.delete(user);

            return 'Loved User removed succesfully';
        }

        let res: string = 'Failed';

        if (interaction.options.getSubcommand() === 'add') {
            res = await addUser(interaction.guild.id, user.id, username);
        }

        if (interaction.options.getSubcommand() === 'remove') {
            res = await deleteUser(interaction.guild.id, user.id);
        }
        interaction.reply(res);
    },
}