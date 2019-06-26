/* eslint-disable brace-style */
// require the discord.js commando module
const { CommandoClient } = require("discord.js-commando");
const path = require("path");

// config file required to run the bot
const { prefix, token } = require("./config.json");

// create a new Discord client
const client = new CommandoClient({
	commandPrefix: prefix,
	owner: 362645647545073685,
	disableEveryone: true,
});

// const client = new Discord.Client();

client.registry
	.registerDefaultTypes()
	.registerGroups([
		["first", "Your First Command Group"],
		["second", "Your Second Command Group"],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, "commands"));

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity("Pokemon Go");
});

// client.on("message", message =>{
// 	if (message.content.startsWith(`${prefix}ping`)) {
// 		message.channel.send("Pong.");
// 	} else if (message.content.startsWith(`${prefix}beep`)) {
// 		message.channel.send("Boop.");
// 	}
// });

// login to Discord with your app's token
client.login(token);