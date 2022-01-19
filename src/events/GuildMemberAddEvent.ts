// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
const colors = require('colors');
const log = console.log;

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client: DiscordClient, member: GuildMember) {
    log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`Member has joined ${member.guild.name}`)}`);
    const config = client.configs.get(member.guild.id);
    if (!config) return
    if(config.welcomeChannelId) {
      const channel = member.guild.channels.cache.get(config.welcomeChannelId) as TextChannel;
      if(channel) {
        const welcomeEmbed = new MessageEmbed()
          .setColor('#1b63e0')
          .setTitle(`Welcome ${member.user.username} to ${member.guild.name}`)
          .setDescription(`Be sure to read all the rules and most importantly remember to have fun!`)
          .setTimestamp();

        channel.send({ embeds: [welcomeEmbed] });
      } else {
        log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`The bot has not found the welcome channel for ${member.guild.name}`)}`);
      }
    }
  }
}