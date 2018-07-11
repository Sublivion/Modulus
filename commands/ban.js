const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let user = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
  let reason = args.join(" ").slice(22);
  if (!user){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: `I cannot find the user ${message.mentions.members.first()}`
      },
    ],
    }});
  };
  if(!message.member.hasPermission("BAN_MEMBERS")){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "You must have the **BAN_MEMBERS** permission to use this command"
      },
    ],
    }});
  };
  if(user.hasPermission("BAN_MEMBERS")){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "This person is an **administrator** and cannot be banned"
      },
    ],
    }});
  }
  user.ban(reason)
  return message.channel.send({embed:{
    color: 15844367,
    fields: [{
      name: "Success",
      value: `Successfully banned **${message.mentions.members.first()}**`
    }],
  }})
}

module.exports.config = {
  name: "ban"
}
