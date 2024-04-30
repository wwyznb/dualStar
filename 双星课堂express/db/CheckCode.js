const mongoose = require('mongoose')

let CheckCodeSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    code : {
        type : String
    }
})

const CheckCodeModel = mongoose.model('checkcodes',CheckCodeSchema)

module.exports = CheckCodeModel