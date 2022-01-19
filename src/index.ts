require('dotenv').config();
import { registerCommands, registerEvents } from './utils/registry';
import config from '../config.json';
import DiscordClient from './client/client';
import { Collection, Intents } from 'discord.js';
import { createConnection, getRepository } from 'typeorm';
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
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [GuildConfiguration]
  });
  const configRepo = getRepository(GuildConfiguration);
  const guildConfigs = await configRepo.find();
  const configs = new Collection<string, GuildConfiguration>();
  guildConfigs.forEach(config => configs.set(config.guildId, config))
  bot.configs = configs;

  log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.green('Pulled all available guild configurations from the database.')}`);

  await registerCommands(bot, '../commands');
  await registerEvents(bot, '../events');
  await bot.login(process.env.TOKEN);
})();

