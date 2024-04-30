<template>
    <div class="videos-out-container">
        <div class="videos">
            <div class="videos-item" v-for="(item,index) in list" :key="index" @click="playVideos(item)">
                <img class="video_img" height="100px" :src="item.vImage" alt="暂无图片">
                <p>{{item.vName}}</p>
                <div ref="introductionSpan" class="introduction">
                    {{item.vBlurb}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name:'webLike',
    props:['label'],
    data(){
        return {
            list: []
        }
    },
    methods:{
        playVideos(item){
            this.$store.commit('watchVideo',{watch: true,video: item})
        }
    },
    computed: {
        ...mapState(['videos'])
    },
    watch:{
        label:{
            immediate: true,
            handler(newValue){
                if (newValue) {
                    setTimeout(()=>{
                        this.$http.post('http://localhost:8080/wwy/getVideos',{vLabels: this.label}).then(response => {
                            this.list = response.data
                        })
                    },100)
                }
            }
        }
    },
    mounted(){
    }
}
</script>

<style>
.videos {
        width: 90%;
        border-radius: 10px;
        border-top: 1px solid #fddb92;
        border-left: 1px solid #14f2fe;
        border-right: 1px solid #14f2fe;
        border-bottom: 1px solid #fddb92;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
}

.videos-item {
    width: 150px;
    height: 200px;
    flex: 0 1 auto;
    margin: 10px;
    box-shadow: 0px 0px 1px 0px black;
    background-color: white;
    border-radius: 5px;
}

.videos-out-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    
}
</style>