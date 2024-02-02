import { SlashCommandBuilder } from "discord.js";
import * as fs from "node:fs"
import * as path from "node:path"

export interface TaoCommand {
    data: SlashCommandBuilder;
    execute: Function
}

export interface TaoCommandStringify {
    commands: TaoCommand[]
    textCommands: SlashCommandBuilder[]
}

export function commandLoader(): TaoCommandStringify {

    let commands: any = { commands: [], textCommands: [] };

    const commandsPath = path.join(__dirname, "CommandList");
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

    for (const file of commandsFiles) {
        let filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if (command.default.data === null || command.default.execute === null) {
            console.log(`Error loading ${filePath}`);
        } else {
            commands.commands.push(command.default);
            commands.textCommands.push(command.default.data);
        }
    }

    return commands;
}