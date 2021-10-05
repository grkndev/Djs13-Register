const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.DIRECT_MESSAGES]});
const fs = require("fs");
const db = require('quick.db');
var moment = require("moment")
require("moment-duration-format");
moment.locale("tr");
const { prefix, token } = require("./ayarlar.json");


global.commands = new Collection();
fs.readdir("./komutlar", (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        global.commands.set(props.name, props);
        console.log(`Komut Yükleniyor: ${f}`)
    });
});


client.on('messageCreate', async message => {
    if (message.author.bot && !message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    const command = message.content.split(" ")[0].slice(prefix.length);
    const args = message.content.split(" ").slice(1);
    const cmd = global.commands.get(command);
    if(cmd) cmd.run(client, message, args);
});

const yetkirol = db.get(`yetkirol`);
const kayıtkanal = db.get(`kayıtkanal`);
const kayıtsızrol = db.get(`kayıtsızrol`);
const jailrol = db.get(`jailrol`);


client.on('ready', async () => {
    console.log(`${client.user.tag} ismi ile giriş yapıldı.`)
})
client.login(token);

  


//-----------------------------------------------Komutlar------------------------------------------------\\
    
    client.on("guildMemberAdd", async(member) => {  
        await member.roles.add(kayıtsızrol);
      let los = client.users.cache.get(member.id);
        const kurulus = new Date().getTime() - los.createdAt.getTime();  

          const mapping = {
            " ": "   ",
             '0': '0️⃣',
              '1': '1️⃣',
                        '2': '2️⃣',
                        '3': '3️⃣',
                        '4': '4️⃣',
                        '5': '5️⃣',
                        '6': '6️⃣',
                        '7': '7️⃣',
                        '8': '8️⃣',
                        '9': '9️⃣'
          }
            let üyesayısı =   `${member.guild.memberCount.toString()}`
               .split("")
               .map(c => mapping[c] || c)
               .join("")
    
      var kontrol;
    if (kurulus < 1296000000) {
      member.roles.add(jailrol);
      member.roles.remove(kayıtsızrol);
      kontrol = `Hesap Durumu: **Güvenilir Değil** ❌`
  }
    if (kurulus > 1296000000) kontrol = `Hesap Durumu: **Güvenilir** ✅`
     
      const kanal = member.guild.channels.cache.get(kayıtkanal)
      const kuruluss = new Date().getTime() - los.createdAt.getTime();  
      const gecen = moment.duration(kuruluss).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
  const embed = new MessageEmbed()
  .setTitle(`Sunucumuza Hoşgeldin ${member.user.username}`)
  .setThumbnail(member.user.avatarURL({ dynamic: true }))
  .setDescription(`📥 • Sunucumuza Hoşeldin ${los} !
  
  🥳 • Seninle Beraber Sunucumuzda `+ üyesayısı +` Değerli İnsan Oldu.
  
  ⏲️ • Hesabın \``+ gecen +`\` Önce Oluşturulmuş.
  
  🛠️ • `+ kontrol +`
  
  🚨 • <@&${yetkirol}> Rolündeki Yetkililer Seninle İlgilenicektir.
  
`)
  .setColor("RANDOM")
  kanal.send({content:`<@&${yetkirol}>`, embeds:[embed]})
    
})