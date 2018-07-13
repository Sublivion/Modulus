const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_SERVER")){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "You must have the **MANAGE_SERVER** permission to use this command"
      },
    ],
    }});
  };
  if(!args[0]){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "Please specify the **role name** to create"
      },
    ],
    }});
  }

  let roles = JSON.parse(fs.readFileSync("./roles.json", "utf8"));

  if(!roles[args[0]]){
    roles[args[0]] = {
      roleName: args[0]
    }
  };

  roleObj = await message.guild.createRole({
      name: args[0],
      color: "#e74c3c",
      permissions: []
  });;

  roles[args[0]] = {
    roleName: roleObj.id
  };

  fs.writeFile("./roles.json", JSON.stringify(roles), (err) => {
    if(err) console.log(err);
  });

  return message.channel.send({embed:{
    color: 15844367,
    fields: [{
      name: "Success",
      value: `Successfully create the role **${args[0]}**`
    }],
  }})

}

module.exports.config = {
  name: "create"
}
