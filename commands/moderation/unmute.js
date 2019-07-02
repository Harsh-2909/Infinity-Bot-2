const {	Command } = require('discord.js-commando');

module.exports = class UnunmuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unmute',
			group: 'moderation',
			memberName: 'unmute',
			description: 'Unmute a mentioned user.',
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
					prompt: 'Who would you like to unmute?',
					type: 'user',
				},
				{
					key: 'reason',
					prompt: 'Please provide a reason to ununmute?',
					type: 'string',
					default: 'No reason provided.',
				},
			],
		});
	}
	async run(message, { User, reason }) {
		const mUser = message.guild.member(User);
		if (!mUser) { return message.say('Couldn\'t find user.'); }
		if(mUser.hasPermission('MUTE_MEMBERS')) { return message.say('That person can\'t be unmuted.'); }

		mUser.setMute(false, reason).catch(console.error);

		message.say(`${mUser.user.tag} unmuted successfully.`);
		return message.delete().catch(O_o=>{ console.log(O_o); });
	}

};