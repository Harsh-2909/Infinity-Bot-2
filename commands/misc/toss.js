const {	Command } = require('discord.js-commando');

module.exports = class TossCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'toss',
			aliases: ['flip'],
			group: 'misc',
			memberName: 'toss',
			throttling: {
				usages: 1,
				duration: 5,
			},
			description: 'Toss a coin and tell if it\'s a head or a tail. Will only work if the number is below 50',
			args: [
				{
					key: 'number',
					prompt: 'How many times do you want the coin to be tossed.',
					type: 'integer',
					default: 1,
					validate: number => number >= 1 && number <= 50,
				},
			],
		});
	}
	// TODO: Change the formatting of the output.
	async run(message, { number }) {
		let heads = 0, tails = 0;
		for(let i = 0; i < number; i++) {
			const res = Math.floor(Math.random() * 2);
			if(res === 0) {
				heads++;
			}
			else if(res === 1) {
				tails++;
			}
		}
		return message.say(`${number} coin tossed.
		\`\`${heads} Heads\`\`
		\`\`${tails} Tails\`\``);
	}

};