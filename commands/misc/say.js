const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			group: 'misc',
			memberName: 'say',
			description: 'Replies with the text you provide.',
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			args: [
				{
					key: 'text',
					prompt: 'What text would you like the bot to say?',
					type: 'string',
					default: 'Hello World',
				},
			],
		});
	}

	async run(message, { text }) {
		message.delete().catch(console.error());
		return message.say(text);
	}
};