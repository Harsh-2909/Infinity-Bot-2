const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
			group: 'misc',
			aliases: ['userinfo'],
			memberName: 'info',
			description: 'Displays the user information.',
			guildOnly: true,
		});
	}

	async run(message) {
		const uicon = message.author.displayAvatarURL;
		const date = message.author.createdAt;
		const userembed = new RichEmbed()
			.setAuthor(message.author.tag)
			.setColor(config.color.green)
			.setThumbnail(uicon)
			.addField('ID', message.author.id)
			.addField('Status', message.author.presence.status)
			.addField('Nickname', message.author.username)
			.addField('Account Created On', date.toDateString())
			.addField('Joined this server On', message.member.joinedAt.toDateString());

		return message.say(userembed);
	}

};