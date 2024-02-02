import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with a Pong"),
    async execute(interaction: any) {
        // Logic
        await interaction.reply("Pong!");
    },
}