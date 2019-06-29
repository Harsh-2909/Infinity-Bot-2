const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
// const { RichEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unban',
			group: 'moderation',
			memberName: 'unban',
			description: 'Unbans out the mentioned user from the server.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 30,
			},
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
			args: [
				{
					key: 'User',
					prompt: 'Who would you like to unban in the server?',
					type: 'user',
				},
				{
					key: 'reason',
					prompt: 'Please provide a reason to ban?',
					type: 'string',
					default: 'No reason provided',
				},
			],
		});
	}
	run(message, { User, reason }) {
		const bInfo = message.guild.fetchBans(User);
		if (!bInfo) { return message.say('Couldn\'t find user to unban.'); }

		// if(bInfo.hasPermission('BAN_MEMBERS')) { return message.say('That person can\'t be banned.'); }

		const unbannedEmbed = new RichEmbed()
			.setAuthor('Unban')
			.setColor('157157')
			.addField('Unbanned User', bInfo.user)
			.addField('Unbanned User ID', bInfo.user.id)
			.addField('Unbanned By', message.author)
			.addField('Moderator ID', message.author.id)
			.addField('Channel', message.channel)
			.addField('Time', message.createdAt)
			.addField('Reason', reason);

		message.guild.unban(reason);
		/* bInfo.user.send(`You have been unbanned in **${message.guild.name}** by **${message.author.tag}**.
**Reason:** ${reason}`); */
		const unbannedChannel = message.guild.channels.find('name', 'logs');
		if(!unbannedChannel) {
			message.say('Couldn\'t find the appropriate channel. Please make one to store the reports.').then(msg => msg.delete(5000));
			message.say(unbannedEmbed);
		}
		else{
			unbannedChannel.send(unbannedEmbed);
		}

		message.say(`${bInfo.user.tag} unbanned successfully.`);
		return message.delete().catch(O_o=>{ console.log(O_o); });
	}

};