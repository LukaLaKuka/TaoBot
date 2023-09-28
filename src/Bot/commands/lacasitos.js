const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pin')
        .setDescription("Te responde épicamente"),
    async execute(interaction) {
        await interaction.reply("Pan toma Lacasitos");
    },
}