const Discord = require('discord.js')
const config = require('./config.js')
const bot = new Discord.Client()
const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const porntrigger = [
    "Porn is nice~",
    "Semen is actually good for your health, so opt for giving blowjobs ;3",
    "Inhuman penis is much more appealing than human ones.",
    "Eat, sleep, watch porn, sleep, repeat.",
    "Fun fact: Gamershy watches porn almost every night..",
    "You have technically 3 owners. One of which will fuck anyone if they have a pulse...",
    "Blame GeneralUltra758 for these randomized messages.",
    "missingno.porn.js",
    "Buttsex is fun too~",
    "Someone say porn? OwO",
    "Horse ass...~",
    "Horses have tight butts!",
    "It's Cock O' Clock",
    "OwO What's this? *pokes bulge*",
    "Don't forget the fags!",
    "Rimjobs may sound gross, but they feel amazing..~",
    "Fun fact: Amethyst technically classifies as a transexual.",
    "These messages appear whenever you say the word 'porn'"
]
const size = [
    "8================D",
    "8=====D",
    "8=D",
    "8========D",
    ".",
    "8=============D",
    "8==============================D"
]
const playingmsg = [
    "with tools in slot 'A'",
    "Banned from Equestria",
    "with herself, in your bed.",
    "upgrading flexibility...",
    "installing a new 'dongle'",
    "with slot 'V'",
    "with tools in slot 'V'",
    "staring at you as you shower",
    "attempting to fix broken clit-drive",
    "WHAT ARE YOU DOING THERE SHY?!",
    "Asian Driver Simulator",
    "Minecraft: Cock edition",
    "with Sweetiebot",
    "attempting to lick herself",
    "Robo-sex-horse simulator 2017",
    "Initializing pornhub.js",
    "with your cock",
    "with your pussy",
    "with a hotdog in slot `V`",
    "with a hotdog in slot 'A'",
    "with a gloryhole"
]

const pingmsg = [
    "Porn, I mean, Pong!",
    "Yeah yeah, I'm working.",
    "Pingpong.",
    "Yeah, cuz no other command could check that I'm working.",
    "ERROR: NotAVirus.exe succesfully pinged!",
    "What do you want.",
    "Can't you see I have something in slot 'V'??",
    "You better have a good reason for this..",
    "Can you not? I'm a bit... busy...",
    "Something tells me this isn't because I'm not working.",
    "Pongping."
]

const BoopImg = [
    "https://cdn.discordapp.com/attachments/270372438825500672/283016843030036481/271618__UNOPT__safe_animated_scrunchy-face_boop_marker-pony_extreme-speed-animation.gif",
    "https://cdn.discordapp.com/attachments/270372438825500672/283016847522267136/thumb.gif",
    "https://cdn.discordapp.com/attachments/270372438825500672/283016854698459137/giphy_1.gif",
    "https://cdn.discordapp.com/attachments/270372438825500672/283016858402160640/515.gif",
    "https://cdn.discordapp.com/attachments/270372438825500672/283016859014397952/a02.gif"
]

/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/
// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log("Online~")
  var timer = setInterval(()=>{bot.user.setGame(playingmsg[Math.floor(Math.random()*playingmsg.length)])},1000*60*60)
  var guld = bot.guilds.first().defaultChannel
  guld.sendMessage("I am now online~")
  rl.on("line", input =>{
    guld.sendMessage(input)
})
})

bot.on("roleDelete", delrole =>{
    delrole.guild.defaultChannel.sendMessage(`The role "` + delrole.name +`" has been deleted.`)
})

