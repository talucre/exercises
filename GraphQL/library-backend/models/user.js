const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minLength: 3,
    },
    favouriteGenre: {
        type: String,
        require: true,
        minlength: 3,
    },
})

module.exports = mongoose.model('User', schema)
