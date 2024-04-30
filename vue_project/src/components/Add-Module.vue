<template>
    <div ref="addModuleContainer" class="addModuleContainer" @click="stopAddModule">
        <div class="addModule" style="opacity: 1;">
            <table>
                <tr>
                    <td><label style="font-weight: normal;" for="address">地址</label></td>
                    <td>
                        <div class="inputDiv">
                            <label class="flex" for="address"><i class="icon icon-link"></i></label>
                            <input type="text" id="address" class="input" placeholder="https://" v-model="webSite">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label style="font-weight: normal;" for="name">名称</label></td>
                    <td>
                        <div class="inputDiv">
                            <label class="flex" for="name"><i class="icon icon-pencil"></i></label>
                            <input type="text" id="name" class="input" placeholder="网站名称" v-model="targetWebSiteName">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>图标颜色</td>
                    <td class="colorTd" @click="confirmColor">
                        <span class="color"  data-color="rgb(255, 0, 0)" style="background-color: rgb(255, 0, 0);" value="rgb(255, 0, 0)">
                            <i style="display: none;"><svg t="1710125508647" class="icon" viewBox="200 -150 512 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4418" width="30" height="15"><path d="M402.326 848.721l-391.6-391.6c-14.3-14.3-14.3-37.4 0-51.7s37.4-14.3 51.7 0l339.8 339.9 559.3-559.3c14.3-14.3 37.4-14.3 51.7 0 14.3 14.3 14.3 37.4 0 51.7l-610.9 611z" fill="#27D0D8" p-id="4419"></path></svg></i>
                        </span>
                        <span class="color"  data-color="rgb(0, 255, 0)" style="background-color: rgb(0, 255, 0);" value="">
                            <i style="display: none;"><svg t="1710125508647" class="icon" viewBox="200 -150 512 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4418" width="30" height="15"><path d="M402.326 848.721l-391.6-391.6c-14.3-14.3-14.3-37.4 0-51.7s37.4-14.3 51.7 0l339.8 339.9 559.3-559.3c14.3-14.3 37.4-14.3 51.7 0 14.3 14.3 14.3 37.4 0 51.7l-610.9 611z" fill="#27D0D8" p-id="4419"></path></svg></i>
                        </span>
                        <span class="color"  data-color="rgb(0, 0, 255)" style="background-color: rgb(0, 0, 255);" value="">
                            <i style="display: none;"><svg t="1710125508647" class="icon" viewBox="200 -150 512 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4418" width="30" height="15"><path d="M402.326 848.721l-391.6-391.6c-14.3-14.3-14.3-37.4 0-51.7s37.4-14.3 51.7 0l339.8 339.9 559.3-559.3c14.3-14.3 37.4-14.3 51.7 0 14.3 14.3 14.3 37.4 0 51.7l-610.9 611z" fill="#27D0D8" p-id="4419"></path></svg></i>
                        </span>
                        <span class="color"  data-color="rgb(255, 0, 255)" style="background-color: rgb(255, 0, 255);" value="">
                            <i style="display: none;"><svg t="1710125508647" class="icon" viewBox="200 -150 512 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4418" width="30" height="15"><path d="M402.326 848.721l-391.6-391.6c-14.3-14.3-14.3-37.4 0-51.7s37.4-14.3 51.7 0l339.8 339.9 559.3-559.3c14.3-14.3 37.4-14.3 51.7 0 14.3 14.3 14.3 37.4 0 51.7l-610.9 611z" fill="#27D0D8" p-id="4419"></path></svg></i>
                        </span>
                        <span class="color"  data-color="rgb(0, 255, 255)" style="background-color: rgb(0, 255, 255);" value="">
                            <i style="display: none;"><svg t="1710125508647" class="icon" viewBox="200 -150 512 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4418" width="30" height="15"><path d="M402.326 848.721l-391.6-391.6c-14.3-14.3-14.3-37.4 0-51.7s37.4-14.3 51.7 0l339.8 339.9 559.3-559.3c14.3-14.3 37.4-14.3 51.7 0 14.3 14.3 14.3 37.4 0 51.7l-610.9 611z" fill="#27D0D8" p-id="4419"></path></svg></i>
                        </span>
                        <el-color-picker
                            v-model="demoColor"
                            show-alpha
                            :predefine="predefineColors">
                        </el-color-picker>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div class="demo" :style="{backgroundColor:demoColor}">
                            <p>{{ targetWebSiteName }}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button class="btn btn-primary btn-block" type="button" @click="addExpanings">&nbsp;&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;&nbsp;</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'addModule',
    data(){
        return {
            demoColor: "#2e8b57",
            targetWebSiteName: "A",
            webSite: "",
            hasImage: false
        }
    },
    methods:{
        stopAddModule(e){
            if (e.target.classList[0] === 'addModuleContainer') {
                this.$store.commit('isAddModule',false)
            }
        },
        confirmColor(e){
            for (let key in e.target.parentNode.childNodes) {
                if (e.target.parentNode.childNodes[key].childNodes && e.target.parentNode.childNodes[key].childNodes[0].nodeName === 'I') {
                    e.target.parentNode.childNodes[key].childNodes[0].style.display = 'none'
                }
            }
            if(e.target.nodeName === 'SPAN'){
                e.target.childNodes[0].style.display = 'inline-block'
                this.demoColor = e.target.dataset.color
            }
            
        },
        addExpanings(){
            const list_item = {
                bColor: this.demoColor,
                name:this.targetWebSiteName,
                webSite: this.newWebSite
            }
            this.$store.commit('addExpandingList',list_item)
            localStorage.setItem('Expandings',JSON.stringify(this.expandings))
            this.$store.commit('isAddModule',false)
        }
    },
    computed: {
        ...mapState(['addModule','expandings']),
        newWebSite(){
            const reg = /^(?:http|https):\/\//
            const str1 = this.webSite.match(reg)
            const str2 = 'https://'
                
            if (str1) {  
                const protocol = str1[0];  
                // 切割掉协议部分，得到剩余的URL  
                const remainingUrl = this.webSite.slice(protocol.length);  
                return str2 + remainingUrl
            } else {  
                return str2 + this.webSite
            }
            
        }
    }

}
</script>

<style scoped>
.addModuleContainer {
    position: absolute;
    background-color: rgb(92, 86, 86,0.8);
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.addModule{
    border-radius: 20px;
    padding: 30px;
    width: 700px;
    height: 500px;
    background-color: rgb(255, 255, 255);
}

.inputDiv{
    background-color: #F0F1F4;
    border-radius: 5px;
    width: 300px;
    height: 32px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
    border: 1px solid transparent;

}

.inputDiv:hover{
    border: 1px solid #C0C4CC;
}


.input{
    outline: none;
    border: none;
    background-color: #F0F1F4;
    flex: 1 0 auto;
}

.gettingButton {
    background-color: #ffffff;
    border: none;
    height: 30px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

tr {
    height: 50px;

}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: normal;
}

.color {
    width: 30px;
    height: 30px;
    display: inline-block;
    border-radius: 15px;
    margin: 0px 10px;
    transition: 0.3s 0.1s linear all;
    display: flex;
    justify-content: center;
    align-items: center;
}

.color:hover {
    transform: scale(1.5);
}

.colorTd {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 50px;
}

.demo {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    box-shadow: 0px 0px 3px 1px black;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

p {
    width: 60px;
    height: 20px;
    text-align: center;
    overflow: hidden;
    color: white;
    text-overflow: ellipsis;
    font-size: 15px;
}
</style>