﻿const Discord = require('discord.js')
const config = require('./config.js')
const bot = new Discord.Client()
const readline = require("readline")
const booru = require("booru")
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
var commands = [
    {"name":"/ping" , "result":"See how fast she responds."},
    {"name":"/HDButt" , "result":"Butts in HD ;3"},
    {"name":"/ava @user" , "result":"Displays a user's avatar"},
    {"name":"/kys" , "result":"Find a portal to a magical land~"},
    {"name":"/loli" , "result":"I swear it's a loli!"},
    {"name":"/hug" , "result":"Give everyone a big ol' hug"},
    {"name":"/myroles" , "result":"Displays your roles for everyone to see."},
    {"name":"/roles @user" , "result":"Displays a user's roles."},
    {"name":"/boop" , "result":"BOOP!!"},
    {"name":"/owo" , "result":"What's this? owo"},
    {"name":"/spin" , "result":"It'll be done soon™"},
    {"name":"/cat" , "result":"Meow~"},
    {"name":"/kawaiipuss" , "result":"See some sexy pussy"},
    {"name":"/yt <query>" , "result":"Search youtube for a video"},
    {"name":"/r34 <Tags> (Number)" , "result":"Search R34 for some porn. Leaving the tags blank will yield random results"},
    {"name":"/r34top <Tags> (Number)" , "result": "Search R34 for the top scored porn."},
    {"name":"/gudbat" , "result":"Good bat~"},
    {"name":"/loodbat" , "result":"Lewd Bat."},
    {"name":"/sendnoods" , "result":"You heard the pony, send em"},
    {"name":"/nickname" , "result":"set your nickname. (Made for mobile, usable by pc.)"}

]
var admincmds = [
    {"name":"/mute @user" , "result":"Mutes a user as punishment"},
    {"name":"/unmute @user" , "result":"Unmutes a user"},
    {"name":"/kick @user" , "result":"Kicks a user from the server"},
    {"name":"/ban @user" , "result":"Bans a user from the server. Talk to Shy about unbanning."},
    {"name":"/info @user" , "result":"Displays information about a user. Useful for seeing when accounts were made."}
]
var dev = false
var YouTube = require('youtube-node')
  var youTube = new YouTube()
  function evalBooruCmd(input){
    //cleanup
    input = input.replace(/,/g , " ") // replace commas with space (incase someone does tag,tag)
    input = input.replace(/\s+/g, ' ')//replace excess whitespace ("tag  tag" -> "tag tag")
    input = input.trim() //remove trailing whitespace ("tag tag " -> "tag tag")
    
    var values = input.split(" ")
    var tags
    var integerFound = false
    for(n in values){
        if(parseInt(values[n])){
            //integer found.
            tags = values.splice(0,n)
            //values now has the integer tags has the tags
            integerFound = true //yep we found a integer
        }
    }
    
    var number
    if (integerFound){
        number = parseInt(values[0])
    } else{
        number = 1
        tags = values //didnt find a integer so "values" only contains tags
    }
    return {"tags": tags, "number":number}
}
    function constrain(minimum, maximum, value){
    if(value > maximum) value = maximum
    if(value < minimum) value = minimum
    return value
}

    //sorting stuff
function predicatBy(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

/**
 * Sorts the Booru results highest rating first and returns n results
 * @param {JSON} data json data to sort, use image
 * @param {number} num number of results to get 
 */
function sortBooru(data, num){
    var common = []
    for (image of data) { common.push(image.common) }
    //for (image of data) { console.log(image.common) }
    common.sort(predicatBy("score")).reverse()
    //console.log("commonyfied data: ")
    //for (image of common){console.log(image.score)}
    if (common.length>num){
        var ret = []
        for (var n = 0; n <num; n++){
            ret.push(common[n])
        }
    return ret
    }
    return common
}
/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/
// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log("Online~")
  var timer = setInterval(()=>{bot.user.setGame(playingmsg[Math.floor(Math.random()*playingmsg.length)])},1000*60*60)
  var guld = bot.guilds.first().defaultChannel

  youTube.setKey(config.ytKey)
  if (dev == true){
      guld.sendMessage("Dev Build (1.6.0.8)")
  }
  else{
      guld.sendMessage("I am now online~")
    }
  rl.on("line", input =>{
    guld.sendMessage(input)
})
})


bot.on("roleDelete", delrole =>{
    if (delrole.guild){
    delrole.guild.defaultChannel.sendMessage(`The role "` + delrole.name +`" has been deleted.`)
    }
})

