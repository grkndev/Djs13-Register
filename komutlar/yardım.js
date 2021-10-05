const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { prefix } = require('../ayarlar.json');
exports.run = async (client, message, args) => {
  
  const yt = new MessageButton().setLabel('Gweep Creative Youtube').setStyle('LINK').setURL('http://gweepcreative.com');
  const dc = new MessageButton().setLabel('Gweep Creative Discord').setStyle('LINK').setURL('https://discord.gg/Swfj3MgA9P');
  const row = new MessageActionRow().addComponents(dc, yt)
  const embed = new MessageEmbed()
  .setTitle(`Gweep Craetive v13 Kayıt Botu`)
  .addField(`> ${prefix}kayıt`,`Kullanıcıları kayıt eder.`,false)
  .addField(`> ${prefix}yetkili-rol ayarla/sıfırla`,`kayıt yetkili rolü ayarlar/sıfırlar.`,false)
  .addField(`> ${prefix}kayıt-rol ayarla/sıfırla`,`kayıt edilince verilecek rolü ayarlar/sıfırlar.`,false)
  .addField(`> ${prefix}kayıtsız-rol ayarla/sıfırla`,`kayıtsız rolünü ayarlar/sıfırlar.`,false)
  .addField(`> ${prefix}kayıt-kanal ayarla/sıfırla`,`kaydın yapılacağı kanalı ayarlar/sıfırlar.`,false)
  .addField(`> ${prefix}kayıt-log ayarla/sıfırla`,`logların gideceği kanalı ayarlar/sıfırlar.`,false)
  .addField(`> ${prefix}jail-rol ayarla/sıfırla`,`jail rolünü ayarlar/sıfırlar.`,false)
  .addField(`> ${prefix}jail al`,`jail rolünü alır.`,false)
  .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL({dynamic:true}))
  .setColor('BLUE')
  .setThumbnail(client.user.avatarURL())
  message.channel.send({embeds: [embed], components:[row]})

};

exports.name = "yardım";