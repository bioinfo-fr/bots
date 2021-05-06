const irc = require('irc')
const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('irc.db', (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Connected to the in-memory SQlite database.')
})

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, \
            nick TEXT NOT NULL, \
            content TEXT NOT NULL, \
            timestamp INTEGER)'
    )
})

let verbose = false
let sleeping = false

const config = require('./config.json')
const lang = config.lang

function help(to) {
    if (lang == 'fr') {
        bot.say(to, 'F*cking MS excel IRC Bot aide : ')
        bot.say(to, '  !sleep (⚜) - met en pause excel, qui ne se réveillera qu\' à la commande !wakeup')
        bot.say(to, '  !wakeup (⚜) - réveille excel')
        bot.say(to, '  !help - affiche l\'aide des commandes d\'excel')
        bot.say(to, '  !didusee <pseudo> - affiche la dernière fois où <pseudo> a quitté le chan')
        bot.say(to, '  !last <pseudo> - redit le dernier message envoyé par <pseudo>')
        bot.say(to, '  !article [ <query> ] [ -n <number> ] - renvoit 5 url et les résumés des articles correspondant à la requête <query> si elle est spécifiée, le paramètre optionnel -n permet de préciser le nombre d\'article à retourner')
        bot.say(to, '  !ideas - ensemble de commande pour gérer les idées de nouvel article')
        bot.say(to, '      !ideas list - retourne la liste des idées')
        bot.say(to, '      !ideas add <description> - ajoute une nouvelle idée d\'article avec la <description> spécifiée')
        bot.say(to, '      !ideas rm <id> (⚜) - retire l\'idée associée avec l\'<id> spécifiée')
        bot.say(to, '  !pubmed [ <query> ] [ -n <number> ] - retourne l`url et l\'abstract de <number> articles depuis pubmed (5 par défaut)')
    } else {
        bot.say(to, 'F*cking MS excel IRC Bot help : ')
        bot.say(to, '  !sleep (⚜) - pause excel bot, set to listen only to !wakeup')
        bot.say(to, '  !wakeup (⚜) - set excel bot to listen to all other commands')
        bot.say(to, '  !help - display bot command help')
        bot.say(to, '  !didusee <pseudo> - say when bot saw <pseudo> in this channel for the last time')
        bot.say(to, '  !last <pseudo> - say last message said by <pseudo> again')
        bot.say(to, '  !article [ <query> ] [ -n <number> ] - retrieve article urls and summary from bioinfo-fr.net corresponding to the specified query if any, or last published article(s) if no query is specified')
        bot.say(to, '  !ideas - set of commands related to new articles ideas for the blog')
        bot.say(to, '      !ideas list - show all future article ideas')
        bot.say(to, '      !ideas add <description> - add a new article idea with with specified <description>')
        bot.say(to, '      !ideas rm <id> - remove idea with specified id')
        bot.say(to, '  !pubmed [ <query> ] [ -n <number> ] - retrieve url and abstract of <number> (5 by default) recent articles from pubmed')

    }
}

function addToDb(nick, text) {
    let now = Date.now()
    db.run('INSERT INTO messages (nick, content, timestamp) VALUES (?, ?, ?)', [nick, text, now], function (err) {
        if (err) {
            return console.log(err.message)
        }
        console.log(`New message entered in database : ${nick}: ${text} (${this.lastID})`)
    })
}

function wait(seconds) {
    let now = Date.now()
    let end = now + seconds * 1000
    while (now < end) {
        now = Date.now()
    }
}

let bot = new irc.Client(config['server'], config['botName'], {
    channels: config.channels
})

bot.addListener('join', (channel, who) => {
    if (who != config.botName) {
        // Welcome them in !
        console.log(`${who} entered ${channel}`)
        bot.say(channel, `Bienvenue ${who} !`)
    }
})

bot.addListener('message', (nick, to, text, message) => {
    addToDb(nick, text)
    if (text.includes('!help')) {
        help(to)
    } else if (text.includes('!sleep')) {
        if (!sleeping) {
            bot.say(to, "ZZzzzzz...")
            sleeping = true
        } else {
            bot.say(to, "Chut, je dors !")
        }
    } else if (text.includes('!wakeup')) {
        if (sleeping) {
            sleeping = false
            bot.say(to, "Oh, ça va j'me lève !")
            wait(Math.random() * 10)
            bot.say(to, "C'est bon, Windaube a enfin réussi à se sortir de veille...")
        }
    } else if (text.includes('!last')) {
        if (sleeping) {
            bot.say("ZZzzzzz...")
        } else {
            pseudo = text.replace('!last', '')
            // last(pseudo)
            bot.say(to, 'Hey, mais patiente un peu, ma fonction de recherche d\'article n\' pas encore implémentée !')
        }
    } else if (text.includes('!wiki')) {
        if (sleeping) {
            bot.say("ZZZzzzzz...")
        } else {
            query = text.replace('!wiki')
            // wiki(query)
            bot.say(to, 'Hey, mais patiente un peu, ma fonction de recherche d\'article n\' pas encore implémentée !')
        }
    } else if (text.includes('!article')) {
        if (sleeping) {
            bot.say("ZZZZZzzzzzzzzz...")
        } else {
            query = text.replace('!article', '')
            console.log(query)
            bot.say(to, 'Hey, mais patiente un peu, ma fonction de recherche d\'article n\' pas encore implémentée !')
        }
    }
})