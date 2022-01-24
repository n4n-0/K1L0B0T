import { Guild, Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { serverLog } from '../../utils/UtilFunctions';
const colors = require('colors');
const log = console.log;

export default class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'Moderation', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.delete();

    if(!message.member?.permissions.has("KICK_MEMBERS")) return
    const user = message.mentions.users.first() || message.guild?.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ");

    if(!user) {
      const noUser = new MessageEmbed()
        .setColor("#9d0101")
        .setTitle('Please enter a valid user')
        .setDescription(`Usage: ${client.prefix}kick <user> [reason]`)
        .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })

      message.channel.send({ embeds: [noUser] })
      return
    }

    const kickEmbed = new MessageEmbed()
      .setColor("#9d0101")
      .setTitle(`🗒 Kick`)
      .setDescription(`${user} has been kicked from ${message.guild!.name} by ${message.author} for the following reason: ${reason}`)
      .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })

    if(!reason) {
      kickEmbed.setDescription(`${user} has been kicked from ${message.guild!.name} by ${message.author}`)
      message.channel.send({ embeds: [kickEmbed] })
      message.guild?.members.kick(user, reason);
      serverLog(message.guild!.id, message.guild!.name, `${user} has been kicked from ${message.guild!.name} by ${message.author}`);
    } else {
      message.channel.send({ embeds: [kickEmbed] })
      message.guild?.members.kick(user, reason);
      serverLog(message.guild!.id, message.guild!.name, `${user} has been kicked from ${message.guild!.name} by ${message.author} for the following reason: ${reason}`);
    }
  }
}