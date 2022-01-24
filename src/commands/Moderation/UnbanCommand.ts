import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getRepository } from 'typeorm';
import { BanLogConfiguration } from '../../../typeorm/entities/BanLogConfiguration';
import { serverLog } from '../../utils/UtilFunctions';
const colors = require('colors');
const log = console.log;

export default class UnbanCommand extends BaseCommand {
  constructor(
    private readonly banLogRespository = getRepository(BanLogConfiguration)
  ) {
    super('unban', 'Moderation', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.delete();

    if (!message.member?.permissions.has('BAN_MEMBERS')) return;

    const user = args[0]
    if(!user) {
      const cantFindUser = new MessageEmbed()
        .setColor("#9d0101")
        .setTitle('Please enter a valid user')
        .setDescription(`Usage: ${client.prefix}unban [user]`)
        .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })  
      message.channel.send({ embeds: [cantFindUser] })
      return
    }

    message.guild?.bans.fetch().then(banned => {
      const bannedUser = banned.find(u => u.user.username === user);
      if (!bannedUser) {
        message.channel.send(`Cant find user ${user}`);
      } else {
        this.banLogRespository.delete({ guildId: message.guildId!, username: user });
        message.guild?.members.unban(bannedUser.user.id);
        const unBanEmbed = new MessageEmbed()
          .setColor('#9d0101')
          .setTitle('🗒 Unban')
          .setDescription(`${bannedUser.user.username} has been unbanned from ${message.guild!.name} by ${message.author}`)
          .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })
        message.channel.send({ embeds: [unBanEmbed] })
        serverLog(message.guild!.id, message.guild!.name, `${bannedUser.user.username} has been unbanned from ${message.guild!.name} by ${message.author}`);
      }
    })
  }
}