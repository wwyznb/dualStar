<template>
    <transition :appear="true">
        <div class="settingDivOuter" @mouseup="closeSetting">
            <div class="settingDiv">
                <ul class="nav nav-tabs">
                    <li class="active"><a data-tab href="#tabContent1">导航栏</a></li>
                    <li><a data-tab href="#tabContent2">页面</a></li>
                    <li class="float" @click="reset"><a href="#">默认</a></li>
                    <li class="float" @click="updateSetting"><a href="#">保存</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="tabContent1">
                        <div class="flex-row">
                            <div class="flex-column">
                                <h3>导航栏位置</h3>
                                <el-select v-model="userSetting.navPosition" placeholder="请选择">
                                    <el-option
                                    v-for="item in options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="block">
                                <h3 class="demonstration">导航栏字体大小</h3>
                                <el-slider v-model="userSetting.navFont" :min="8" :max="17"></el-slider>
                            </div>
                            <div class="flex-column">
                                <h3>导航栏字体颜色</h3>
                                <el-color-picker
                                    v-model="userSetting.navColor"
                                    show-alpha
                                    :predefine="predefineColors">
                                </el-color-picker>
                            </div>
                            <div class="flex-column">
                                <h3>导航栏背景颜色</h3>
                                <el-color-picker
                                    v-model="userSetting.navBColor"
                                    show-alpha
                                    :predefine="predefineColors">
                                </el-color-picker>
                            </div>
                            <div class="flex-column">
                                <h3>标签选择背景颜色</h3>
                                <el-color-picker
                                    v-model="userSetting.activeBColor"
                                    show-alpha
                                    :predefine="predefineColors">
                                </el-color-picker>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="tabContent2">
                        <div class="flex-row">
                            <div class="flex-column">
                                <h3>页面背景颜色</h3>
                                <el-color-picker
                                    v-model="userSetting.webBColor"
                                    show-alpha
                                    :predefine="predefineColors">
                                </el-color-picker>
                            </div>
                            <div class="flex-column">
                                <h3>页面背景图片</h3>
                                <button type="button" class="btn btn-link" @click="uploadImg"><i class="icon icon-plus"></i> 上传图片</button>
                                <input ref="uploadFile2" type="file" style="display: none;" accept=".jpg,.png" @change="changeFile">
                            </div>
                            <div class="flex-column">
                                <h3>展示区背景颜色</h3>
                                <el-color-picker
                                    v-model="userSetting.showAreaBColor"
                                    show-alpha
                                    :predefine="predefineColors">
                                </el-color-picker>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'webSetting',
    data(){
        return {
            options1: [
                {
                value: '左侧',
                label: '左侧'
                }, 
                {
                value: '右侧',
                label: '右侧'
                }
            ],
            value:'',
            value2: 50,
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ],
            uFile : null,
            isChange : false
        }
    },
    computed:{
        ...mapState(['userSetting','userInfo','openSetting'])
    },
    methods:{
        reset(){
            this.userSetting.navPosition = '左侧'
            this.userSetting.navFont = 13
            this.userSetting.navColor = '#c5c4c4'
            this.userSetting.navBColor = '#353535cc'
            this.userSetting.activeBColor = '#9b9b9b'
            this.userSetting.webBColor = '#ffffff'
            this.userSetting.webBImage = null
            this.userSetting.showAreaBcolor = 'transparent'
            this.userSetting.showAreaBImage = null
        },
        updateSetting(){
            if(this.isChange){
                let formdata = new FormData()
                formdata.append('file',this.uFile)
                formdata.append('uId',this.userInfo.uId)
                this.$http.post('http://localhost:8080/wwy/uploadBImgUrl',formdata).then(response => {
                    console.log(response.data);
                },error => {
                    console.log(error.message);
                })
            }
            setTimeout(()=> {
                this.$http.post('http://localhost:8080/wwy/updateSetting',{
                    uId: this.userInfo.uId,
                    navPosition: this.userSetting.navPosition,
                    navFont: this.userSetting.navFont,
                    navColor: this.userSetting.navColor,
                    navBColor: this.userSetting.navBColor,
                    activeBColor: this.userSetting.activeBColor,
                    webBColor: this.userSetting.webBColor,
                    showAreaBcolor: this.userSetting.showAreaBcolor,
                    showAreaBImage: this.userSetting.showAreaBImage,
                }
                ).then(response => {
                    console.log(response.data);
                    localStorage.setItem('Settings',JSON.stringify(response.data))
                    this.$store.commit('loadSetting',response.data)
                    this.$store.commit('addMsg',['保存成功','success'])
                    console.log(this.userSetting);
                },error => {
                    console.log(error.message);
                })
            },100)
            
        },
        closeSetting(e){
            if(e.target.className === 'settingDivOuter'){
                this.$store.commit('isOpenSetting',!this.openSetting)
            }
            
        },
        uploadImg(){
            this.$refs.uploadFile2.click()
        },
        changeFile(e){
            //匹配 选择的文件是否为 .jpg 或 .png 的图片,大小是否小于4MB
            const reg = /image\/(jpeg)|(png)/
            let result = reg.test(e.target.files[0].type)
            let size = e.target.files[0].size <= 5242880
            //若是,则获取文件; 若不是, 则返回报错
            if(result && size){
                this.uFile = e.target.files[0]
                this.isChange = true
            }else {
                this.$store.commit('addMsg',['请选择.jpg或.png格式文件,且小于4MB','error'])
            }
        },
    }

}

</script>

<style scoped>
.settingDiv {
    width: 100vw;
    height: 200px;
    position: relative;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 3;
}

.settingDivOuter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    z-index: 3;
}

.flex-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.flex-column {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}

.v-enter-active {
    animation: wwy 0.5s linear;
}

.v-leave-active {
    animation: wwy 0.5s linear reverse;
}

@keyframes wwy {
    from {
        top: -100px;
        opacity: 0;
    }
    to {    
        opacity: 1;
        top: 0px;

    }
}

.float {
    float: right;
    right: 50px;
}

</style>