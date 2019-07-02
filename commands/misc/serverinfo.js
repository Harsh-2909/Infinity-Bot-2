const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { config } = require('../../config.json');

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
	// TODO: Add more fields and proper Server description with proper formatting.
	async run(message) {
		const sicon = message.guild.iconURL;
		const serverembed = new RichEmbed()
			.setAuthor(message.guild.name)
			.setDescription('Server Information')
			.setColor(config.color.blue)
			.setThumbnail(sicon)
			.addField('Server Name ', message.guild.name)
			.addField('Server ID ', message.guild.id)
			.addField('Created On ', message.guild.createdAt)
			.addField('You joined On', message.member.joinedAt)
			.addField('Total Members ', message.guild.memberCount);

		return message.say(serverembed);
	}

};