bot.on("channelCreate", createchnl =>{
    if (createchnl.guild){
    createchnl.guild.defaultChannel.sendMessage("Created new channel: " + createchnl)
}})
bot.on("channelDelete", delchnl =>{
if (delchnl.guild){
    delchnl.guild.defaultChannel.sendMessage("Deleted Channel: " + delchnl.name)
}
})
// create an event listener for messages
bot.on('message', message => {
    console.log("[" + message.channel.name + "] " + message.author.username + "> " + message.content)
  // if the message is "ping",
   if (message.guild){
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
if (message.content.toLowerCase().indexOf("porn.") >=0 && message.author.id != config.botID){
    message.channel.sendMessage(porntrigger[Math.floor(Math.random()*porntrigger.length)])
}
    if (message.content === "/commands"){
        var data = new Discord.RichEmbed()
            data.setColor("#191970")
            data.setTitle("COMMANDS")
            for(command of commands){
                data.addField(command.name , command.result)
            }
            message.author.sendEmbed(data)
        message.delete()
        if (message.member.roles.has(config.adminID)){
            var data = new Discord.RichEmbed()
              data.setColor("#FF0000")
            data.setTitle("ADMIN COMMANDS")
            for(command of admincmds){
                data.addField(command.name , command.result)
            }
            message.author.sendEmbed(data)
        }
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
        message.channel.sendMessage("Name: " + message.guild.name + "\nOwner: " + message.guild.owner + "\nID: " + message.guild.id + "\nMembers: " + message.guild.memberCount + "\nIcon URL: <" + message.guild.iconURL + ">\nCreated: " + message.guild.createdAt + "\nFeatures: " +  message.guild.features + "\nRegion: " + message.guild.region + "\nVerification LVL: " + message.guild.verificationLevel + "\nThanks to GeneralUltra758 for teaching me how to bot.")
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
            message.channel.sendMessage(target + " is no longer admin...")
            message.delete()
        } else {
            message.channel.sendMessage("ERROR: You need to define someone...")
        }}
        else {message.channel.sendMessage("Now why the fuck would you be able to give someone admin?")}
}
    if (message.content === "/kawaiipuss"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/280250275342712833/286613607603765250/phil-jones-censored-pussy.jpg")
    }
if (message.content.split(" ").indexOf("/yt") == 0){
    youTube.search(message.content.replace("/yt",""), 10, function(error, result){
        if (result){
            var video = result
            if (video.items[0]){
            message.channel.sendMessage("https://www.youtube.com/watch?v=" + video.items[0].id.videoId)
        }
        else message.channel.sendMessage("ERROR: Nothing was found...")
        }
        else {
           message.channel.sendMessage(error)
        }
        
    })
}
    if (message.content === "https://www.youtube.com/watch?v=undefined"){
        if (message.author.id == config.botID){
            message.channel.sendMessage("ERROR: It appears the first result was not a video. Refine your search.")
            message.delete()
        }
    }
    if (message.content.split(" ").indexOf("/r34top") == 0){
               var cmd = message.content.replace("/r34","")
        var eval = evalBooruCmd(cmd)
        booru.search("r34", eval.tags, {limit: 100, random: true})
        .then(booru.commonfy)
        .then(images => {
            var sorted = sortBooru(images,constrain(1,20,eval.number))
            for(let image of sorted){
            message.channel.sendMessage(`\`Rating: ${image.rating}\` \n\`Score: ${image.score}\` \n${image.file_url}`)
            }
        })
    }
    if (message.content.split(" ").indexOf("/r34") == 0){
        var cmd = message.content.replace("/r34","")
    var eval = evalBooruCmd(cmd)
    booru.search("r34", eval.tags, {limit: constrain(1,20,eval.number), random: true})
    .then(booru.commonfy)
    .then(images => {
        for (let image of images){
            message.channel.sendMessage(`\`Rating: ${image.rating}\` \n\`Score: ${image.score}\` \nhttps:${image.file_url}`)
        }
    })
    }   
    if (message.content.split(" ").indexOf("/roles") == 0){
        var target = message.content.split(" ")[1]
        var targetuser = message.mentions.users.first()
        if (targetuser){
        message.channel.sendMessage(targetuser + "'s Roles:")
        message.channel.sendMessage(message.guild.member(targetuser).roles.array().map(role => role.name.replace("@everyone","")))
    }
    else message.channel.sendMessage("ERROR: You need to define someone...")
}
    if (message.content === "/sendnoods"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/270372438825500672/292342878737399809/26bf6ac5b31209915df332272bee1cb890f12c7617850b5b3acd45d68dba7ee9_1.jpg")
    }
    if (message.content === "/loodbat"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/270372438825500672/292342957107970049/503.png")
    }
    if (message.content === "/gudbat"){
        message.channel.sendFile("https://cdn.discordapp.com/attachments/270372438825500672/292342957741178880/thumb.png")
    }
    if (message.content.split(" ").indexOf("/nickname") == 0){
        message.guild.member(message.author).setNickname(message.content.replace("/nickname" , ""))
        message.channel.sendMessage(message.author.username + ", your name has been set")
    }
}
})


bot.login(config.botToken)
