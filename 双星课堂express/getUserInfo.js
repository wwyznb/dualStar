//导入 express 包
const express = require('express')
//导入 Users 文件
const UserModel = require('./db/Users')
//导入 CheckCode 文件
const CheckCodeModel = require('./db/CheckCode')
//导入 uuid 包
const { v4: uuidv4 } = require('uuid');
//导入 mongoose 包
const mongoose = require('mongoose')
//导入 connect-mongo 包
const MongoStore = require('connect-mongo')
//导入 session
const session = require('express-session')
//导入 db 文件
const db = require('./db/db')

const router = express.Router()


router.use(session({
    name: 'sid',
    secret: 'wwyao',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/shuangxing'
    }),
    cookie:{
        httpOnly: true,
        maxAge: 1000 * 60 * 60 *24 * 30
    }
}))

//解析 querystring 格式请求体的中间件
// const urlencodedParser = bodyParser.urlencoded({extended: false})

router.post('/getUserInfo',(req,res) => {
    //设置回调
    db(()=>{
        CheckCodeModel.findOne({email : req.body.email}).then(doc => {
            if(doc.code === req.body.code){
                CheckCodeModel.updateOne({email : req.body.email},{code : null}).then(doc => {
                    console.log(doc);
                })
                UserModel.findOne({ email : req.body.email}).then(doc => {
                    if(doc){
                        req.session.uId = doc.uId                        
                        res.json(doc)
                        mongoose.disconnect()
                        return;
                    }
                    const uuid = uuidv4()
                    UserModel.create({
                        uId : uuid,
                        uName : `${uuid.replace(uuid.slice(4,uuid.length - 4),'****')}`,
                        email : req.body.email,
                        labels : [],
                        register_date : new Date(),
                        initialization : 'false',
                    }).then(doc => {
                        req.session.uId = doc.uId
                        res.json(doc)
                        mongoose.disconnect()
                        return;
                    })
                })
                return;
            }
            res.status(500)
            res.end()
            mongoose.disconnect()
        })
    },()=>{
        console.log('连接失败');
        mongoose.disconnect()
    })
        
   

        


})

module.exports = router;