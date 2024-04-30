<template>
    <div class="modal fade" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="loginDiv">
                    <h1>登录</h1>
                    <div class="input-control has-icon-left">
                        <input id="inputAccountExample1" type="text" class="form-control" v-model="Email" placeholder="请输入邮箱地址">
                        <label for="inputAccountExample1" class="input-control-icon-left"><i class="icon icon-envelope-alt"></i></label>
                    </div>
                    <div class="checkCode margin-self-top">
                        <div class="input-control has-icon-left has-icon-right" style="flex: 1 1 auto">
                            <input id="inputEmailExample1" type="text" class="form-control" v-model="checkCode" placeholder="输入验证码">
                            <label for="inputEmailExample1" class="input-control-icon-left"><i class="icon icon-key"></i></label>
                        </div>
                        <div class="flex-full">
                            <button ref="CheckCodeBtn" class="btn btn-primary"  type="button" disabled @click="getCheckCode()">获取验证码</button>
                        </div>
                    </div>
                    <button ref="loginBtn" class="btn btn-block btn-primary margin-self-top" disabled type="button" @click="getUserInfo()">登录</button>
                    <button ref="hidenBtn" data-dismiss="modal" style="display: none;"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'webUserLogin',
    data() {
        return {
            Email : '',
            checkCode : ''
        }
    },
    methods: {
        getCheckCode() {
            if(this.isEmail){
                this.$http.post(`http://localhost:8080/wwy/sendEmail`,{email : this.Email}).then(response =>{
                    console.log('请求成功了',response.data);
                },error => {
                    console.log(error.message);
                })
                let t = 60 //验证码冷却时间
                this.$refs.CheckCodeBtn.disabled = true
                const time = setInterval(() => {
                    t -= 1
                    this.$refs.CheckCodeBtn.innerHTML = `检查一下邮箱吧(${t}s)`
                    if (t <= 0){
                        clearInterval(time)
                        this.$refs.CheckCodeBtn.disabled = false
                        this.$refs.CheckCodeBtn.innerHTML = '获取验证码'
                    }
                },1000)
            }
        },
        getUserInfo() {
            if(this.isCode){
                this.$http.post(`http://localhost:8080/wwy/getUserInfo`,{email : this.Email,code : this.checkCode}).then(response =>{
                    // console.log('请求成功了',response.data);
                    this.$store.commit('addUserInfo',response.data)
                    this.$store.commit('addMsg',['登录成功','success'])
                    this.checkCode = ''
                }, error => {
                    if(error){
                        this.$store.commit('addMsg',['验证码或账号错误','error'])
                        this.checkCode = ''
                    }
                })

            }
        }
    },
    computed: {
        //使用正则表达式 判断 Email 是否符合邮箱格式
        isEmail (){
            const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return reg.test(this.Email.trim())
        },
        //使用正则表达式 判断 checkCode 是否为6位数字
        isCode (){
            const reg = /[0-9]{6}/
            return reg.test(this.checkCode.trim())
        },
        ...mapState(['userInfo'])
    },
    watch: {
        //监视 isEmail 
        isEmail:{
            handler(newValue){
                if(newValue){
                    this.$refs.CheckCodeBtn.disabled = false
                }else {
                    this.$refs.CheckCodeBtn.disabled = true
                }

            }
        },
        //监视 isCode 
        isCode:{
            handler(newValue){
                if(newValue){
                    if (this.isEmail === true) {
                        this.$refs.loginBtn.disabled = false
                    }
                }else {
                    this.$refs.loginBtn.disabled = true
                }
            }
        },
        userInfo:{
            handler(newValue){
                if(newValue != null){
                    this.$refs.hidenBtn.click()
                }
            }
        }
    }
}
</script>

<style scoped>
.checkCode {
    display: flex;
    align-items: center;
}

.flex-full {
    flex: 0.5 0 auto;
    display: flex;
    width: 100px;
}

.margin-self-top {
    margin-top: 10px;
}

h1 {
    text-align: center;
}

.loginDiv {
    margin: 15px;
}

</style>