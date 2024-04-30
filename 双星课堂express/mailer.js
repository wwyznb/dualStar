//导入 nodemailer 包
const nodemailer = require('nodemailer')
 
// 配置信息
const mailconfig = {
  host: 'smtp.163.com', // 是什么邮箱，就修改为什么格式，如qq邮箱为：smtp.qq.com
  port: 465, // 默认端口
  auth: {
    user: '18959126167@163.com', // 注册的163邮箱账号
    pass: 'EWQWZNMPHINRBAKE' // 邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
  }
}
 
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(mailconfig)
 
// 发送邮件
function send_verify (mail) {
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('mail sent:' + info.response)
    }
  })
}
 
module.exports = {
  mailconfig,
  send_verify
}