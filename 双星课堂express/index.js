//导入 express 包
const express = require('express')
//导入 sendMessage.js
const sendEmailRouter = require('./sendEmail')
//导入 getUserInfo.js
const getUserInfoRouter = require('./getUserInfo')
//导入 updateUserInfo.js
const updataUserInfo = require('./updateUserInfo')
//导入 uploadImgUrl
const uploadImgUrl = require('./uploadImgUrl')
//导入 hasSession
const hasSession = require('./hasSession')
//导入 updateSetting
const updateSetting = require('./updateSetting')
//导入 getVideos
const getVideo = require('./getVideos')
//导入 uploadVideos
const uploadVideos = require('./uploadVideos')
//导入 uploadCollections
const uploadCollections = require('./uploadCollections')
//导入 getCollections
const getCollections = require('./getCollections')
//导入 delCollections
const delCollections = require('./delCollections')
//导入 exitLogin
const exitLogin = require('./exitLogin')
//导入 uploadBImgUrl
const uploadBImgUrl = require('./uploadBImgUrl')
//导入 cors
const cors = require('cors')

//创建应用对象
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/imgs'))
app.use(express.static(__dirname + '/videos'))
app.use(getUserInfoRouter)
app.use(sendEmailRouter)
app.use(updataUserInfo)
app.use(uploadImgUrl)
app.use(updateSetting)
app.use(getVideo)
app.use(hasSession)
app.use(uploadVideos)
app.use(uploadCollections)
app.use(getCollections)
app.use(delCollections)
app.use(exitLogin)
app.use(uploadBImgUrl)
app.listen(3000,() => {
    console.log('服务已启动，端口 3000 正在监听中....');
})