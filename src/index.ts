require('dotenv').config();
import { registerCommands, registerEvents } from './utils/registry';
import config from '../config.json';
import DiscordClient from './client/client';
import { Intents } from 'discord.js';
import { createConnection } from 'typeorm';
import { GuildConfiguration } from '../typeorm/entities/GuildConfiguration';
const colors = require('colors');
const log = console.log;
const bot = new DiscordClient({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] 
});

(async () => {
  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [GuildConfiguration]
  });
  bot.prefix = config.prefix || config.prefix;
  await registerCommands(bot, '../commands');
  await registerEvents(bot, '../events');
  await bot.login(process.env.TOKEN);
})();

