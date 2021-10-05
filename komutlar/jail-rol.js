const { prefix } = require('../ayarlar.json');
const { MessageEmbed,Permissions } = require('discord.js');
const db = require('quick.db');
exports.run = async(client, message, args) => {

    if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.channel.send({content: `Bu Komutu kullanabilmek için \`SUNUCUYU_YÖNET\` yetkisine sahip olmalısın`})

    const zatenvar = db.get(`jailrol`);
    if(args[0] == 'ayarla'){
        const rol = message.mentions.roles.first();
        if(zatenvar) return message.channel.send({content:'Jail Rol Zaten Ayarlanmış'});
        if(!rol) return message.channel.send({content: `Hatalı kullanım. > Lütfen bir rol belirtiniz`})
        db.set(`jailrol`, rol.id);
        const embed = new MessageEmbed().setTitle('BAŞARILI').setDescription(`Jail rolü ${rol} olarak ayarlandı`).setColor('GREEN');
        message.channel.send({embeds:[embed]});
        return;
    }
    if(args[0] == 'sıfırla'){
        if(!zatenvar) return message.channel.send({content:'Jail Rol Zaten Ayarlanmamış'});
        db.delete(`jailrol`);
        const embed = new MessageEmbed().setTitle('BAŞARILI').setDescription(`Jail rolü Sıfırlandı`).setColor('GREEN');
        message.channel.send({embeds:[embed]});
        return;
    }
    message.channel.send({content: `Hatalı kullanım. > \`${prefix}jail-rol ayarla/sıfırla\``})
};
exports.name = "jail-rol";