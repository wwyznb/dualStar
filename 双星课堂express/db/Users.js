const mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    uId: {
        type : String,
        required : true,
        unique : true
    },
    uName: {
        type : String,
        required : true
    },
    gender: {
        type : String,
        required : true,
        enum : ['male','female'],
        default : 'male'
    },
    phoneNumber : {
        type : Number,
        unique : true,
        default: null
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    img_url : {
        type : String,
        required : true,
        default : 'http://localhost:8080/wwy/kenan.jpg'
    },
    labels : {
        type : Array
    },
    register_date : Date,
    initialization : {
        type : Boolean,
        default : false
    }
})

const UserModel = new mongoose.model('users',UserSchema)

module.exports = UserModel