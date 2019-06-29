const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ReportCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'report',
			group: 'moderation',
			memberName: 'report',
			description: 'Reports a user.',
			throttling: {
				usages: 1,
				duration: 30,
			},
			guildOnly: true,
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			args: [
				{
					key: 'User',
					prompt: 'Who would you like to report?',
					type: 'user',
				},
				{
					key: 'reason',
					prompt: 'Please provide a reason to report?',
					type: 'string',
				},
			],
		});
	}
	// TODO: Try to make the report channel set by user and not hardcoded.
	run(message, { User, reason }) {
		const reUser = message.guild.member(User);
		if (!reUser) { return message.say('Couldn\'t find user.'); }

		const reportEmbed = new RichEmbed()
			.setAuthor('Report')
			.setColor('157157')
			.addField('Reported User', reUser)
			.addField('Reported User ID', reUser.id)
			.addField('Reported By', message.author)
			.addField('Reporter ID', message.author.id)
			.addField('Channel', message.channel)
			.addField('Time', message.createdAt)
			.addField('Reason', reason);


		const reportChannel = message.guild.channels.find('name', 'logs');
		if(!reportChannel) {
			message.say('Couldn\'t find the appropriate channel. Please make one to store the reports.').then(msg => msg.delete(5000));
			message.say(reportEmbed);
		}
		else{
			reportChannel.send(reportEmbed);
		}

		message.say(`${reUser.tag} reported successfully.`);
		return message.delete().catch(O_o=>{ console.log(O_o); });
	}

};