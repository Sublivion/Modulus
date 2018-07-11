// © 2018 CalvinTLincoln. All rights reserved.

const config = require("./botconfig.json");
const webMod = require("./webMod.js");
const Discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const express = require("express");

const bot = new Discord.Client({disableEveryone: false});
const app = express();
bot.commands = new Discord.Collection()

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
  webMod.run(req, res);
  console.log("hi");
}).listen(process.env.PORT || 8080);

function loadCode(){
  fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsFile = files.filter(f => f.split(".").pop() === "js")
    if (jsFile.length <= 0){
      console.log("Couldn't find commands");
      return;
    }

    jsFile.forEach((f, i) =>{
      delete require.cache[require.resolve(`./commands/${f}`)];
      var cmds = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(cmds.config.name, cmds);
    });
});
};

loadCode();

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
};

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`Watching ${bot.guilds.size} servers | ${config.prefix}help`);
  bot.user.setStatus("idle");
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  if(commandFile) commandFile.run(bot, message, args);

  if (cmd === `${prefix}refresh`){
    if (message.author.id !== config.ownerID) return;
    message.channel.send(":white_check_mark: reloaded commands! :white_check_mark:");
    loadCode();
  }

  if (cmd === `${prefix}exec`){
    if (message.author.id !== config.ownerID) return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        message.channel.send(clean(evaled), {code:"xl"});
    } catch(err){
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

});

bot.login(config.token);
