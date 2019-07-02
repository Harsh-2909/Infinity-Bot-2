const {	Command } = require('discord.js-commando');

module.exports = class MuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			group: 'moderation',
			memberName: 'mute',
			description: 'Mute a mentioned user.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 30,
			},
			clientPermissions: ['MUTE_MEMBERS'],
			userPermissions: ['MUTE_MEMBERS'],
			args: [
				{
					key: 'User',
					prompt: 'Who would you like to mute?',
					type: 'user',
				},
				{
					key: 'reason',
					prompt: 'Please provide a reason to mute?',
					type: 'string',
					default: 'No reason provided.',
				},
			],
		});
	}
	async run(message, { User, reason }) {
		const mUser = message.guild.member(User);
		if (!mUser) { return message.say('Couldn\'t find user.'); }
		if(mUser.hasPermission('MUTE_MEMBERS')) { return message.say('That person can\'t be muted.'); }

		mUser.setMute(true, reason).catch(console.error);

		message.say(`${mUser.user.tag} muted successfully.`);
		return message.delete().catch(console.error());
	}

};