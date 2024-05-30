import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("hello").setDescription("Returns a Hello World!"),
    async execute(interaction: ChatInputCommandInteraction) {
        // Logic
        await interaction.reply("Hola Mundo!");
    },
}