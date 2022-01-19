// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { getRepository } from 'typeorm';
import { GuildConfiguration } from '../../typeorm/entities/GuildConfiguration';


const colors = require('colors');
const log = console.log;

export default class GuildCreateEvent extends BaseEvent {
  constructor(
    private readonly guildConfigRepository = getRepository(GuildConfiguration)
  ) {
    super('guildCreate');
  }
  
  async run(client: DiscordClient, guild: Guild) {
    log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`The bot has connected to the server ${guild.name}`)}`);

    const guildConfig = await this.guildConfigRepository.findOne({ guildId: guild.id });
    if (!guildConfig) {
      log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`The bot has created a new configuration for the server ${guild.name}`)}`);
      const newGuildConfig = this.guildConfigRepository.create({
        guildId: guild.id,
      });
      const savedConfig = await this.guildConfigRepository.save(newGuildConfig);
      client.configs.set(guild.id, savedConfig);
    } else {
      client.configs.set(guild.id, guildConfig);
      log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`The bot has connected to the server ${guild.name} and it already has a configuration`)}`);
    }
  }
}