const { prefix } = require('../ayarlar.json');
const db = require('quick.db');
const { MessageEmbed, Permissions } = require('discord.js');
exports.run = async (client, message, args) => {

    if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.channel.send({content: `Bu Komutu kullanabilmek için \`SUNUCUYU_YÖNET\` yetkisine sahip olmalısın`})
    if(args[0] == 'ayarla'){
        const rol = message.mentions.roles.first();
        if(!rol) return message.channel.send({content: `Hatalı kullanım. > Lütfen bir rol belirtiniz`})
        db.set(`yetkirol`, rol.id);
        const embed = new MessageEmbed()
        .setTitle(`BAŞARILI!`)
        .setDescription(`Kayıt Sorumlusu Rolü Başarıyla ${rol} isimli role ayarlandı`)
        .setColor("GREEN")
        message.channel.send({embeds: [embed]});
        return;
    }
    if(args[0] == 'sıfırla'){
        db.delete(`yetkirol`);
        const embed = new MessageEmbed()
        .setTitle(`BAŞARILI!`)
        .setDescription(`Kayıt Sorumlusu Rolü Başarıyla sıfırlandı`)
        .setColor("GREEN")
        message.channel.send({embeds: [embed]});
        return;
    }
    message.channel.send({content: `Hatalı kullanım. > \`${prefix}yetkili-rol ayarla/sıfırla\``})
};

exports.name = "yetkili-rol";