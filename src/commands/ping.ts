import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../utils/registerCommands";
import { ChatInputCommandInteraction, EmbedBuilder, ColorResolvable } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: ChatInputCommandInteraction) {
    const pingEmbed = new EmbedBuilder()
      .setColor("Blue" as ColorResolvable)
      .setTitle("🏓 Pong!")
      .setDescription(`Latency is \`${Date.now() - interaction.createdTimestamp}ms\` \nAPI Latency is \`${Math.round(interaction.client.ws.ping)}ms\``)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    await interaction.reply({ embeds: [pingEmbed] });
  }
} as Command; 