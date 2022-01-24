import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getRepository } from 'typeorm';
import { BanLogConfiguration } from '../../../typeorm/entities/BanLogConfiguration';
import { serverLog } from '../../utils/UtilFunctions';

export default class BanCommand extends BaseCommand {
  constructor(
    private readonly banLogRespository = getRepository(BanLogConfiguration)
  ) {
    super('ban', 'Moderation', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.delete();
    if(!message.member?.permissions.has("BAN_MEMBERS")) return

    let member = message.mentions.members!.first() || message.guild!.members.cache.get(args[0])
    let reason = args.slice(1).join(" ")

    if(!member) {
      const cantFindUser = new MessageEmbed()
        .setColor("#9d0101")
        .setTitle('🚫 Please enter a valid user')
        .setDescription(`Usage: ${client.prefix}ban [user] [reason]`)
        .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })  
      message.channel.send({ embeds: [cantFindUser] })
      return
    }

    if(!reason) {
      const cantFindReason = new MessageEmbed()
        .setColor("#9d0101")
        .setTitle('🚫 Please enter a valid reason')
        .setDescription(`Usage: ${client.prefix}ban [user] [reason]`)
        .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })  
      message.channel.send({ embeds: [cantFindReason] })
      return
    }

    if(member.permissions.has("BAN_MEMBERS")) {
      const cantBanStaff = new MessageEmbed()
        .setColor("#9d0101")
        .setDescription(`You cannot ban administrators or anyone who has permission to ban. Contact an administrator`)
        .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })
      message.channel.send({ embeds: [cantBanStaff] })
      return
    }
    
    await this.banLogRespository.insert({ guildId: message.guildId!, username: member.user.username, banReason: reason });
    const memberBanned = new MessageEmbed()
      .setColor("#9d0101")
      .setTitle(`🗒 Ban`)
      .setDescription(`${member} has been banned from ${message.guild!.name} by ${message.author} for the following reason: ${reason}`)
      .setTimestamp(message.createdAt)
    message.channel.send({ embeds: [memberBanned] })
    
    const DM = new MessageEmbed()
      .setColor("#9d0101")
      .setTitle(`**${message.guild?.name}** - You have been banned`)
      .setDescription(`You have been banned from **${message.guild?.name}** for the following reason: \`${reason}\``)

    await member.send({ embeds: [DM] })
    message.guild?.members.ban(member, { reason: reason })
    serverLog(message.guild!.id, message.guild!.name, `${member} has been banned by ${message.author} for the following reason: ${reason}`)
  }
 }