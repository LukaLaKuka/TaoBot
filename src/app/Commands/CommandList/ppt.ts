import { CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

type PPT = 'paper' | 'rock' | 'scissors';

export default {
    data: new SlashCommandBuilder()
        .setName("ppt")
        .setDescription("Rock Paper Sciccors")
        .addStringOption((option) => option.setName('choice')
            .setDescription('Choose between Rock, Paper or Sciccors')
            .setRequired(true)
            .addChoices({ name: 'Rock', value: 'rock' })
            .addChoices({ name: 'Paper', value: 'paper' })
            .addChoices({ name: 'Scissors', value: 'scissors' })
        ),
    async execute(interaction: any) {
        const { options }: { options: CommandInteractionOptionResolver } = interaction;
        const staticOptions: PPT[] = ['rock', 'paper', 'scissors'];
        const userOption = options.getString('choice');
        const botOption = (): PPT => {
            let nRandom = Math.floor(Math.random() * staticOptions.length);
            return staticOptions[nRandom];
        }
        const botAnswer: PPT = botOption();
        let result: string;
        if (userOption === botAnswer) {
            result = 'Draw 🤝';
        } else if (userOption === 'rock') {
            if (botAnswer === 'paper') result = 'I won! 🙌🏻';
            else result = 'You won... 😫';
        } else if (userOption === 'paper') {
            if (botAnswer === 'rock') result = 'You won... 😫';
            else result = 'I won! 🙌🏻';
        } else {
            if (botAnswer === 'paper') result = 'You won... 😫';
            else result = 'I won! 🙌🏻';
        }
        await interaction.reply(`I picked ${botAnswer}. ${result}`);
    },
}