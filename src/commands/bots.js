const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js');
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
   let x = await botdata.find();
   let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))


const embed = new EmbedBuilder()
   .setAuthor({ name:message.author.tag,iconURL: message.author.avatarURL({dynamic: true})})
   .setDescription(`**Total ${bots.length} bots found.**`)
   .setColor("#7289da")
   .addFields({name:"Bots",value: `${!bots ? "" : bots.map(a => "<@"+a.botID+">").join("\n")}`,inline: true})
message.channel.send({ embeds: [embed] });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bots"],
  };
  
  exports.help = {
    name: "bots",
    description: "",
    usage: ""
  };