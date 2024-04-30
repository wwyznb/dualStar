import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

//准备 actions 响应组件动作
const actions = {
}
//准备 mutations 操作数据(state)
const mutations = {
    addUserInfo(state,value){
        // console.log('收到的用户数据为:',value);
        state.userInfo = value
    },
    exitLogin(state){
        state.userInfo = {}
        axios.post('http://localhost:8080/wwy/exitLogin').then(response => {
            console.log(response.data);
        })
    },
    delMsg(state){
        state.msg = null
    },
    addMsg(state,value){
        state.msg = value
    },
    insertLabels(state,value){
        state.userInfo.labels.unshift(value)
    },
    delLabels(state,value){
        state.userInfo.labels.forEach((p,index) => {
            if(p.id === value){
                state.userInfo.labels.splice(index,1)
            }
        });
    },
    loadSetting(state,value){
        state.userSetting = value
    },
    isAddModule(state,value){
        state.addModule = value
    },
    delExpandingList(state,value){
        state.expandings.splice(value,1)
    },
    addExpandingList(state,value){
        if(Array.isArray(value)){
            for (let k in value){
                state.expandings.push(value[k])
            }
        }else{
            state.expandings.push(value)
        }
    },
    isOpenMenu(state,value){
        state.openMenu = value
    },
    isOpenSetting(state,value){
        state.openSetting = value
    },
    addVideos(state,value){
        state.videos = value
    },
    watchVideo(state,value){
        state.watchVideo = value
    },
    updateUserCollections(state,value){
        state.userCollections = value
    },

}
//准备 state 存储数据
const state = {
    userInfo: {},
    userHistories: [],
    userCollections: null,
    videos: [],
    msg: null,
    userSetting:{
        navPosition: '左侧',
        navFont: 13,
        navColor: '#c5c4c4',
        navBColor: '#353535cc',
        activeBColor: '#9b9b9b',
        webBColor: '#ffffff',
        webBImage: null,
        showAreaBcolor: 'transparent',
    },
    addModule : false,
    expandings: [],
    openMenu: false,
    openSetting: false,
    watchVideo: {
        watch: false,
        video: null
    },
}
//准备 getters 简化数据
const getters = {}
Vue.use(Vuex)
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})

