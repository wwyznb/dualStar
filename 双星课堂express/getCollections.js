//导入express包
const express = require('express')
//导入db.js
const db = require('./db/db')
//导入Collections包
const CollectionsModel = require('./db/Collections')
//导入 mongoose包
const mongoose = require('mongoose')
//导入 Videos 包
const VideosModel = require('./db/Videos')

const router = express.Router()

router.post('/getCollections',(req,res) => {
    db(()=>{
        CollectionsModel.find({uId: req.body.uId}).then(doc => {
            let list = []
            for(let i in doc){
                list.push(doc[i].vId)
            }
            VideosModel.find({_id:{$in: list}}).then(doc => {
                res.json(doc)
                mongoose.disconnect()
            })
        })
    },
    ()=>{
        console.log('连接失败')
        mongoose.disconnect()
    })
})


module.exports = router