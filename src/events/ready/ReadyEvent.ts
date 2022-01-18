import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
const colors = require('colors');
const log = console.log;

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client: DiscordClient) {
    log(`${colors.black('[')}${colors.cyan('K1L0B0T')}${colors.black(']')} ${colors.green('The bot has started and is online!')}`);
  }
}