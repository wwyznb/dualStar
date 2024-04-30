module.exports = function (success,error) {
//导入 mongoose 包
const mongoose = require('mongoose')


//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/shuangxing')


//设置回调
mongoose.connection.once('open', () => {
    console.log('连接成功');
    success()
})
mongoose.connection.once('error', () => {
    error()
})
mongoose.connection.once('close', () => {
    console.log('连接关闭');//关闭回调
})
}


