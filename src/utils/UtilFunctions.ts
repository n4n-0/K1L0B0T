import { MessageEmbed, TextChannel } from 'discord.js';
import DiscordClient from '../client/client';
const colors = require('colors');
const log = console.log;

let bot: DiscordClient;

export async function loadUtils(client: DiscordClient) {
    bot = client;
}

export async function botLog(message:string) {
    const guild = bot.guilds.cache.get('893193453960331294');
    const channel = guild!.client.channels.cache.get('935050225922478101') as TextChannel;
    if (!guild || !channel) return;
    const embed = new MessageEmbed()
        .setColor('#1b63e0')
        .setTitle(`K1L0B0T Log Entry`)
        .setDescription(`${message}`)
        .setTimestamp();
    channel.send({ embeds: [embed] });
}

export async function serverLog(guildID:string, server:string, message:string) {
    const guild = bot.guilds.cache.get(guildID);
    const config = bot.configs.get(guildID);
    if (!guild || !config) return

    const channel = guild!.client.channels.cache.get(config.logChannelId) as TextChannel;
    if (!channel) return
    const embed = new MessageEmbed()
        .setColor('#1b63e0')
        .setTitle(`${server} log Entry`)
        .setDescription(`${message}`)
        .setTimestamp();
    channel.send({ embeds: [embed] });
}