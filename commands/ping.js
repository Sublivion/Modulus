// © 2018 CalvinTLincoln. All rights reserved.

const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  const m = await message.channel.send("Ping?");
  return m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
}

module.exports.config = {
  name: "ping"
}
