const irc = require('irc')
const sqlite3 = require('sqlite3')
const config = require('./config.json')

function help(channel) {
    bot.say(channel, 'F*cking MS excel IRC Bot help : ')
    bot.say(channel, '  !sleep (⚜) - pause excel bot, set to listen only to !wakeup')
    bot.say(channel, '  !wakeup (⚜) - set excel bot to listen to all other commands')
    bot.say(channel, '  !help - display bot command help')
    bot.say(channel, '  !didusee <pseudo> - say when bot saw <pseudo> in this channel for the last time')
    bot.say(channel, '  !last <pseudo> - say last message said by <pseudo> again')
    bot.say(channel, '  !article [ <query> ] [ -n <number> ] - retrieve article urls and summary from bioinfo-fr.net corresponding to the specified query if any, or last published article(s) if no query is specified')
    bot.say(channel, '  !ideas - set of commande related to new articles ideas for the blog')
    bot.say(channel, '      !ideas list - show all future article ideas')
    bot.say(channel, '      !ideas add <description> - add a new article idea with with specified <description>')
    bot.say(channel, '      !ideas rm <id> - remove idea with specified id')
    bot.say(channel, '  !pubmed [ <query> ] [ -n <number> ] - retrieve url and abstract of <number> (5 by default) recent articles from pubmed')
}

let bot = new irc.Client(config['server'], config['botName'], {
    channels: config.channels,
    autoConnect: false
})
bot.connect(1, function () {
    for (channel of config.channels) {
        console.log(channel)
        bot.say("Hello, I am in !")
    }    
})

bot.addListener('join', (channel, who) => {
    // Welcome them in !
    console.log(`${who} entered ${channel}`)
    bot.say(channel, `Welcome ${who} !`)
})

bot.addListener('message', (nick, to, text, message) => {
    if (text.includes('!article')) {
        query = text.replace('!article', '')
        console.log(query)
        bot.say(to, 'Hey, mais patiente un peu, ma fonction de recherche d\'article n\' pas encore implémentée !')
    } else if (text.includes('!help')) {
        help(to)
    }
    //  else if (text.includes('!sleep')) {

    // } else if (text.includes('!wakeup')) {

    // } else if (text.includes('!article')) {
    //     query = text.replace('!article', '')
    //     article(query)
    // } else if (text.includes('!last')) {
    //     pseudo = text.replace('!last', '')
    //     last(pseudo)
    // } else if (text.includes('wiki')) {

    // }
})

