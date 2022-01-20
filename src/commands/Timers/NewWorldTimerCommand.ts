import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getRepository } from 'typeorm';
import { NewWorldTimers } from '../../../typeorm/entities/NewWorldTimers';
const { DateTime } = require('luxon');
const colors = require('colors');
const log = console.log;

export default class AsmoTimerCommand extends BaseCommand {
  constructor(
    private readonly newWorldTimerRepository = getRepository(NewWorldTimers)
  ) {
    super('timer', 'Timers', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {

    if(args.length !== 2) {
      message.channel.send('Please enter two arguments.');
      return;
    }

    switch (args[0]) {
      case 'start':
        switch (args[1]) {
          case 'asmo':
            const user = message.author.username;
            const asmoEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Asmodeum'});
            if (!asmoEntry) {
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`An Asmodeum timer has been started for ${message.author.username} in ${message.guild!.name}`)}`);
              const startTime = DateTime.now().toFormat('DDDD HH:mm:ss');
              const endTime  = DateTime.now().plus({ hours: 24}).toFormat('DDDD HH:mm:ss')
              const newAsmoTimer = this.newWorldTimerRepository.create({
                guildId: message.guildId!,
                username: user,
                startTime: startTime,
                endTime: endTime,
                type: 'Asmodeum'
              });
              await this.newWorldTimerRepository.save(newAsmoTimer);
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`${args[1]}`)}`);
              const successEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('You have created an Asmodeum timer!')
                .setDescription(`Your asmodeum timer will be up at ${endTime}`)
                .setTimestamp();
    
              message.channel.send({ embeds: [successEmbed] });
              setTimeout(() => {
                this.newWorldTimerRepository.remove(newAsmoTimer);
              }, 8.64e+7)
            } else {
              const errorEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('You already have an Asmodeum timer!')
                .setDescription(`You can only have one Asmodeum timer at a time! It will expire on ${asmoEntry.endTime}`)
                .setTimestamp();
    
              message.channel.send({ embeds: [errorEmbed] });
            }
            break;
          default:
            message.channel.send('Please enter a valid argument. Example: /timer asmo');
        }
        break;
      case 'check':
        switch (args[1]) {
          case 'asmo':
            const user = message.author.username;
            const asmoEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Asmodeum'});
            if (!asmoEntry) {
              message.channel.send('You do not have an Asmodeum timer.');
            } else {
              const checkEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('Asmodeum Timer')
                .setDescription(`Your asmodeum timer will be up at ${asmoEntry.endTime}`)
                .setTimestamp();
              message.channel.send({ embeds: [checkEmbed] });
            }
            break;
          default:
            message.channel.send('Please enter a valid argument. Example: /timer check asmo');
        }
        break;
      default:
        message.channel.send('Please enter a valid argument. Example: /timer start asmo');
    }
  }
}