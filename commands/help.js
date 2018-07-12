// © 2018 CalvinTLincoln. All rights reserved.

const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  message.channel.send("<@" + message.author.id + ">, your DMs have been modulated!");
  return message.author.send({embed:{
    color: 15158332,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    title: "Help",
    description: "A list of commands and their descriptions. Any bugs? DM `Calvin#5198` about it!",
    fields: [{
        name: "-help",
        value: "DMs you a list of commands"
      },
      {
        name: "-invite",
        value: "Returns the bot's invite link"
      },
      {
        name: "-kick @mention [reason]",
        value: "Kicks a user from the server"
      },
      {
        name: "-ban @mention [1y1w1d1h1m1s] [reason]",
        value: "Bans a user from the server, can specify amount of time. A permanent ban with reason would be ban @mention 0 reason"
      },
      {
        name: "-mute @mention [1y1w1d1h1m1s] [reason]",
        value: "Mutes a user throughout the whole server if they are not currently muted"
      },
      {
        name: "-purge [number]",
        value: "Deletes the specified number of messages"
      },
      {
        name: "-ping",
        value: "Pong, echos the response time between the bot and discord"
      },
      {
        name: "-addrole @mention [rolename]",
        value: "Adds a user to the specified role name"
      },
      {
        name: "-removerole @mention [rolename]",
        value: "Removes a specified role from a user"
      }
    ],
  }});
}

module.exports.config = {
  name: "help"
}
