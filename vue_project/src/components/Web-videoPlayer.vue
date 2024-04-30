<template>
    <div ref="vPlayer" class="videoPlayer-out-container">
        <div style="width: 900px;height: 600px;" >
            <NPlayer
            ref="player"
            :options="{ src: vUrl }"
            :set="setPlayer"
            v-if="update"
            />
        </div>
        <ul class="operationButtons">
            <li @click="exit"><a href="#">退出</a></li>
            <li @click="collecting"><a href="#">收藏</a></li>
        </ul>
        <div class="Series">
            <transition :appear="true">
                <div class="Series-inner1"  v-if="this.show">
                    <ul>
                        <li @mouseup="hidden(item)" v-for="(item,index) in watchVideo.video.vSeries" :key="index" :title="'第'+(index+1)+'集'">
                            <span :title="'第'+(index+1)+'集'">{{index + 1}}</span>
                        </li>
                    </ul>
                </div>
            </transition>
            <div class="Series-inner2" @mouseenter="showSeries">
                <i class="icon" :class="direction"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'webVideoPlayer',
    data(){
        return {
            show: false,
            direction: {
                'icon-double-angle-down': false,
                'icon-double-angle-up': false
            },
            vUrl: '',
            update:true,
        }
    },
    methods: {
        setPlayer(player) {
            this.$options.player = player;
        },
        showSeries(){
            this.show = !this.show
        },
        play(){
            setTimeout(()=> {
                this.update = true
            },10)
        },
        hidden(item){
            this.update = false
            this.vUrl = item.vUrl
            this.play()
        },
        exit(){
            this.$store.commit('watchVideo',{watch: false,resource: null})
        },
        collecting(){
            this.$http.post('http://localhost:8080/wwy/uploadCollections',{uId: this.userInfo.uId,vId:this.watchVideo.video._id}).then(response => {
                if(response.data.isCollected){
                    this.$store.commit('addMsg',['已收藏','error'])
                    return;
                }
                this.$store.commit('addMsg',['收藏成功','success'])
            })
        }
    },
    mounted() {
    },
    watch:{
        show:{
            immediate: true,
            handler(newValue){
                if(newValue === false){
                    this.direction['icon-double-angle-up'] = false
                    this.direction['icon-double-angle-down'] = true
                }else {
                    this.direction['icon-double-angle-down'] = false
                    this.direction['icon-double-angle-up'] = true
                }
            }
        },
    },
    computed:{
        ...mapState(['watchVideo','userInfo'])
    }
}

</script>

<style scoped>
.videoPlayer-out-container {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 3;
    flex-wrap: wrap;
}

.Series {
    width: 100%;
    height: 300px;
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 0px;
    top: 0px;
    z-index: 9999999999;
}

.Series-inner1 {
    width: 100%;
    height: 150px;
    display: flex;
    background-color: white;
}

.Series-inner1>ul {
    outline: none;
    padding: 5px;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

}

.Series-inner1>ul>li {
    width: 40px;
    height: 40px;
    background-color: #909399;
    margin: 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
}

.Series-inner2 {
    text-align: center;
    background-color: #606266;
}

.Series-inner2>i {
    font-size: 50px;
    color: rgb(237, 237, 237);
}

.v-enter-active {
    animation: wwy 1s linear;
}

.v-leave-active {
    animation: wwy 0.5s ease-out reverse;
}

@keyframes wwy {
    from {
        opacity: 0;
    }
    to {    
        opacity: 1;
    }
}

.operationButtons {
    padding: 0;
    list-style: none;
}

.operationButtons>li {
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin: 5px 5px;
    background-color: black;
    color: white;
    border-radius: 5px;
}

.operationButtons>li>a:link,.operationButtons>li>a:visited,.operationButtons>li>a:hover,.operationButtons>li>a:active {
    color: white;
}

.operationButtons>li>a{
    text-decoration: none;
}
</style>
