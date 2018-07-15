const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  let input = args.join(" ")

  if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "You must have the permission **ADMINISTRATOR** to run this command"
      },
    ],
    }});
  };

  if(!input){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "Please give **input** for your vote"
      },
    ],
    }});
  };

  let embed = new Discord.RichEmbed()
    .setColor("f1c40f")
    .setFooter("React to vote")
    .setDescription(input)
    .setTitle(`Vote initiated by ${message.author.username}`);

  let msg = await message.channel.send(embed);

  await msg.react("✅");
  await msg.react("❌");

  message.delete({timeout: 1000});

}

module.exports.config = {
  name: "vote"
}
