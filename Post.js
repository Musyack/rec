const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    id: {type: Number, required: true},
    status: {type: String, required: true}

})

module.exports = mongoose.model('Post', Post)