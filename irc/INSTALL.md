# IRC Bot installation
Installation process either for development or production.
This example focuses on Debian-based GNU/Linux distros.

## Install nvm, nodejs and npm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```
Exit current terminal session and reconnect to access to nvm tool.
```bash
nvm install v14.16.1 # Install current LTS nodejs version
sudo apt install npm
```

## Clone Bioinfo-fr's git repository

```bash
git clone https://github.com/bioinfo-fr/bots.git
```

## Process for new bot creation

### Initialize npm package

```bash
mkdir bot
cd bot
npm init
```
(Don't forget to specify the right GPL license)
### Install irc packages

```bash
npm install --save irc
```
## Process for environnment setup for existing bot

```bash
cd bot-directory
npm install
```
```bash
cp config.dist.json config.json
```
Change the bot name accurately (bot-devel for instance).

## Start the bot

You should add an entry under scripts section in `package.json` to have the `npm start` command.

```json
[...]
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
},
[...]
```

## Ressource
[irc nodejs docs](https://node-irc.readthedocs.io/)
