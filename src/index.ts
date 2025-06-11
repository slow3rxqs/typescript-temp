import { Client, GatewayIntentBits, Collection } from "discord.js";
import * as dotenv from "dotenv";
import { registerCommands } from "./utils/registerCommands";
import { registerEvents } from "./utils/registerEvents";
import { config } from "./config";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, any>;
  }
}

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

registerCommands(client);
registerEvents(client);

client.login(config.token);