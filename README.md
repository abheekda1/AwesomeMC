# AwesomeMC
A simple Discord bot using Discord.js that sends a message on the status of a Minecraft (including mods, players, version) using the Minecraft Server Status API.

### ~~DISCLAIMER: THIS BOT DOES NOT WORK ON MULTIPLE SERVERS DUE TO THE VARIABLES BEING SERVER-SIDED (working on a fix).~~ NOW FIXED!

This bot is coded in Discord.js and can be installed and run with the following command:
```
sudo npm i -g awesomemc && awesomemc [BOT TOKEN]
```

To use it in the Discord server, it must first be added by going to [the Discord developer portal](https://discord.com/developers/applications/), creating an application, a bot, then creating an OAuth link and using it to add the bot to your server. Once it's added, it can give information for a specific server by running the command `mc connect your.server.name`. It will send its information in the same channel you initialized it in, which updates every 10 seconds. By default, it will list the status of the server, the address, the MOTD, the Minecraft version it's running, all of the mods in list form, the number of people online, and a list of the people online (if that's available).

If you liked this bot and it helped you out, please don't forget to star this repository :)
