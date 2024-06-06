import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("rhytms")
        .setDescription('Manage rhytms module')
        .addSubcommand(subCommand =>
            subCommand.setName('add').setDescription('Add a new rhytm in this guild').addStringOption(option =>
                option.setName('words').setDescription('type words that will emit the responses (add space if you want add some words').setRequired(true)
            ))
        .addSubcommand(subCommand =>
            subCommand.setName('remove').setDescription('Remove rhytm user in this guild').addStringOption(option => option.setName('rhytm').setDescription('Rhytm to delete').setRequired(true)
        )).addSubcommand(subCommand =>
            subCommand.setName('remove').setDescription('Remove rhytm user in this guild').addStringOption(option => option.setName('rhytm').setDescription('Rhytm to delete').setRequired(true)
        )),
    async execute(interaction: ChatInputCommandInteraction) {
        interaction.reply('');
    },
}