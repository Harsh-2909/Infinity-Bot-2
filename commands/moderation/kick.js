const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { config } = require('../../config.json');

module.exports = class KickCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Kicks out the metioned user.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 30,
			},
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
			args: [
				{
					key: 'User',
					prompt: 'Who would you like to kick out the server?',
					type: 'user',
				},
				{
					key: 'reason',
					prompt: 'Please provide a reason to kick?',
					type: 'string',
				},
			],
		});
	}
	async run(message, { User, reason }) {
		const kUser = message.guild.member(User);
		if (!kUser) { return message.say('Couldn\'t find user.'); }
		if(kUser.hasPermission('KICK_MEMBERS')) { return message.say('That person can\'t be kicked.'); }

		const kickedEmbed = new RichEmbed()
			.setAuthor('Kick')
			.setColor(config.color.blue)
			.addField('Kicked User', kUser)
			.addField('Kicked User ID', kUser.id)
			.addField('Kicked By', message.author)
			.addField('Moderator ID', message.author.id)
			.addField('Channel', message.channel)
			.addField('Time', message.createdAt)
			.addField('Reason', reason);

		kUser.kick(reason);
		kUser.send(`You have been kicked out of **${message.guild.name}** by **${message.author.tag}**.
**Reason:** ${reason}`).catch(console.error());
		const kickedChannel = message.guild.channels.find('name', config.log_channel);
		if(!kickedChannel) {
			message.say('Couldn\'t find the appropriate channel. Please make one to store the reports.').then(msg => msg.delete(5000));
			message.say(kickedEmbed);
		}
		else{
			kickedChannel.send(kickedEmbed);
		}

		message.say(`${kUser.user.tag} kicked successfully.`);
		return message.delete().catch(console.error());
	}

};