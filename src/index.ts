require('dotenv').config();
import { registerCommands, registerEvents } from './utils/registry';
import config from '../config.json';
import DiscordClient from './client/client';
import { loadUtils } from './utils/UtilFunctions';
import { Collection, Intents } from 'discord.js';
import { createConnection, getRepository } from 'typeorm';
import { GuildConfiguration } from '../typeorm/entities/GuildConfiguration';
import { NewWorldTimers } from '../typeorm/entities/NewWorldTimers';
import { BanLogConfiguration } from '../typeorm/entities/BanLogConfiguration';
const colors = require('colors');
const log = console.log;
const bot = new DiscordClient({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS ,
  ],
});

(async () => {
  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [GuildConfiguration, NewWorldTimers, BanLogConfiguration]
  });
  const configRepo = getRepository(GuildConfiguration);
  const guildConfigs = await configRepo.find();
  const configs = new Collection<string, GuildConfiguration>();
  guildConfigs.forEach(config => configs.set(config.guildId, config))
  bot.configs = configs;

  log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.green('Pulled all available guild configurations from the database.')}`);

  await registerCommands(bot, '../commands');
  await registerEvents(bot, '../events');
  await loadUtils(bot);
  await bot.login(process.env.TOKEN);
})();

