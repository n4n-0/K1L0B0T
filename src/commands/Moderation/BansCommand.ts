import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { BanLogConfiguration } from '../../../typeorm/entities/BanLogConfiguration';
import { getRepository } from 'typeorm';

export default class BanCommand extends BaseCommand {
  constructor(
    private readonly banLogRepository = getRepository(BanLogConfiguration)
  ) {
    super('bans', 'Moderation', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if(message.channel.type === 'DM') return
    const banCount = await this.banLogRepository.count({ guildId: message.guildId! });
    if(!banCount) { 
      message.channel.send('There are no bans in this guild.');
      return;
    } else {
      const embed = new MessageEmbed()
        .setColor('#146ef5')
        .setDescription(`There are currently **${banCount}** bans in ${message.guild!.name}`);
      message.channel.send({ embeds: [embed] });
    }
  }
}