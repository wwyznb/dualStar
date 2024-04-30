const mongoose = require('mongoose')
let VideosSchema = new mongoose.Schema({
    vId:{
        type: String,
        required: true
    },
    vSeries:{
        type: Array,
        required: true
    },
    vImage:{
        type: String,
        required: true,
        default: 'http://localhost:8080/wwy/zanwu.png'
    },
    vLabels:{
        type: Array,
        required: true
    },
    vName:{
        type: String,
        required: true,
        default: '暂无名称'
    },
    vLike:{
        type: Number,
        default: 0
    },
    vBlurb:{
        type: String,
        default: '暂无简介'
    }
})

const VideosModel = new mongoose.model('videos',VideosSchema)

module.exports = VideosModel