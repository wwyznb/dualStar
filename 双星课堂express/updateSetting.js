//导入 express 包
const express = require('express')
//导入 Setting 文件
const SettingModel = require('./db/Settings')
//导入 Users 文件
const UserModel = require('./db/Users')
//导入 mongoose 包
const mongoose = require('mongoose')
//导入 db 文件
const db = require('./db/db')
const router = express.Router() 


router.post('/updateSetting',(req,res) => {
    db(()=>{
        SettingModel.findOne({uId: req.body.uId}).then(doc => {
            if(!doc){
                SettingModel.create({
                    uId : req.body.uId,
                    navPosition: req.body.navPosition,
                    navFont: req.body.navFont,
                    activeBColor: req.body.activeBColor,
                    navColor: req.body.navColor,
                    navBColor: req.body.navBColor,
                    webBColor: req.body.webBColor,
                    webBImage:req.body.webBImage,
                    showAreaBcolor:req.body.showAreaBcolor,
                    showAreaBImage: req.body.showAreaBImage,
                }).then(doc => {
                    res.json(doc)
                    mongoose.disconnect()
                })
            }else{
                SettingModel.updateOne({uId: req.body.uId},
                    {
                        navPosition: req.body.navPosition,
                        navFont: req.body.navFont,
                        activeBColor: req.body.activeBColor,
                        navColor: req.body.navColor,
                        navBColor: req.body.navBColor,
                        webBColor: req.body.webBColor,
                        showAreaBcolor:req.body.showAreaBcolor,
                        showAreaBImage: req.body.showAreaBImage,
                    }).then(doc => {
                        SettingModel.findOne({uId: req.body.uId},{uId: 0}).then(doc => {
                            res.json(doc)
                            mongoose.disconnect()
                        })
                    })
            }
        },error => {
            console.log('连接失败');
            mongoose.disconnect()
        })
    },() => {

    })
})

module.exports = router