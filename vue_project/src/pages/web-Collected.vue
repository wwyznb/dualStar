<template>
    <div class="collected-out-container">
        <ul class="collected-ul">
            <li v-for="(item,index) in userCollections" :key="index">
                <img :src="item.vImage" alt="">
                <div class="info">
                    <p>{{item.vName}}</p>
                    <p>{{item.vBlurb}}</p>
                </div>
                <button @click="playVideo(item)"><i class="icon icon-play-sign"></i>播放</button>
                <button @click="delVideo(item._id)"><i class="icon icon-remove-sign"></i>删除</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'webCollected',
    data(){
        return{
        }
    },
    methods:{
        playVideo(item){
            this.$store.commit('watchVideo',{watch: true, video: item})
        },
        delVideo(vId){
            console.log(vId);
            this.$http.post('http://localhost:8080/wwy/delCollections',{uId: this.userInfo.uId,vId: vId}).then(response => {
                this.$store.commit('updateUserCollections', response.data)
                this.$store.commit('addMsg',['删除成功','success'])
            })
        }
    },
    computed:{
        ...mapState(['userInfo','userCollections'])
    },
    mounted(){
        setTimeout(()=> {
            this.$http.post('http://localhost:8080/wwy/getCollections',{uId: this.userInfo.uId}).then(response => {
                this.$store.commit('updateUserCollections',response.data)
            })
        },100)
    }
}
</script>

<style>
.collected-out-container {
    display: flex;
    justify-content: center;
    overflow: scroll;
}

.collected-out-container::-webkit-scrollbar {
    display: none;
}

.collected-ul{
    list-style: none;
    padding: 0;
    width: 1600px;
    display: flex;
    flex-direction: column;

}

.collected-ul>li>img {
    width: 230px;
    height: 130px;
    border: 1px solid black;
    flex: 1 0 auto;

}

.collected-ul>li {
    background-color: white;
    border-radius: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    flex-wrap: wrap;
    flex: 0 1 auto
}

button {
    width: 90px;
    height: 50px;
    flex: 3 1 auto;
    outline: none;
    border: 1px solid ;
    background-color: #3280fc;
    color: white;
    border-radius: 10px;
}
.info {
    width: 300px;
    flex: 15 1 auto;
}

.collected-ul>li>button+button {
    background-color: red;
}

</style>