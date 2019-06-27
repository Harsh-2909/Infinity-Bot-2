const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class BotInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'botinfo',
			group: 'second',
			memberName: 'botinfo',
			description: 'Displays the bot information.',
		});
	}
	// TODO: Add more fields and proper bot description with proper formatting.
	run(message) {
		const bicon = this.client.user.displayAvatarURL;
		const botembed = new RichEmbed()
			.setAuthor(message.author.username)
			.setDescription('Bot Information')
			.setColor('#0000FF')
			.setThumbnail(bicon)
			.addField('Bot Name', this.client.user.username)
			.addField('Created On', this.client.user.createdAt);

		return message.say(botembed);
	}

};