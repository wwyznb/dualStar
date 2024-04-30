const mongoose = require('mongoose')
let SettingSchema = new mongoose.Schema({
    uId: {
        type: String,
        unique: true,
        required: true
    },
    navPosition: {
        type: String,
        default: '左侧'
    },
    navFont: {
        type: Number,
        default: 13
    },
    activeBColor: {
        type: String,
        default: '#353535cc'
    },
    navColor: {
        type: String,
        default: '#c5c4c4'
    },
    navBColor: {
        type: String,
        default: '#353535cc'
    },
    webBColor: {
        type: String,
        default: '#ffffff'
    },
    webBImage: {
        type: String,
    },
    showAreaBcolor: {
        type: String,
        default: 'transparent'
    },
    showAreaBImage: {
        type: String,
    }
})

const SettingModel = new mongoose.model('settings',SettingSchema)

module.exports = SettingModel