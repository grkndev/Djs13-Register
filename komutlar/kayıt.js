const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { prefix } = require('../ayarlar.json');
exports.run = async (client, message, args) => {

    
    let member = message.mentions.members.first();
    const kayıtrol = db.get(`kayıtrol`);
    const yetkirol = db.get(`yetkirol`);
    const toplamkayıt = db.get(`kayıtsayı.${message.author.id}`);
    const kayıtkanal = db.get(`kayıtkanal`);
    const logkanal = db.get(`logkanal`);
    const kayıtsızrol = db.get(`kayıtsızrol`);
    const jailrol = db.get(`jailrol`);

    if(!message.member.roles.cache.has(yetkirol)) return message.channel.send({content:`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`});
    if(!kayıtkanal) return message.channel.send({content:`Lütfen Bir Kayıt kanalı ayarlayın`});
    if(!logkanal) return message.channel.send({content:`Lütfen Bir Kayıt Log kanalı ayarlayın`});
    if(message.channel.id != kayıtkanal) return message.channel.send({content:`Bu komutu sadece <#${kayıtkanal}> kanalında kullanabilrisin`});
    if(!kayıtrol) return message.channel.send({content:`Bu komutu kullanmak için önce kayıt rolünü ayarlayın \`${prefix}kayıt-rol ayarla @rol\``});
    if(!kayıtsızrol) return message.channel.send({content:`Bu komutu kullanmak için önce kayıtsız rolünü ayarlayın \`${prefix}kayıtsız-rol ayarla @rol\``});
    if(!yetkirol) return message.channel.send({content:`Bu komutu kullanmak için önce yetkili rolünü ayarlayın \`${prefix}yetkili-rol ayarla @rol\``});
    if(!member) return message.channel.send({content:`Lütfen Bir Kullanıcı belirt`});
    if(!member.roles.cache.has(kayıtrol)) return message.channel.send({content:`Lütfen Bir Kullanıcı belirt`});
    if(member.roles.cache.has(jailrol)) return  message.channel.send({content:`Bu kullanıcı jailde`});

    await member.roles.add(kayıtrol);
    await member.roles.remove(kayıtsızrol);
    await db.add(`kayıtsayı.${message.author.id}`, 1);
    const embed = new MessageEmbed()
    .setTitle('Kullanıcı kayıt edildi')
    .setDescription(`
    __**Kullanıcı Hakkında**__
    🆔 Kullanıcı ID: \`${member.user.id}\`
    🏷 İsim: ${args[1] ? args[1] : 'Belirtilmemiş'}
    ⏳ Yaş: \`${args[2] ? args[2] : 'Belirtilmemiş'}\`

    __**Yetkili Hakkında**__
    🚨 Kaydeden Yetkili: ${message.author}(\`${message.author.id}\`)
    🎫 Toplam \`${toplamkayıt}\` kayıt yaptı
    `)
    .setThumbnail(member.user.avatarURL({dynamic:true}))
    .setFooter(`${message.guild.name} kayıt sistemi 💖 by Gweep Creative`)
    .setColor("BLUE");
    message.channel.send({embeds:[embed]});
    client.guilds.cache.get(message.guild.id).channels.cache.get(logkanal).send({embeds:[embed]});
};

exports.name = "kayıt";