const {	Command } = require('discord.js-commando');

module.exports = class ReportCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clear',
			group: 'moderation',
			memberName: 'clear',
			aliases: ['clean', 'purge', 'delete'],
			description: 'Clears out a certain number of messages.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 10,
			},
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			args: [
				{
					key: 'amount',
					prompt: 'How many messages would you like to clear?',
					type: 'integer',
					default: 10,
					validate: amount => amount >= 1 && amount <= 100,
				},
			],
		});
	}
	async run(message, { amount }) {
		message.channel.bulkDelete(amount);
		const msg = await message.say(`Cleared ${amount} messages.`);
		msg.delete(3000);
	}

};