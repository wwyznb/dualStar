<template>
    <div ref="webHeader" class="webHeader">
        <div ref="spaceName" class="spaceName">
            <span>{{userSetting.spaceName}}</span>
        </div>
        <ul class="outer-ul">
            <li>
                <div v-if="userInfo.img_url" class="cutPicture"  data-toggle="context-dropdown">
                    <img :src="userInfo.img_url" alt="头像">
                </div>
                <span v-else data-toggle="modal" data-target="#myModal">登录/注册</span>
                <ul class="dropdown-menu">
                    <li><a href="#" data-toggle="modal" data-target="#myModal2">个人资料</a></li>
                    <li><a href="#" @click.capture="exitLogin">退出登录</a></li>
                </ul>
            </li>
        </ul>
        <webUserLogin/>
        <webUsers/>
    </div>
</template>


<script>
import webUserLogin from './Web-UserLogin.vue'
import webUsers from './Web-Users.vue'
import { mapState,mapMutations } from 'vuex';
    export default {
        name: 'webHeader',
        data(){
            return {
                /* language : '简体中文',
                lang : 0,
                liItems : ['简体中文','繁體中文','English','日本語','한국어'] */
            }
        },
        methods:{
            ...mapMutations(['exitLogin'])
        },
        computed:{
            ...mapState(['userInfo','userSetting'])
        },
        components: {
            webUserLogin,
            webUsers
        },
        watch:{
            userSetting:{
                deep: true,
                handler(){

                }
                
            }
        }

    }
</script>


<style scoped>
.webHeader {
    width: 100%;
    height: 80px;
    text-align: center;
    background-color: #ffffff;
    display: flex;
    color: skyblue;
    box-sizing: border-box;
    justify-content:space-between;
}

.spaceName {
    line-height: 80px;
    margin-left: 50px;
    font-size: 40px;
    color: skyblue;
}
.outer-ul {
    list-style: none;
    padding: 0;
    line-height: 80px;
    height: 100%;
    margin: 0;
    
}

.outer-ul>li {
    height: 100%;
    width: 85px;
    margin-right: 50px;
    cursor: pointer;
    line-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cutPicture {
    width: 60px;
    height: 60px;
    border: 1px solid black;
    line-height: 60px;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 60px;
    overflow:hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    width: 60px;
    height: 60px;
}

</style>