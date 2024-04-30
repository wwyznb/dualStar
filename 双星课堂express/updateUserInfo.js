//导入 express 包
const express = require('express')
//导入 Users 文件
const UserModel = require('./db/Users')
//导入 mongoose 包
const mongoose = require('mongoose')
//导入 db 文件
const db = require('./db/db')

const router = express.Router()

router.post('/updateUserInfo',(req,res) =>{
    db(()=>{
        UserModel.updateOne({ uId : req.body.uId},{ uName : req.body.userName,
            gender : req.body.userGender,
            labels : req.body.userLabels
        }).then(doc => {
            UserModel.findOne({uId : req.body.uId}).then(doc => {
                res.json(doc)
                mongoose.disconnect()
            })
        })
    },()=>{
        console.log('连接失败');
        mongoose.disconnect()
    })
})

module.exports = router