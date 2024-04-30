//导入 express 包
const express = require('express')
//导入 body-parser 包
const bodyParser = require('body-parser')
//导入 db 文件
const db = require('./db/db')
//导入 Videos 文件
const VideosModel = require('./db/Videos')
//导入 mongoose 
const mongoose = require('mongoose')
//导入 uuid 包
const { v4: uuidv4 } = require('uuid');

const router = express.Router()

router.post('/uploadVideos',(req,res) => {
    db(
        ()=>{
            const uuid = uuidv4()
            console.log('连接成功');
            VideosModel.create({
                vId: uuid,
                vSeries: [],
                vImage: 'http://localhost:8080/wwy/zanwu.png',
                vLabels: req.body.vLabels,
            }).then(doc => {
                res.json(doc)
            })
    },()=>{
        console.log('连接失败');
        mongoose.disconnect()
    })
})

module.exports = router;