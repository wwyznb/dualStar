<template>
    <div class="modal fade" id="myModal2">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="table">
                    <table>
                        <caption><h1>个人资料</h1></caption>
                        <tbody>
                            <tr>
                                <td>用户名：</td>
                                <td class="flex"><input ref="nameEdit" disabled type="text" v-model="userInfo.uName">&nbsp;<i class="icon icon-edit-sign" @click="editName"></i></td>
                            </tr>
                            <tr>
                                <td>性别：</td>
                                <td class="flex">
                                    <label class="radio-inline">
                                        <input type="radio" name="gender" v-model="userInfo.gender" value="male"> 男
                                    </label>
                                    <label class="radio-inline">
                                        <input type="radio" name="gender" v-model="userInfo.gender" value="female"> 女
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>学习标签：</td>
                                <td>
                                    <studyLabels/>
                                </td>
                            </tr>
                            <tr>
                                <td>头像：</td>
                                <td class="flex">
                                    <img :src="userInfo.img_url" width="200px" height="200px" class="img-circle" alt="头像">
                                    <button type="button" class="btn btn-link" @click="uploadImg"><i class="icon icon-plus"></i> 选择图片</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input ref="uploadFile" type="file" style="display: none;" accept=".jpg,.png" @change="changeFile">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateUserInfo">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import studyLabels from './Study-Labels.vue'
export default {
    name: 'webUsers',
    data(){
        return{
            uFile : null,
            isChange : false
        }
    },
    components:{
        studyLabels
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods:{
        //设置名称是否能修改
        editName(){
            this.$refs.nameEdit.disabled === true? this.$refs.nameEdit.disabled = false : this.$refs.nameEdit.disabled = true
        },
        //触发 文件选择
        uploadImg(){
            this.$refs.uploadFile.click()
        },
        handleDefault(e){
            e.preventDefault()
        },
        changeFile(e){
            //匹配 选择的文件是否为 .jpg 或 .png 的图片
            const reg = /image\/(jpeg)|(png)/
            let result = reg.test(e.target.files[0].type)
            //若是,则获取文件; 若不是, 则返回报错
            if(result){
                this.uFile = e.target.files[0]
                this.isChange = true
            }else {
                this.$store.commit('addMsg',['请选择.jpg或.png格式文件','error'])
            }
        },
        //保存修改
        updateUserInfo(){
            if(this.userInfo){
                //更新图片地址
                if(this.isChange){
                    let formdata = new FormData()
                    formdata.append('file',this.uFile)
                    formdata.append('uId',this.userInfo.uId)
                    this.$http.post('http://localhost:8080/wwy/uploadImgUrl',formdata).then(response => {
                        console.log(response.data);
                    },error => {
                        console.log(error.message);
                    })
                }
                //更新用户数据，并重新获取数据
                setTimeout(() => {
                    this.$http.post('http://localhost:8080/wwy/updateUserInfo',{uId : this.userInfo.uId, userName : this.userInfo.uName, userGender : this.userInfo.gender, userLabels : this.userInfo.labels}).then(response => {
                        this.$store.commit('addUserInfo',response.data)
                        this.$store.commit('addMsg',['更新成功','success'])
                        // console.log(response.data);
                    },error => {
                        console.log(error.message);
                    })
                }, 1000);
                
            }
        }
    },
    watch:{
        
    }
}

</script>

<style scoped>
.span-font {
    font-size: 20px;
    font-weight: bold;
}

table {
    text-align: center;
    vertical-align: middle;
}

.table {
    display: flex;
    justify-content: center;
    align-items: center;
}

caption{
    text-align: center;
}

img {
    width: 80px;
    height: 80px;
}

.flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>