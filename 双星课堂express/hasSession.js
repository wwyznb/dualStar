//导入 express
const express = require('express')
//导入 db 包
const db = require('./db/db')
//导入 Users 包
const UserModel = require('./db/Users')
const mongoose = require('mongoose')

const router = express.Router()

router.post('/hasSession',(req,res) =>{
    console.log(req.session);
    if(req.session.uId){
        db(()=>{
            UserModel.findOne({uId: req.session.uId}).then(doc => {
                res.json(doc)
                mongoose.disconnect()
            })
        },()=>{
            console.log('连接失败');
            mongoose.disconnect()
        })
    }
})

module.exports = router;