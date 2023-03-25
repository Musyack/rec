

const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')
const cors = require('cors')
const bot = require('./bot')
const Post = require("./Post");




const PORT = 4000
const DB_URL = `mongodb+srv://root:qwerty123@cluster0.xf6aocj.mongodb.net/?retryWrites=true&w=majority`



const botOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: 'fdfdfdf'}, {text: '2', callback_data: 'fdfdfdf'}]


        ]
    })
}

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

const start = async () => {


    try {
        const conn = await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log(`started on ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }

    // bot.setMyCommands([
    //     {command: '/start', description: 'Начальное приветствие'},
    //     {command: '/info', description: 'Получить информацию о пользователе'},
    //     {command: '/game', description: 'Игра угадай цифру'},
    // ])

    bot.on('message', async msg => {
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, '2', botOptions);

    })
}

start()


