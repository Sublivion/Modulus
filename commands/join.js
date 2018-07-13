const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
  if(!args[0]){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "Please specify a role name to join"
      },
    ],
    }});
  }

  let roles = JSON.parse(fs.readFileSync("./roles.json", "utf8"));

  if(!roles[args[0]]){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "This role does not exist"
      },
    ],
    }});
  };

  message.member.addRole(roles[args[0]].roleName);

  return message.channel.send({embed:{
    color: 15844367,
    fields: [{
      name: "Success",
      value: `Successfully joined **${args[0]}**`
    }],
  }});

}

module.exports.config = {
  name: "join"
}
