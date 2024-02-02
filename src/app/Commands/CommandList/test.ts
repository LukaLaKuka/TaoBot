import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("hello").setDescription("Returns a Hello World!"),
    async execute(interaction: any) {
        // Logic
        await interaction.reply("Hola Mundo!");
    },
}