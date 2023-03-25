
const TelegramApi = require("node-telegram-bot-api");
const token = ''
const bot = new TelegramApi(token, {polling: true})

module.exports = bot