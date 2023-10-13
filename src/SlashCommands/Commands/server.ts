import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Replies with server's name"),
    async execute(interaction: any) {
        await interaction.reply(`The server's Name its: \`${interaction.member.guild.name}\``);
    },
}