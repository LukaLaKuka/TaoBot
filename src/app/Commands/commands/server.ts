import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Replies with server's name"),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply(`The server's Name its: \`${interaction.guild?.name}\``);
    },
}