const {	Command } = require('discord.js-commando');

module.exports = class EightBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			group: 'misc',
			memberName: '8ball',
			description: 'It will reply to your question.',
			throttling: {
				usages: 1,
				duration: 5,
			},
			args: [
				{
					key: 'question',
					prompt: 'What question would you like to ask?',
					type: 'string',
				},
			],
		});
	}

	async run(message) {
		const replies = ['Without a doubt', 'Ask again later', 'Outlook good', 'Don\'t count on it', 'Yes, definitely', 'Signs point to yes', 'Yes', 'No', 'My sources say no', 'You may rely on it', 'Concentrate and ask again', 'It is certain'];
		const result = Math.floor(Math.random() * replies.length);
		message.say(`:8ball: | ${replies[result]}, ${message.author.username}`);
	}

};