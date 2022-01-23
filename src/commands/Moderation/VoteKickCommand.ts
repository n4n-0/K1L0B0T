import { Guild, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
const colors = require('colors');
const log = console.log;

export default class VoteKickCommand extends BaseCommand {
    constructor() {
        super('votekick', 'Moderation', []);
    }

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        message.delete();
        const user = message.mentions.users.first() || message.guild?.members.cache.get(args[0]);
        const reason = args.slice(1).join(" ");

        if(!user) {
            const noUser = new MessageEmbed()
            .setColor("#9d0101")
            .setTitle('Please enter a valid user')
            .setDescription(`Usage: ${client.prefix}votekick <user> [reason]`)
            .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })

            message.channel.send({ embeds: [noUser] })
            return
        }

        const voteKickEmbed = new MessageEmbed()
            .setColor("#9d0101")
            .setTitle(`🗒 Vote Kick`)
            .setDescription(`${message.author.username} has started a vote kick for ${user} for the following reason: ${reason}`)
            .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })

        message.channel.send({ embeds: [voteKickEmbed] }).then(embedMessage => {
            embedMessage.react("✅");
            embedMessage.react("❌");

            const filter = (reaction: any, user: any) => { reaction.emoji.name === '✅' || reaction.emoji.name === '❌' || user.id === message.author.id; };
            embedMessage.awaitReactions({ filter: Boolean, time: 15_000 }).then(collected => {
                const posCount = collected.get('✅')!.count - 1;
                log(posCount)
                const negCount = collected.get('❌')!.count - 1;
                log(negCount)
                if(posCount > 10 && posCount > negCount) {
                    const kickEmbed = new MessageEmbed()
                        .setColor("#9d0101")
                        .setTitle(`🗒 Kick`)
                        .setDescription(`${user} has been kicked from ${message.guild!.name} by ${message.author} for the following reason: ${reason}`)
                        .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })

                    if(!reason) {
                        kickEmbed.setDescription(`${user} has been kicked from ${message.guild!.name} by ${message.author}`)
                        message.channel.send({ embeds: [kickEmbed] })
                        message.guild?.members.kick(user, reason);
                    } else {
                        message.channel.send({ embeds: [kickEmbed] })
                        message.guild?.members.kick(user, reason);
                    }
                } else {
                    const noKick = new MessageEmbed()
                        .setColor("#9d0101")
                        .setTitle('🗒 Vote Kick')
                        .setDescription(`${user} has not been kicked due to time running out and not enough votes`)
                        .setFooter({ text: `${message.guild?.name} Moderation :: ${message.author.username}` })
                    message.channel.send({ embeds: [noKick] })
                }
            });

        });
    }
}