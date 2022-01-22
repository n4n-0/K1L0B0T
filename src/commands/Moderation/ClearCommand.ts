import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
const colors = require('colors');
const log = console.log;

export default class ClearCommand extends BaseCommand {
  constructor() {
    super('clear', 'Moderation', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.delete();
    if(!message.member?.permissions.has("MANAGE_MESSAGES")) return

    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])

    const noAmount = new MessageEmbed()
      .setColor("#9d0101")
      .setTitle('Please enter a valid amount')
      .setDescription(`Usage: ${client.prefix}clear <amount> [user]`)
      .setFooter({ text: `Due to limitations by Discord, this number must be below 100\n${message.guild?.name} Moderation :: ${message.author.username}` })

    if(!amount || amount > 100) { 
      message.channel.send({ embeds: [noAmount] })
      return
    }

    let tempamount = amount

    message.channel.messages.fetch({ limit: tempamount }).then(messages => {
      if(user) {
        const filtered = messages.filter(m => m.author.id === user.id);
        filtered.forEach(m => m.delete());
        message.channel.send(`Successfully deleted ${filtered.size} messages from ${user.username}`)
      } else {
        messages.forEach(m => m.delete());
        message.channel.send(`Successfully deleted ${amount} messages`);
      }
    })
  }
}