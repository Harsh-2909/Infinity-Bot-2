const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'serverinfo',
			group: 'second',
			aliases: ['guildinfo'],
			memberName: 'serverinfo',
			description: 'Displays the server information.',
		});
	}
	// TODO: Add more fields and proper Server description with proper formatting.
	run(message) {
		const sicon = message.guild.iconURL;
		const serverembed = new RichEmbed()
			.setAuthor(message.guild.name)
			.setDescription('Server Information')
			.setColor('#0000FF')
			.setThumbnail(sicon)
			.addField('Server Name ', message.guild.name)
			.addField('Server ID ', message.guild.id)
			.addField('Created On ', message.guild.createdAt)
			.addField('You joined On', message.member.joinedAt)
			.addField('Total Members ', message.guild.memberCount);

		return message.say(serverembed);
	}

};