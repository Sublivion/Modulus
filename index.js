// © 2018 CalvinTLincoln. All rights reserved.

const config = require("./botconfig.json");
const webMod = require("./webmod.js");
const Discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const raven = require("raven");
const rethink = require("rethinkdb");

raven.config('https://c3e4ac461df84a6795fea80f06a414d1@sentry.io/1243349').install();

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()

http.createServer(function(req, res) {
  webMod.run(req, res);
}).listen(process.env.PORT || 5050);

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
  bot.user.setActivity(`with ${bot.guilds.size} servers | ${config.prefix}help`);
  bot.user.setStatus("Online");
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  if(message.content == "hey modulus"){
    return message.channel.send("Yes, sir?");
  };

  if(message.content == "lets start deving, ok?"){
    return message.channel.send("Yes sir, after you.");
  };

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  };

  let prefix = prefixes[message.guild.id].prefixes
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  if(!message.content.startsWith(prefix)) return;

  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  if(commandFile) commandFile.run(bot, message, args);

  if (cmd === `${prefix}refresh`){
    if (message.author.id !== config.ownerID) return;
    message.channel.send(":white_check_mark: reloaded commands! :white_check_mark:");
    loadCode();
  }

  if (cmd === `${prefix}exec`){
    if (message.author.id !== config.process.env.OWNERID) return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        message.channel.send(clean(evaled), {code:"xl"});
    } catch(err){
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      raven.captureException(err);
    }
  }

});

bot.login(process.argv[2] || config.token);
