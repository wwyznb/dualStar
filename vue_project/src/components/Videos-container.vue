<template>
    <div class="videos-out-container">
        <div class="type-title">
            <span>{{ labelName }}</span>
        </div>
        <div class="videos">
            <div class="videos-item" v-for="(item,index) in videos[labelName]" :key="index" @click="playVideos(item)">
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
// import clamp from 'clamp-js';
import { mapState } from 'vuex'
export default {
    name:'videosContainer',
    props:['labelName'],
    data(){
        return {
        }
    },
    methods:{
        playVideos(item){
            this.$store.commit('watchVideo',{watch: true,video: item})
        }
    },
    mounted(){
        // clamp(this.$refs.introductionSpan,{clamp: 5})
    },
    computed:{
        ...mapState(['videos'])
    }
}
</script>

<style scoped>
.type-title {
    width: 200px;
    height: 50px;
    background-image:  linear-gradient(to right top, #fddb92, #14f2fe);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}

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

.videos-out-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    
}
.videos-out-container::-webkit-scrollbar {
    display: none;
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

</style>