//导入express包
const express = require('express')
//导入db.js
const db = require('./db/db')
//导入Collections包
const CollectionsModel = require('./db/Collections')
const mongoose = require('mongoose')

const router = express.Router()

router.post('/uploadCollections',(req,res) => {
    db(()=>{
        CollectionsModel.findOne({uId: req.body.uId, vId: req.body.vId}).then(doc => {
            if(doc){
                res.json({isCollected: true})
                mongoose.disconnect()
                return;
            }
            CollectionsModel.create({
                uId: req.body.uId,
                vId: req.body.vId
            }).then(() => {
                res.json({success: true})
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