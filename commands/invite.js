// © 2018 CalvinTLincoln. All rights reserved.

const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  return message.channel.send({embed:{
    color: 15844367,
    url: "https://discordapp.com/oauth2/authorize?client_id=468134631221362698&permissions=8&scope=bot",
    fields: [{
      name: "Bot Invite Link",
      value: "To invite Modulus to your server, click this [link!](https://discordapp.com/oauth2/authorize?client_id=468134631221362698&permissions=8&scope=bot)"
    },
  ],
  }});
}

module.exports.config = {
  name: "invite"
}
