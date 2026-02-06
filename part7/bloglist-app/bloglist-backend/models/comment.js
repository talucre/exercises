const mongoose = require('mongoose')

const schema = mongoose.Schema({
    body: String,
    blog: { type: mongoose.Types.ObjectId, ref: 'Blog' },
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Comment', schema)
