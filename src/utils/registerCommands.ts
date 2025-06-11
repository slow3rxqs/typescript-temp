import { Client, REST, Routes, ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from "@discordjs/builders";
import * as fs from "fs";
import * as path from "path";
import { config } from "../config";

export interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export function registerCommands(client: Client) {
  const commands = [];
  const commandFiles = fs.readdirSync(path.join(__dirname, "..", "commands"));

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`).default;
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(config.token);

  rest.put(Routes.applicationCommands(config.clientId), { body: commands })
    .then(() => console.log("✅ Slash commands registered"))
    .catch(console.error);
}