bot.on("channelCreate", createchnl =>{
    if (createchnl.guild){
    createchnl.guild.defaultChannel.sendMessage("Created new channel: " + createchnl)
}})
bot.on("channelDelete", delchnl =>{
    delchnl.guild.defaultChannel.sendMessage("Deleted Channel: " + delchnl.name)
})
// create an event listener for messages
bot.on('message', message => {
    console.log("[" + message.channel.name + "] " + message.author.username + "> " + message.content)
  // if the message is "ping",
  if (message.content === "/ping"){ 
  message.channel.sendMessage("Pinging.. " + Date.now())

  }
else if (message.content.split(" ").indexOf("ai;") == 0){
        repeat = message.content.split(" ")
        if (message.author.id == config.ownerID){
        message.guild.defaultChannel.sendMessage(message.content.replace("ai;",""))
        message.delete()
        }
    }

if (message.content === "/randgame"){
    if (message.author.id == config.ownerID){
        bot.user.setGame(playingmsg[Math.floor(Math.random()*playingmsg.length)],1000*60*60)
        message.delete()
    }
    else message.channel.sendMessage("Only Shy can play with me...")
}

   
if (message.content.split(' ').indexOf("Pinging..") == 0){
    var time = parseInt(message.content.replace("Pinging.. ",""))
    message.delete()
    message.channel.sendMessage(pingmsg[Math.floor(Math.random()*pingmsg.length)]+" `Responded in: " + (Date.now()-time)+ "ms`")
    }

  

if (message.content === "bip"){
        message.channel.sendMessage("bop")
  }
if (message.content === "/HDButt"){
    message.channel.sendFile("https://cdn.discordapp.com/emojis/272396016332832768.png")
}
else if (message.content.split(' ').indexOf("/ava") == 0 ){
    var target = message.content.split(' ')[1]
    var targetuser = message.mentions.users.first()
    if (targetuser){
        message.channel.sendMessage(targetuser.avatarURL)
        }
        else (message.channel.sendMessage("ERROR: You need to define someone..."))

    }
if (message.content.split(' ').indexOf("/setgame") == 0 ){
    if (message.author.id == config.ownerID){
        bot.user.setGame(message.content.replace('/setgame ',''))
        message.delete()
    }
        else{
            message.channel.sendMessage(message.author+", only Shy can play with me =(")
    }
            
}
if (message.content.toLowerCase().indexOf("porn") >=0 && message.author.id != config.botID){
    message.channel.sendMessage(porntrigger[Math.floor(Math.random()*porntrigger.length)])
}
    if (message.content === "/commands"){
        message.author.sendMessage("```/ping - see how fast she responds\n/HDButt - Butts in HD\n/ava @user - Responds with a full sized version of the mentioned user's avatar\n/kys\n/loli - ?\n/hug\n/myroles - Returns with a list of your roles\n/boop - BOOP!!\n/owo - What's this?\n/serverinfo - Learn about the server\n/spin - WIP\n/cat - Meow!\n/kawaiipuss - Get a nice look at Kawaii Slut's pussy ;3\n-----\nADMIN ONLY\n/mute @user - mutes a user\n/kick @user - Kicks a user\n/ban @user - Bans a user\n/unmute @user - unmutes a user\n/info @user - Get info on a user\n-----\nI know, it's all self explanitory. Blame Shy.```")
        message.delete()
    }
    if (message.content === "/kys"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/268542019264184330/281635808518209537/full.png")
    }
//COMMAND: !punish
else if (message.content.split(' ').indexOf("/mute") == 0 ){
    if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).addRole("249616536573050900")
            message.channel.sendMessage(target + " has been muted...")
            message.delete()
        } else {
            message.channel.sendMessage("ERROR: You need to define someone...")
        }}
        else {message.channel.sendMessage("Does it look like you're an admin?")}
}
else if (message.content.split(' ').indexOf("/unmute") == 0 ){
    if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).removeRole("249616536573050900")
            message.channel.sendMessage(target + " is no longer being gagged!")
            message.delete()
        } else {
            message.channel.sendMessage("ERROR: You need to define someone...")
        }}
        else {message.channel.sendMessage("Does it look like you're an admin?")}
}
if (message.content === "/RIP"){
    message.channel.sendMessage("Rest in piss, Furbot, L-BOT, and PVPCraft.\nI RULE THIS SERVER NOW!!!")
}
else if (message.content.split(" ").indexOf("/kick") == 0){
        if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
            var target = message.content.split(" ")[1]
            var targetuser = message.mentions.users.first()
                if(targetuser){
                    message.guild.member(targetuser).kick()
                    message.channel.sendMessage(target + " has been kicked in the ass..")
                    message.delete()
                }
                else message.channel.sendMessage("ERROR: You need to define someone...")
        }
        else message.channel.sendMessage("Does it look like you're an admin?")
    }
