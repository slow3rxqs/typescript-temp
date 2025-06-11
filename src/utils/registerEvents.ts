import { Client } from "discord.js";
import * as fs from "fs";
import * as path from "path";

export function registerEvents(client: Client) {
  const eventFiles = fs.readdirSync(path.join(__dirname, "..", "events"));
  for (const file of eventFiles) {
    const event = require(`../events/${file}`).default;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}