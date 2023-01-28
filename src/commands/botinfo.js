const Discord = require('discord.js');
const { Client, IntentsBitField: Intents, Collection ,Partials } = require("discord.js");
const client = (global.Client = new Client({
  intents: Object.values(Intents.Flags).filter(
(intent) => typeof intent === "string"),
  partials: Object.values(Partials).filter((partial) => typeof partial === "string"),
}));
const { EmbedBuilder } = require('discord.js');
const bots = require("../database/models/botlist/bots.js");
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send("Error: Please write bot id.");
    let b = await bots.findOne({
        botID: args[0]
    });
    if (!b) return message.channel.send("Invalid bot id.")
    let website = b.website ? " | [Website](" + b.website + ")" : "";
    let github = b.github ? " | [Github](" + b.github + ")" : "";
    let discord = b.support ? " | [Support Server](" + b.support + ")" : "";
    let coowner;
    if (!b.coowners.length <= 0) {
        coowner = b.coowners.map(a => "<@" + a + ">").join("\n");
    } else {
        coowner = "";
    }
const embed = new EmbedBuilder()
        .setThumbnail(b.avatar)
        .setAuthor({ name:b.username + "#" + b.discrim,iconURL: b.avatar})
        .setDescription("**[Vote for the bot named " + b.username + "#" + b.discrim + " in Topic.](https://discordbotlist.lmgxenon.repl.co/bot/" + b.botID + "/vote)**")
        .addFields({name:"ID",value: b.botID,inline: true})
        .addFields({name:"Username",value: b.username,inline: true})
        .addFields({name:"Discriminator",value: b.discrim,inline: true})
        .addFields({name:"Certificate",value: b.certificate,inline: true})
        .addFields({name:"Short Description",value: b.shortDesc,inline: true})
        .addFields({name:"Server Count",value: `${b.serverCount || "N/A"}`,inline: true})
        .addFields({name:"Owner(s)",value: `<@${b.ownerID}>\n${coowner.replace("<@>", "")}`,inline: true})
        .addFields({name:"Links",value: `[Invite](https://discord.com/oauth2/authorize?client_id=${b.botID}&scope=bot&permissions=8)${website}${discord}${github}`,inline: true})
.setColor("#7289da")
message.channel.send({ embeds: [embed] });

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};

exports.help = {
    name: "botinfo",
    description: "",
    usage: ""
};