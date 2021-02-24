#!/usr/bin/env node

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

client.on('ready', () => { console.log("Ready!"); })
client.on('guildCreate', guild => {
    guild.channels.cache.find(channel => channel.name === 'general').send('Thanks for adding AwesomeMC as a bot! \nTip: create a channel called \`server-status\` and use the command \`!connect your.server.address\` to connect your Minecraft server to that channel!');
});

client.on('message', async message => {
    var serverConnectMsg;
    var serverURL;
    if (message.content.startsWith("mc connect")) {
        serverURL = `https://api.mcsrvstat.us/2/${message.content.substring(11)}`;
        message.delete({ timeout: 1000 });
        var mods;
        await fetch(serverURL)
            .then(response => response.json())
            .then(data => {
                if (data.mods) {
                    mods = JSON.stringify(data.mods.raw);
                } else {
                    mods = "No mods";
                }

                if (data.players.list) {
                    var people = JSON.stringify(data.players.list)
                } else if (data.players.online === 0) {
                    var people = "Nobody here (yet!)"
                } else {
                    var people = "Hidden"
                }
                //serverConnectMsg = message.channel.send(`**Address: \`${data.hostname}\`**\n**Online: \`${data.online}\`** \`${data.motd.clean}\` \n**Version: \`${data.version}\`** \n**Mods:** \`\`\`\n${mods.replace(/,/g, "\n\n").replace(/\"/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\{/g, "").replace(/\}/g, "")}\`\`\`\n**People Online: ${data.players.online}** \`\`\`\n${people.replace(/,/g, "\n").replace(/\"/g, "").replace(/\[/g, "").replace(/\]/g, "")}\`\`\``).then((msg) => {
                serverConnectMsg = message.channel.send(new Discord.MessageEmbed().addFields(
                    {name: 'Hostname', value: `\`${data.hostname}\``},
                    {name: 'Online', value: `\`${data.online}\``},
                    {name: 'MOTD', value: `\`${data.motd.clean}\``},
                    {name: 'Version', value: `\`${data.version}\``},
                    {name: 'Mods', value: `\`${mods}\``},
                )).then((msg) => {
                    setInterval(function () {
                        fetch(serverURL)
                            .then(response => response.json())
                            .then(data => {
                                if (data.mods) {
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
                                //msg.edit(`**Address: \`${data.hostname}\`**\n**Online: \`${data.online}\`** \`${data.motd.clean}\` \n**Version: \`${data.version}\`** \n**Mods:** \`\`\`\n${mods.replace(/,/g, "\n\n").replace(/\"/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\{/g, "").replace(/\}/g, "")}\`\`\`\n**People Online: ${data.players.online}** \`\`\`\n${people.replace(/,/g, "\n").replace(/\"/g, "").replace(/\[/g, "").replace(/\]/g, "")}\`\`\``);
                                msg.edit(new Discord.MessageEmbed().addFields(
                                    {name: 'Hostname', value: `\`${data.hostname}\``},
                                    {name: 'Online', value: `\`${data.online}\``},
                                    {name: 'MOTD', value: `\`${data.motd.clean}\``},
                                    {name: 'Version', value: `\`${data.version}\``},
                                    {name: 'Mods', value: `\`${mods}\``}
                                ))
                            });
                    }, 5000);
                })
            })
    }
});

client.login(process.argv[2]);
