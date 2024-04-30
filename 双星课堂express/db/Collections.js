const mongoose = require('mongoose')

let CollectionsSchema = mongoose.Schema({
    uId:{
        type: String,
        require: true
    },
    vId:{
        type: String,
        require: true
    }
})

const CollectionsModel = new mongoose.model('collections',CollectionsSchema)

module.exports = CollectionsModel