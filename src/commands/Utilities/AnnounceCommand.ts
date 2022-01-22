import { Message, MessageEmbed, TextChannel } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
const colors = require('colors');
const log = console.log;


export default class AnnounceCommand extends BaseCommand {
  constructor() {
    super('announce', 'Utilities', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.delete();
    if(!message.member?.permissions.has("ADMINISTRATOR")) return

    const channelID = args[0].replace('<#', '').replace('>', '');
    const announcement = args.slice(1).join(" ");
    const announcementChannel = message.guild?.channels.cache.get(channelID) as TextChannel;

    if(!announcementChannel) {
      const cantFindChannel = new MessageEmbed()
        .setColor("#9d0101")
        .setTitle('🚫 Please enter a valid channel')
        .setDescription(`Usage: ${client.prefix}announce [channel] [announcement]`)
        .setFooter({ text: `${message.guild?.name} Utilities :: ${message.author.username}` })  
      message.channel.send({ embeds: [cantFindChannel] })
      return
    }

    if(!announcement) {
      const cantFindAnnouncement = new MessageEmbed()
        .setColor("#9d0101")
        .setDescription(`You must included what you want to say in the announcement. ${client.prefix}announce [announcement]`)
        .setFooter({ text: `${message.guild?.name} Utilities :: ${message.author.username}` })  
      message.channel.send({ embeds: [cantFindAnnouncement] })
      return
    } else {
      const announcementSent = new MessageEmbed()
        .setColor("#9d0101")
        .setTitle(`📢 Announcement`)
        .setDescription(`${announcement}`)
        .setTimestamp(message.createdAt)
      announcementChannel.send({ embeds: [announcementSent] })
    }
  }
}