const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  if(!args[1]){
    return message.channel.send({embed:{
      color: 15158332,
      fields: [{
        name: "Error",
        value: "Please give an 8-ball **input**"
      },
    ],
    }});
  };

  let responses = ["It is certain", "As I see it, yes", "Reply hazy, try again", "Don't count on it", "It is decidedly so",
    "Most likely", "Ask again later", "My reply is no", "Without a doubt", "Outlook good", "Better not tell you now", "My sources say no",
    "Yes - definitely", "Yes", "Cannot predict now", "Outlook not so good", "You may rely on it", "Signs point to yes", "Concentrate and ask again",
    "Very doubtful", "No", "The stars tell me yes", "Look to the north for your answer"
  ];
  let result = Math.floor((Math.random() * responses.length));
  let question = args.slice(1).join(" ");

  return message.channel.send({embed:{
    color: 15844367,
    fields: [{
      name: "Success",
      value: `:8ball: ${responses[result]}`
    },
  ],
  }});

}

module.exports.config = {
  name: "8ball"
}
