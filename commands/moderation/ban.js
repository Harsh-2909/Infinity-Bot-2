const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { config } = require('../../config.json');

module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'moderation',
			memberName: 'ban',
			description: 'Bans out the mentioned user from the server.',
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
					prompt: 'Who would you like to ban in the server?',
					type: 'user',
				},
				{
					key: 'reason',
					prompt: 'Please provide a reason to ban?',
					type: 'string',
				},
			],
		});
	}
	async run(message, { User, reason }) {
		const bUser = message.guild.member(User);
		if (!bUser) { return message.say('Couldn\'t find user.'); }
		if(bUser.hasPermission('BAN_MEMBERS')) { return message.say('That person can\'t be banned.'); }

		const bannedEmbed = new RichEmbed()
			.setAuthor('Ban')
			.setColor(config.color.red)
			.addField('Banned User', bUser)
			.addField('Banned User ID', bUser.id)
			.addField('Banned By', message.author)
			.addField('Moderator ID', message.author.id)
			.addField('Channel', message.channel)
			.addField('Time', message.createdAt)
			.addField('Reason', reason);

		bUser.ban(reason);
		bUser.send(`You have been banned in **${message.guild.name}** by **${message.author.tag}**.
**Reason:** ${reason}`).catch(console.error());
		const bannedChannel = message.guild.channels.find('name', config.log_channel);
		if(!bannedChannel) {
			message.say('Couldn\'t find the appropriate channel. Please make one to store the reports.').then(msg => msg.delete(5000));
			message.say(bannedEmbed);
		}
		else{
			bannedChannel.send(bannedEmbed);
		}

		message.say(`${bUser.user.tag} banned successfully.`);
		return message.delete().catch(console.error());
	}

};