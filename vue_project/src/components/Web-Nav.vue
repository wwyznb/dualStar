<template>
    <div>
        <div class="webNav" ref="webNav">
            <!-- 登录/头像 -->
            <div v-if="userInfo.img_url" class="cutPicture"  data-toggle="context-dropdown">
                <img :src="userInfo.img_url" alt="头像">
            </div>
            <div class="loginDiv" v-else data-toggle="modal" data-target="#myModal"><span>登录</span></div>
            <ul class="dropdown-menu">
                <li><a href="#" data-toggle="modal" data-target="#myModal2">个人资料</a></li>
                <li><a href="#" @click.capture="exitLogin">退出登录</a></li>
            </ul>
            <webUserLogin/>
            <webUsers/>
            <!--  标签 -->
            <ul ref="navUl" @click="toRouter">
                <li>
                    <span data-address="/home"><i class="icon icon-home"></i>首页</span>
                </li>

                <li v-for="items in userInfo.labels" :key="items.id">
                    <span :data-address="`/like/${items.name}`"><i class="icon icon-heart"></i>{{items.name}}</span>
                </li>

                <li>
                    <span data-address="/collected"><i class="icon icon-star" ></i>我的收藏</span>
                </li>
                <!-- <li>
                    <span data-address="/history"><i class="icon icon-history" ></i>历史记录</span>
                </li> -->
                <li>
                    <span data-address="/expanding"><i class="icon icon-branch" ></i>拓展组件</span>
                </li>
                <li>
                    <span @click.stop="showSetting"><i class="icon icon-cog"></i>设置</span>
                </li>
            </ul>
            <div class='navBackground'></div>
        </div>
        <webSetting v-if="openSetting"/>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import webUserLogin from './Web-UserLogin.vue'
import webUsers from './Web-Users.vue'
import webSetting from './Web-Setting.vue'
export default {
    name: 'webNav',
    data() {
        return {

        }
    },
    methods:{
        ...mapMutations(['exitLogin']),
        showSetting(){
            this.$store.commit('isOpenSetting',!this.openSetting)
        },
        toRouter(e){
            this.$refs.navUl.childNodes.forEach(p => {
                p.style.backgroundColor = null
            });
            if(e.target.nodeName === 'SPAN' || e.target.parentNode.nodeName === 'SPAN'){
                if(e.target.parentNode.nodeName === 'LI'){
                    e.target.parentNode.style.backgroundColor = this.userSetting.activeBColor
                }else if(e.target.parentNode.parentNode.nodeName === 'LI'){
                    e.target.parentNode.parentNode.style.backgroundColor = this.userSetting.activeBColor
                }else {
                    e.target.style.backgroundColor = this.userSetting.activeBColor
                }
                const address = e.target.dataset.address || e.target.parentNode.dataset.address
                this.$router.push({
                    path: address,
                }).catch(err =>{
                    if(err.name !== 'NavigationDuplicated'){
                        throw err
                    }
                })
            }
        }
    },
    computed:{
        ...mapState(['userInfo','openSetting','userSetting'])
    },
    mounted(){
        if(this.userSetting.navPosition === '左侧'){
            this.$refs.webNav.style.left = '0px'
            this.$refs.webNav.style.right = null
        }else{
            this.$refs.webNav.style.right = '0px'
            this.$refs.webNav.style.left = null
        }
        this.$refs.webNav.childNodes[4].style.fontSize = this.userSetting.navFont + 'px'
        this.$refs.webNav.style.color = this.userSetting.navColor
        this.$refs.webNav.childNodes[5].style.backgroundColor = this.userSetting.navBColor
    },
    components:{
        webUserLogin,
        webUsers,
        webSetting
    },
    watch:{
        userSetting:{
            deep: true,
            handler(newValue){
                if(newValue.navPosition === '左侧'){
                    this.$refs.webNav.style.left = '0px'
                    this.$refs.webNav.style.right = null
                }else{
                    this.$refs.webNav.style.right = '0px'
                    this.$refs.webNav.style.left = null
                }

                this.$refs.webNav.childNodes[4].style.fontSize = newValue.navFont + 'px'
                this.$refs.webNav.style.color = newValue.navColor 
                this.$refs.webNav.childNodes[5].style.backgroundColor = newValue.navBColor
            }
        }
    }

}
</script>

<style scoped>

.webNav{
    position: absolute;
    top: 0;
    height: 100vh;
    width: 50px;
}

.navBackground {
    width: 50px;
    height: 100%;
    filter: blur(2px);
    display: block;
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
}

i{
    display: block;
}

ul {
    text-align: center;
    list-style: none;
    position: relative;
    padding: 0;
    margin: 0;
    z-index: 2;
}

ul>li {
    overflow-wrap: normal;
    margin-top: 5px;
    height: 4.35em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    cursor: pointer;
}

ul>li:hover i {
    position: relative;
    top: -2px;
}

.cutPicture {
    width: 50px;
    height: 50px;
    border: 1px solid black;
    line-height: 60px;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 60px;
    overflow:hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.8);
    z-index: 2;
    position: relative;
    margin: 40px 0 ;
    cursor: pointer;
}

img {
    width: 60px;
    height: 60px;
}

span {
    text-align: center;
    position: relative;
    z-index: 2;
}

.loginDiv {
    height: 80px;
    line-height: 80px;
    text-align: center;
    position: relative;
    z-index: 3;
}

.active {
    background-color: blueviolet;
}


</style>