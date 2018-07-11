// © 2018 CalvinTLincoln. All rights reserved.

const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  if(isNaN(args[0])){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "You must provide a **number!**"
      },
    ],
    }});
  }
  if(args[0] > 100){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "Number must be below **100!**"
      },
    ],
    }});
  }

  message.channel.bulkDelete(args[0])
    .then(messages => message.channel.send({embed:{
      color: 15844367,
      fields: [{
        name: "Success",
        value: `Successfully purged **${args[0]}** messages!`
      },
    ],
    }}));

}

module.exports.config = {
  name: "purge"
}
