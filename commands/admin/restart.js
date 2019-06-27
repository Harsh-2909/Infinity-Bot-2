const {	Command } = require('discord.js-commando');
const { token } = require('../../config.json');

module.exports = class RestartCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'restart',
			aliases: ['reboot', 'boot-up', 'reset'],
			group: 'admin',
			memberName: 'restart',
			description: 'Owner only command used to restart the bot.',
			ownerOnly: true,
		});
	}
	run(message) {
		message.say('Logging out...');
		this.client.destroy();
		this.client.login(token);
		message.say(`Bot has restarted successfully as ${this.client.user.tag}`);
	}

};