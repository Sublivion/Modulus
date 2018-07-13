const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_SERVER")){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "You must have the permission **MANAGE_SERVER**"
      },
    ],
    }});
  }
  if(!args[0] || args[0 == "help"]){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "Prefix must be 1 to 2 letters."
      },
    ],
    }});
  }

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if(err) console.log(err);
  });

  return message.channel.send({embed:{
    color: 15844367,
    fields: [{
      name: "Success",
      value: `Successfully set prefix to **${args[0]}**`
    }],
  }});

}

module.exports.config = {
  name: "setprefix"
}
