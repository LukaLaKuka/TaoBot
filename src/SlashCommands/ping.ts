import { SlashCommandBuilder } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with a Pong"),
    async execute(interaction: any) {
        // Logic
        await interaction.reply("Pong!");
    },
}

