//导入 express
const express = require('express')


const router = express.Router()

router.post('/exitLogin',(req,res) =>{
    console.log(req.session);
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
        }else {
            console.log('销毁成功')
        }
    })
})

module.exports = router;