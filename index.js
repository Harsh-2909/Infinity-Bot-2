/* eslint-disable brace-style */
// require the discord.js commando module
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

// config file required to run the bot
const { prefix, token, owner, botID } = require('./config.json');

// create a new Discord client
const client = new CommandoClient({
	commandPrefix: prefix,
	disableEveryone: true,
	owner: owner,
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['first', 'Your First Command Group'],
		['second', 'Your Second Command Group'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('Pokemon Go');
});

client.on('message', message =>{
	if(message.author.bot) { return; }
	if(message.content === `<@${botID}>`) {
		message.channel.send(`My prefix in this server is \`\`${prefix}\`\`. To learn how to use the bot, use the \`\`${prefix}help\`\` command.`);
	}
	if(!message.content.startsWith(prefix)) { return; }
});

client.on('error', console.error);

// login to Discord with your app's token
client.login(token);