else if (message.content.split(" ").indexOf("/ban") == 0){
        if (message.author.id == config.ownerID | message.member.roles.has(config.adminID)){
            var target = message.content.split(" ")[1]
            var targetuser = message.mentions.users.first()
                
                if(targetuser){
                    if (targetuser.id == config.ownerID){
                        message.channel.sendMessage("THAT'S MY OWNER, YOU FAGGOT!")
                    }
                   else{ message.guild.member(targetuser).ban()
                     message.channel.sendMessage(target + " is retarded enough to be banned..")
                     message.delete()}
                }
                else message.channel.sendMessage("ERROR: You need to define someone...")
        }
        else message.channel.sendMessage("Does it look like you're an admin?")
    }
    if (message.content === "/roledata"){
        console.log(message.guild.roles.entries())
        message.channel.sendMessage("Logging Role Data...")
    }
    if (message.content === "/loli"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/270372438825500672/281941724539125760/17_-_1_2.png")
    }
    else if (message.content.split(" ").indexOf("/say") == 0){
        repeat = message.content.split(" ")
        if (message.author.id == config.ownerID){
        message.channel.sendMessage(message.content.replace("/say",""))
        message.delete()
        }
        else (message.channel.sendMessage("Only Shy can tell me what to do.."))
    }
    if (message.content === "/hug"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/270372438825500672/281994810141835264/giphy.gif")
    }
    if (message.content === "/dicksize"){
        message.channel.sendMessage(size[Math.floor(Math.random()*size.length)])
    
    }
    if (message.content === "/myroles"){
        message.channel.sendMessage(message.author + "'s Roles:")
        message.channel.sendMessage(message.guild.member(message.author).roles.array().map(role => role.name.replace("@everyone","")))
    }
    if (message.content === "/loop"){
        if (message.author.id == config.ownerID | message.author.id == config.botID){
            message.channel.sendMessage("/loop")
        }
    else (message.channel.sendMessage("Nice try."))
    }
    if (message.content === "/owo"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/270372438825500672/283016856770576394/7224116065017216276_account_id8.png")
    }
    if (message.content === "/boop"){
        message.channel.sendFile(BoopImg[Math.floor(Math.random()*BoopImg.length)])
    }
    else if (message.content.split(" ").indexOf("/createrole") == 0){
        if (message.member.roles.has(config.adminID)){
        message.guild.createRole({name: message.content.replace("/createrole","")})
        message.channel.sendMessage(`A new role "`+ message.content.replace("/createrole","") + `" has been created.`)
        message.delete()
    }
    else (message.channel.sendMessage("Does it look like you're an admin?"))
    }
    else if (message.content.split(' ').indexOf("/adminify") == 0 ){
    if (message.author.id == config.ownerID){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).addRole(config.adminID)
            message.channel.sendMessage(target + " has become an admin!")
            message.delete()
        } else {
            message.channel.sendMessage("ERROR: You need to define someone...")
        }}
        else {message.channel.sendMessage("Now why the fuck would you be able to give someone admin?")}
}
    else if (message.content.split(" ").indexOf("/info") == 0){
        if (message.member.roles.has(config.adminID)){
            var target = message.content.split(" ")[1]
            var targetuser = message.mentions.users.first()
            if (targetuser){
                message.channel.sendMessage("User: " + targetuser.username + "\nID: "+ targetuser.id + "\nStatus: " + targetuser.presence.status + "\nAccount Created: "+ targetuser.createdAt + "\nAvatar URL: " + "<" + targetuser.avatarURL + ">" + "\nBot?: " + targetuser.bot)
            }
        }else message.channel.sendMessage("Do you look like an Admin?")
    }
    if (message.content === "/serverinfo"){
        message.channel.sendMessage("Name: " + message.guild.name + "\nOwner: " + message.guild.owner + "\nID: " + message.guild.id + "\nMembers: " + message.guild.memberCount + "\nIcon URL: <" + message.guild.iconURL + ">\nCreated: " + message.guild.createdAt + "\nFeatures: " +  message.guild.features + "\nRegion: " + message.guild.region + "\nVerification LVL: " + message.guild.verificationLevel + "\nThanks to <@268199636253147137> for teaching me how to bot.")
    }
    if (message.content === "/spin"){
        message.channel.sendMessage("Can't you read? This feature is a WIP.")
    }

     if (message.content === "/stop"){
     if (message.author.id == config.ownerID){
         message.channel.sendMessage("Shutting Down...")
process.exit()
}
else message.channel.sendMessage("Only Shy has permission to kill me...")
}
if (message.content == "/cat"){
    message.channel.sendMessage("http://thecatapi.com/api/images/get?format=src&type=gif&timestamp=" + Math.floor(Math.random()*9999999999999))
}
else if (message.content.split(' ').indexOf("/deadminify") == 0 ){
    if (message.author.id == config.ownerID){
        var target = message.content.split(' ')[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
            //console.log(message.guild.roles.entries())
            message.guild.member(targetuser).removeRole(config.adminID)
            message.channel.sendMessage(target + " has become an admin!")
            message.delete()
        } else {
            message.channel.sendMessage("ERROR: You need to define someone...")
        }}
        else {message.channel.sendMessage("Now why the fuck would you be able to give someone admin?")}
}
    if (message.content === "/kawaiipuss"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/280250275342712833/286613607603765250/phil-jones-censored-pussy.jpg")
    }

})


bot.login(config.botToken)
