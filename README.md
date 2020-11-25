# AwesomeMC
A simple Discord bot using Discord.js that sends a message on the status of a Minecraft (including mods, players, version) using the Minecraft Server Status API.

### DISCLAIMER: THIS BOT DOES NOT WORK ON MULTIPLE SERVERS DUE TO THE VARIABLES BEING SERVER-SIDED (working on a fix).
A simple workaround would be to make multiple bots using this same code to use for different servers.

This bot is coded in Discord.js and can be run with the following command:
```
node --inspect bot.js
```
If it crashes due to a lack of RAM, more can be allocated like so:
```
node --inspect --max-old-space-size=[size in MB] bot.js
```

_Before running it, make sure you add your own Client ID on the last line!_

To use it in the Discord server, it must first be added by going to [the Discord developer portal](https://discord.com/developers/applications/) and creating an application, then a bot, and then creating an OAuth link and using it to add the bot to your server. Once it's added, it can give information for a specific server by running the command `!connect your.server.name`. It needs a channel named `server-status` for it to send it's information, which updates every 10 seconds. By default, it will list the status of the server, the address, the MOTD, the Minecraft version it's running, all of the mods in list form, the number of people online, and a list of the people online (if that's available).

If you liked this bot and it helped you out, please star this repository :)
