//导入 express 模块
const express = require('express')
//导入 formidable 模块
const formidable = require('formidable')
//导入 db 模块
const db = require('./db/db')
//导入 Users 模块
const SettingModel = require('./db/Settings')
//导入 fs 模块
const fs = require('fs');
const mongoose = require('mongoose')

const router = express.Router()

router.post('/uploadBImgUrl',(req,res)=>{
    //创建 form 对象
    const form = formidable({
        multiples: true,
        uploadDir: __dirname + '/imgs',
        keepExtensions: true
    });
    //解析上传的数据
    form.parse(req,(err,fields,files) => {
        if(err){
            console.log(err);
            return;
        }
        res.json(null)
        db(() => {
            SettingModel.findOne({uId: fields.uId}).then(doc => {
                if(doc.webBImage){
                    const url = doc.webBImage;
                    const fileRegex = /([^/]+)\.(jpg|png)$/;
                    const match = url.match(fileRegex)
                    // 文件路径  
                    const filePath = './imgs/'+match[0];  
                    // 删除文件  
                    fs.unlink(filePath, (err) => {  
                        if (err) throw err;  
                        console.log('文件已被删除');  
                    });
                }
                 SettingModel.updateOne({uId: fields.uId}, {webBImage: 'http://localhost:8080/wwy/'+files.file.newFilename}).then(doc => {
                    console.log(doc);
                    mongoose.disconnect()
                })
            })
        },() => {
            console.log('连接失败');
            mongoose.disconnect()
        })
    })

})


module.exports = router