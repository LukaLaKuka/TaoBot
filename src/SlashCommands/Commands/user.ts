import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Replies with user's name"),
    async execute(interaction: any) {
        // Logic
        await interaction.reply(`The User's Name its: ${interaction.user.username}`);
    },
}