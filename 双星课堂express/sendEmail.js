//导入 express 包
const express = require('express')
//导入 body-parser 包
const bodyParser = require('body-parser')
// 导入 mailer 文件
const mailer = require('./mailer')
//导入 CheckCode 文件
const CheckCodeModel = require('./db/CheckCode')
//导入 db 文件
const db = require('./db/db')
const mongoose = require('mongoose')

//创建路由对象
const router = express.Router()

router.post('/sendEmail',(req,res) => {
  let verify = Math.random().toFixed(6).slice(-6)// 随机6位验证码
 
  // 发送前准备
  var mail = {
    // 发件人
    from: '<' + mailer.mailconfig.auth.user + '>',
    // 主题
    subject: '双星线上课堂服务邮箱', // 邮箱主题
    // 收件人
    to: req.body.email, // 前台传过来的邮箱
    // 邮件内容，HTML格式
    text: '尊敬的用户您好：' +
      `您正在进行邮箱验证，本次验证码为：${verify}，请在10分钟内进行使用。` +
      '如非本人操作，请忽略此邮件，由此给您带来的不便请谅解！'
  }
  
  // 发送邮
  mailer.send_verify(mail)

  //向数据库内插入 邮箱 和 验证码，方便后面进行校验
  db(() => {
    CheckCodeModel.findOne({email : req.body.email}).then(doc =>{
      if(doc){
        CheckCodeModel.updateOne({email : req.body.email},{code : String(verify)}).then(doc => {
          console.log(doc);
          mongoose.disconnect()
        }).catch(err => {
          console.log(err);
          mongoose.disconnect()

        })
        return;
      }
      CheckCodeModel.create({email : req.body.email,code : String(verify)}).then(doc => {
        console.log(doc);
        mongoose.disconnect()
      }).catch(err => {
        console.log(err);
        mongoose.disconnect()
      })
    })
    
    
  },() => {
    console.log('操作失败');
    // mongoose.disconnect()
  })

})

module.exports = router;