<template>
    <div class="home-container">
        <input id="searchInputExample" autofocus="autofocus" type="search" class="form-control search-input" placeholder="搜索">
        <div class="videos_container">
            <videosContainer v-for="items in this.list" :key="items.id" :labelName="items.name"/>
        </div>
    </div>
</template>

<script>
import videosContainer from '../components/Videos-container.vue'
import { mapState } from 'vuex';
export default {
    name:'webHome',
    data(){
        return{
            list: [
                {id:'001',name:'美食'},
                {id:'002',name:'IT'},
                {id:'003',name:'职业技能'},
                {id:'004',name:'语言'},
                {id:'005',name:'四六级'},
                {id:'006',name:'考公考研'},
                {id:'007',name:'养生健身'},
            ],
            fullscreenLoading: false
        }
    },
    components:{
        videosContainer
    },
    computed:{
        ...mapState(['userInfo','videos'])
    },
    mounted(){
        if(this.videos.length === 0){
            setTimeout(()=> {
                this.$http.post('http://localhost:8080/wwy/getVideos',{vLabels: this.list}).then(response => {
                this.$store.commit('addVideos',response.data)
            })
            },100)
        }
    },
    methods:{
    }
}

</script>

<style scoped>
.videos_container{
    /* width: 100%; */
    height: 890px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    align-items: center;
    padding-bottom: 120px;
}

.videos_container::-webkit-scrollbar {
    display: none;
}

</style>