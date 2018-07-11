const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let user = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
  let role = args.join(" ").slice(22);
  let guildRole = message.guild.roles.find(`name`, role)
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
  if (!role){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "Please specify a **role!**"
      },
    ],
    }});
  };
  if (!guildRole){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: `${role} does not exist!`
      },
    ],
    }});
  };
  if(user.roles.has(guildRole.id)){
    await(user.removeRole(guildRole.id));
  };
}

module.exports.config = {
  name: "removerole"
}
