//导入 express 包
const express = require('express')
//导入 body-parser 包
const bodyParser = require('body-parser')
//导入 db 文件
const db = require('./db/db')
//导入 Videos 文件
const VideosModel = require('./db/Videos')
const { mongoose } = require('mongoose')

const router = express.Router()

router.post('/getVideos',(req,res) => {
    db(()=>{
        let j = []
        if(typeof(req.body.vLabels) === 'object'){
            for(let i in req.body.vLabels){
                j.push(req.body.vLabels[i].name)
            }
            VideosModel.find({vLabels : {$in: j}}).sort({vLabels: -1}).then(doc => {
                let a = {}
                for(let k1 in j){
                    const b = doc.findIndex(e => {
                        return e.vLabels[0] === j[k1]
                    })
                    const c = doc.splice(b,4)
                    a[j[k1]] = c
                }
                res.json(a)
                mongoose.disconnect()
            })
        }else{
            j.push(req.body.vLabels)
            VideosModel.find({vLabels : {$in: j}}).then(doc => {
                res.json(doc)
                mongoose.disconnect()
            })
        }
    },()=>{
        console.log('连接失败');
        mongoose.disconnect()
    })
})

module.exports = router;