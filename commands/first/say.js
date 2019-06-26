const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			aliases: ['parrot', 'copy'],
			group: 'first',
			memberName: 'say',
			description: 'Replies with the text you provide.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like the bot to say?',
					type: 'string',
				},
				{
					key: 'otherThing',
					prompt: 'What is this other useless thing?',
					type: 'string',
					default: 'dog',
					oneOf: ['dog', 'cat'],
					validate: otherThing => otherThing.length < 200,
				},
			],
		});
	}

	run(message, { text, otherThing }) {
		return message.reply(`${text} ${otherThing}`);
	}
};