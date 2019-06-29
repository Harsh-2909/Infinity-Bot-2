const {	Command } = require('discord.js-commando');
const { token } = require('../../config.json');

module.exports = class RestartCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'restart',
			aliases: ['reboot', 'boot-up', 'reset'],
			group: 'moderation',
			memberName: 'restart',
			description: 'Owner only command used to restart the bot.',
			ownerOnly: true,
		});
	}
	run(message) {
		message.say('Logging out...');
		setTimeout(() => {
			message.say('Bot Successfully logged out.');
			this.client.destroy();
		}, 3000);
		setTimeout(() => {
			this.client.login(token);
			return message.say(`Bot has restarted successfully as ${this.client.user.tag}`);
		}, 6000);
	}

};