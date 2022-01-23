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

    const config = await client.configs.get(message.guildId!);
    const user = message.author.username;

    switch (args[0]) {
      case 'start':
        switch (args[1]) {
          case 'asmo':
            const asmoEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Asmodeum'});
            if (!asmoEntry) {
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`An Asmodeum timer has been started for ${message.author.username} in ${message.guild!.name}`)}`);
              const startTime = DateTime.now().toFormat('DDDD HH:mm:ss');
              const endTime  = DateTime.now().plus({ hours: 24}).toFormat('DDDD HH:mm:ss')
              const newAsmoTimer = this.newWorldTimerRepository.insert({
                guildId: message.guildId!,
                username: user,
                startTime: startTime,
                endTime: endTime,
                type: 'Asmodeum'
              });
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`${args[1]}`)}`);
              const successEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('You have created an Asmodeum timer!')
                .setDescription(`Your asmodeum timer will be up on ${endTime}`)
                .setTimestamp();
    
              message.channel.send({ embeds: [successEmbed] });
              setTimeout(() => {
                const checkForEntry = this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Asmodeum'}).then(checkForEntry => {
                  if (checkForEntry) {
                    this.newWorldTimerRepository.delete({ guildId: message.guildId!, username: user, type: 'Asmodeum'});
                    const successEmbed = new MessageEmbed()
                      .setColor('#c73002')
                      .setTitle(`Your Asmodeum timer has expired!`)
                      .setDescription(`${message.author}, Your asmodeum timer has expired!`)
                      .setTimestamp();
                    message.channel.send({ embeds: [successEmbed] });
                  }
                });
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
          case 'weave':
            const weaveEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Phoenix Weave'});
            if (!weaveEntry) {
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`A Phoenix Weave timer has been started for ${message.author.username} in ${message.guild!.name}`)}`);
              const startTime = DateTime.now().toFormat('DDDD HH:mm:ss');
              const endTime  = DateTime.now().plus({ hours: 24}).toFormat('DDDD HH:mm:ss')
              this.newWorldTimerRepository.insert({
                guildId: message.guildId!,
                username: user,
                startTime: startTime,
                endTime: endTime,
                type: 'Phoenix Weave'
              });
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`${args[1]}`)}`);
              const successEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('You have created a Phoenix Weave timer!')
                .setDescription(`Your phoenix weave timer will be up on ${endTime}`)
                .setTimestamp();
    
              message.channel.send({ embeds: [successEmbed] });
              setTimeout(() => {
                const checkForEntry = this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Phoenix Weave'}).then(checkForEntry => {
                  if (checkForEntry) {
                    this.newWorldTimerRepository.delete({ guildId: message.guildId!, username: user, type: 'Phoenix Weave'});
                    const successEmbed = new MessageEmbed()
                      .setColor('#c73002')
                      .setTitle(`Your Phoenix Weave timer has expired!`)
                      .setDescription(`${message.author}, Your phoenix weave timer has expired!`)
                      .setTimestamp();
                    message.channel.send({ embeds: [successEmbed] });
                  }
                });
              }, 8.64e+7)
            } else {
              const errorEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('You already have an Phoenix Weave!')
                .setDescription(`You can only have one Phoenix Weave at a time! It will expire on ${weaveEntry.endTime}`)
                .setTimestamp();
    
              message.channel.send({ embeds: [errorEmbed] });
            }
            break;
          case 'ebony':
            const ebonyEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Glittering Ebony'});
            if (!ebonyEntry) {
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`A Glittering Ebony timer has been started for ${message.author.username} in ${message.guild!.name}`)}`);
              const startTime = DateTime.now().toFormat('DDDD HH:mm:ss');
              const endTime  = DateTime.now().plus({ hours: 24}).toFormat('DDDD HH:mm:ss')
              this.newWorldTimerRepository.insert({
                guildId: message.guildId!,
                username: user,
                startTime: startTime,
                endTime: endTime,
                type: 'Glittering Ebony'
              });
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`${args[1]}`)}`);
              const successEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('You have created a Glittering Ebony timer!')
                .setDescription(`Your Glittering Ebony timer will be up on ${endTime}`)
                .setTimestamp();
    
              message.channel.send({ embeds: [successEmbed] });
              setTimeout(() => {
                const checkForEntry = this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Glittering Ebony'}).then(checkForEntry => {
                  if (checkForEntry) {
                    this.newWorldTimerRepository.delete({ guildId: message.guildId!, username: user, type: 'Glittering Ebony'});
                    const successEmbed = new MessageEmbed()
                      .setColor('#c73002')
                      .setTitle(`Your Glittering Ebony timer has expired!`)
                      .setDescription(`${message.author}, Your Glittering Ebony timer has expired!`)
                      .setTimestamp();
                    message.channel.send({ embeds: [successEmbed] });
                  }
                });
              }, 8.64e+7)
            } else {
              const errorEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('You already have an Glittering Ebony timer!')
                .setDescription(`You can only have one Glittering Ebony timer at a time! It will expire on ${ebonyEntry.endTime}`)
                .setTimestamp();
    
              message.channel.send({ embeds: [errorEmbed] });
            }
            break;
          case 'runic':
            const runicEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Runic Leather'});
            if (!runicEntry) {
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`A Runic Leather timer has been started for ${message.author.username} in ${message.guild!.name}`)}`);
              const startTime = DateTime.now().toFormat('DDDD HH:mm:ss');
              const endTime  = DateTime.now().plus({ hours: 24}).toFormat('DDDD HH:mm:ss')
              this.newWorldTimerRepository.insert({
                guildId: message.guildId!,
                username: user,
                startTime: startTime,
                endTime: endTime,
                type: 'Runic Leather'
              });
              log(`${colors.white('[')}${colors.cyan('K1L0B0T')}${colors.white(']')} ${colors.cyan(`${args[1]}`)}`);
              const successEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('You have created a Runic Leather timer!')
                .setDescription(`Your Runic Leather timer will be up on ${endTime}`)
                .setTimestamp();
    
              message.channel.send({ embeds: [successEmbed] });
              setTimeout(() => {
                const checkForEntry = this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Runic Leather'}).then(checkForEntry => {
                  if (checkForEntry) {
                    this.newWorldTimerRepository.delete({ guildId: message.guildId!, username: user, type: 'Runic Leather'});
                    const successEmbed = new MessageEmbed()
                      .setColor('#c73002')
                      .setTitle(`Your Runic Leather timer has expired!`)
                      .setDescription(`${message.author}, Your Runic Leather timer has expired!`)
                      .setTimestamp();
                    message.channel.send({ embeds: [successEmbed] });
                  }
                });
              }, 8.64e+7)
            } else {
              const errorEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('You already have an Runic Leather timer!')
                .setDescription(`You can only have one Runic Leather timer at a time! It will expire on ${runicEntry.endTime}`)
                .setTimestamp();
    
              message.channel.send({ embeds: [errorEmbed] });
            }
            break;
          default:
          message.channel.send(`Please enter a valid argument. Example: ${config?.prefix}timer asmo`);
        }
        break;
      case 'check':
        switch (args[1]) {
          case 'asmo':
            const asmoEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Asmodeum'});
            if (!asmoEntry) {
              message.channel.send('You do not have an Asmodeum timer.');
            } else {
              const checkEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('Asmodeum Timer')
                .setDescription(`Your asmodeum timer will be up on ${asmoEntry.endTime}`)
                .setTimestamp();
              message.channel.send({ embeds: [checkEmbed] });
            }
            break;
          case 'weave':
            const weaveEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Phoenix Weave'});
            if (!weaveEntry) {
              message.channel.send('You do not have a Phoenix Weave timer.');
            } else {
              const checkEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('Phoenix Weave Timer')
                .setDescription(`Your asmodeum timer will be up on ${weaveEntry.endTime}`)
                .setTimestamp();
              message.channel.send({ embeds: [checkEmbed] });
            }
            break;
          case 'ebony':
            const ebonyEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Glittering Ebony'});
            if (!ebonyEntry) {
              message.channel.send('You do not have a Glittering Ebony timer.');
            } else {
              const checkEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('Glittering Ebony Timer')
                .setDescription(`Your Glittering Ebony timer will be up on ${ebonyEntry.endTime}`)
                .setTimestamp();
              message.channel.send({ embeds: [checkEmbed] });
            }
            break;
          case 'runic':
            const runicEntry = await this.newWorldTimerRepository.findOne({ guildId: message.guildId!, username: user, type: 'Runic Leather'});
            if (!runicEntry) {
              message.channel.send('You do not have a Runic Leather timer.');
            } else {
              const checkEmbed = new MessageEmbed()
                .setColor('#c73002')
                .setTitle('Runic Leather Timer')
                .setDescription(`Your Runic Leather timer will be up on ${runicEntry.endTime}`)
                .setTimestamp();
              message.channel.send({ embeds: [checkEmbed] });
            }
            break;
          default:
            message.channel.send(`Please enter a valid argument. Example: ${config?.prefix}timer check asmo`);
        }
        break;
      default:
        message.channel.send(`Please enter a valid argument. Example: ${config?.prefix}timer start asmo`);
    }
  }
}