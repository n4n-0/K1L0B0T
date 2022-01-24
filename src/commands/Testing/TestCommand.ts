import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { botLog, serverLog } from '../../utils/UtilFunctions';

export default class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'Testing', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    message.delete();
    botLog(`${message.author.username} has ran a test command in ${message.guild!.name}`);
    serverLog(message.guild!.id, message.guild!.name, `${message.author.username} has ran a test command in ${message.guild!.name}`);
  }
}