const {	Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { config } = require('../../config.json');

module.exports = class BotInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'botinfo',
			group: 'misc',
			memberName: 'botinfo',
			description: 'Displays the bot information.',
		});
	}
	// TODO: Add more fields and proper bot description with proper formatting.
	async run(message) {
		const bicon = this.client.user.displayAvatarURL;
		const botembed = new RichEmbed()
			.setAuthor(message.author.username)
			.setDescription('Bot Information')
			.setColor(config.color.blue)
			.setThumbnail(bicon)
			.addField('Bot Name', this.client.user.username)
			.addField('Created On', this.client.user.createdAt);

		return message.say(botembed);
	}

};