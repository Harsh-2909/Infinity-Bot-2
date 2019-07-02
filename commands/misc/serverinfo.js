const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'serverinfo',
			group: 'misc',
			aliases: ['guildinfo'],
			memberName: 'serverinfo',
			description: 'Displays the server information.',
			guildOnly: true,
		});
	}

	async run(message) {
		const sicon = message.guild.iconURL;
		const date = message.guild.createdAt;
		const serverembed = new RichEmbed()
			.setAuthor(message.guild.name)
			.setColor(config.color.blue)
			.setThumbnail(sicon)
			.addField('Server ID', message.guild.id)
			.addField('Owner', message.guild.owner)
			.addField('Owner ID', message.guild.ownerID)
			.addField('Users', message.guild.memberCount)
			.addField('Channels', message.guild.channels.size)
			.addField('Roles', message.guild.roles.size)
			.addField('Region', message.guild.region)
			.addField('Created On', date.toDateString())
			.addField('You joined On', message.member.joinedAt.toDateString());

		return message.say(serverembed);
	}

};