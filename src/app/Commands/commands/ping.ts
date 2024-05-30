import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with a Pong"),
    async execute(interaction: ChatInputCommandInteraction) {
        // Logic
        await interaction.reply("Pong!");
    },
}