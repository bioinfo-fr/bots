const irc = require('irc')
const config = require('./config.json')

let bot = new irc.Client(config['server'], config['botName'], {
    channels: config.channels
})

bot.addListener('join', (channel, who) => {
    // Welcome them in !
    console.log(`${who} entered ${channel}`)
    bot.say("Welcome !")
})

bot.say("Hello, I am in !")