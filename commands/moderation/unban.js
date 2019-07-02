const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = class UnBanCommand extends Command {
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
					type: 'string',
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
	async run(message, { User, reason }) {
		const bannedUsers = await message.guild.fetchBans();
		let user;
		if (bannedUsers.find(t => t.tag === User) !== null) {
			user = bannedUsers.find(t => t.tag === User);
		}
		else if (bannedUsers.find(u => u.username === User) !== null) {
			user = bannedUsers.find(u => u.username === User);
		}
		else if (bannedUsers.get(User) !== null) {
			user = bannedUsers.get(User);
		}
		if (user === null || user === undefined) {
			await message.react('❌');
			return message.say('User not Found or that user has not been banned.');
		}
		await message.delete(1);

		const unbannedEmbed = new RichEmbed()
			.setAuthor('Unban')
			.setColor(config.color.green)
			.addField('Unbanned User', user)
			.addField('Unbanned User ID', user.id)
			.addField('Unbanned By', message.author)
			.addField('Moderator ID', message.author.id)
			.addField('Channel', message.channel)
			.addField('Time', message.createdAt)
			.addField('Reason', reason);

		message.guild.unban(user, reason);
		const unbannedChannel = message.guild.channels.find('name', config.log_channel);
		if(!unbannedChannel) {
			message.say('Couldn\'t find the appropriate channel. Please make one to store the reports.').then(msg => msg.delete(5000));
			message.say(unbannedEmbed);
		}
		else{
			unbannedChannel.send(unbannedEmbed);
		}

		message.say(`${user.tag} unbanned successfully.`);
		user.send(unbannedEmbed.setFooter('You can join back to the server now.')).catch(console.error());
	}

};