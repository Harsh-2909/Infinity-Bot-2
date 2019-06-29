const {	Command } = require('discord.js-commando');

module.exports = class LogoutCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'logout',
			aliases: ['turn-off', 'destroy', 'terminate'],
			group: 'admin',
			memberName: 'logout',
			description: 'Owner only command used to turn off bot.',
			ownerOnly: true,
		});
	}
	run(message) {
		message.say('Logging out...');
		setTimeout(() => {
			message.say('Bot Successfully logged out.');
			this.client.destroy();
		}, 3000);
	}

};