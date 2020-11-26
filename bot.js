const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
let serverURL;

client.on('guildCreate', guild => {
    guild.channels.cache.find(channel => channel.name === 'general').send('Thanks for adding AwesomeMC as a bot! \nTip: create a channel called \`server-status\` and use the command \`!connect your.server.address\` to connect your Minecraft server to that channel!');
});

client.on('message', message => {
    if (message.content.startsWith("!connect")) {
        serverURL = `https://api.mcsrvstat.us/2/${message.content.substring(9)}`
        message.channel.lastMessage.delete();
        fetch(serverURL)
        .then(response => response.json())
        .then(data => {
            if (data.mods !== undefined) {
                var mods = JSON.stringify(data.mods.raw)
            } else {
                var mods = "No mods"
            }

            if (data.players.list !== undefined) {
                var people = JSON.stringify(data.players.list)
            } else if (data.players.online === 0) {
                var people = "Nobody here! (yet)"
            } else {
                var people = "Hidden"
            }

            message.guild.channels.cache.find(channel => channel.name === 'server-status').send(
`**Address: \`${data.hostname}\`**
\n**Online: \`${data.online}\`**
\`${data.motd.clean}\`
\n**Version: \`${data.version}\`**
\n**Mods:** \`\`\`\n${mods.replace(/,/g, "\n\n").replace(/\"/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\{/g, "").replace(/\}/g, "")}\`\`\`
\n**People Online: ${data.players.online}** \`\`\`\n${people.replace(/,/g, "\n").replace(/\"/g, "").replace(/\[/g, "").replace(/\]/g, "")}\`\`\`
`)
    });
    }
    if (message.content.startsWith("**Address")) {
        channel = message.channel;
	setInterval(function() {
		
        fetch(serverURL)
        .then(response => response.json())
        .then(data => {
	if (data.mods !== undefined) {
	    var mods = JSON.stringify(data.mods.raw)
	} else {
	    var mods = "No mods"
	}
        if (data.players.list !== undefined) {
            var people = JSON.stringify(data.players.list)
        } else if (data.players.online === 0) {
            var people = "Nobody here! (yet)"
        } else {
	    var people = "Hidden"
	}
	message.edit(
`**Address: \`${data.hostname}\`**
\`${data.motd.clean}\`
\n*To connect to another server, please run \`!connect your.minecraft.server\`*.
\n**Online: \`${data.online}\`**
\n**Version: \`${data.version}\`**
\n**Mods:** \`\`\`\n${mods.replace(/,/g, "\n\n").replace(/\"/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\{/g, "").replace(/\}/g, "")}\`\`\`
\n**People Online: ${data.players.online}** \`\`\`\n${people.replace(/,/g, "\n").replace(/\"/g, "").replace(/\[/g, "").replace(/\]/g, "")}\`\`\`
`)
	});
    }, 10000);
    }
    });

client.login('INSERT BOT TOKEN HERE');
