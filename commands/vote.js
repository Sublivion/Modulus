const Discord = require("discord.js");
const agree = "✅";
const disagree = "❌";

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
    .setColor("#f1c40f")
    .setFooter("React to vote, results will be posted in 15 seconds")
    .setDescription(input)
    .setTitle(`Vote initiated by ${message.author.username}`);

  let msg = await message.channel.send(embed);

  await msg.react(agree);
  await msg.react(disagree);

  message.delete({timeout: 1000});

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 15000});
  return message.channel.send({embed:{
    color: 15844367,
    fields: [{
      name: "Voting Results",
      value: `Voting Complete! \n\n${agree}: ${reactions.get(agree).count-1}\n${disagree}: ${reactions.get(disagree).count-1}`
    },
  ],
  }});

}

module.exports.config = {
  name: "vote"
}
