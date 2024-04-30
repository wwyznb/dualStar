<template>
    <div class="out-container" @contextmenu.prevent="editMenu" @mouseup="closeMenu" >
        <vuedraggable class="out-container" :list="expandings">
            <div class="inner-container" v-for="(item,index) in expandings" :key="index">
                <div class="img-out-container">
                    <a :href="item.webSite" :data-index="index" target="_blank" :style="{backgroundColor: item.bColor}">
                        <!-- <img v-if="item.hasImage" src="../../public/img/kenan.jpg" title="柯南"> -->
                        {{ item.name }}
                    </a>
                </div>
                <span>{{item.name}}</span>
            </div>
            <div class="inner-container" >
                <div class="img-out-container" @click="$store.commit('isAddModule',true)">
                    <img class="add" src="../../public/img/添加.png" alt="添加图标" title="添加图标">
                </div>
                <span>添加图标</span>
            </div>
        </vuedraggable>
        <addModule v-if="addModule"/>
        <menuExpanding v-if="openMenu" :mouseX="targetX" :mouseY="targetY" :index="index"/>
    </div>
</template>

<script>
import vuedraggable from 'vuedraggable';
import addModule from '../components/Add-Module.vue'
import menuExpanding from '../components/Menu-Expanding.vue';
import { mapState } from 'vuex';
export default {
    name:'webExpanding',
    data(){
        return {
            targetX: null,
            targetY: null,
            index: null
        }
    },
    components:{
        addModule,
        vuedraggable,
        menuExpanding
    },
    computed: {
        ...mapState(['addModule','expandings','openMenu'])
    },
    methods:{
        editMenu(e){
            if(e.target.nodeName === 'A'){
                this.index = Number(e.target.dataset.index)
                this.targetX = e.clientX
                this.targetY = e.clientY
                this.$store.commit('isOpenMenu',true)
            }
        },
        closeMenu(){
            if (this.openMenu) {
                this.$store.commit('isOpenMenu',false)
            }
        }
    }
}
</script>

<style scoped>
.out-container{
    display: flex;
    justify-content: flex-start;
    padding-top: 10px;
    flex-wrap: wrap;
    list-style: none;
    width: 100%;
    height: 100%;
    align-content: flex-start;
}

.inner-container{
    background-color: transparent;
    width: 80px;
    height: 80px;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.img-out-container {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex: 1 1 auto;
}

span {
    text-align: center;
    width: 80px;
    height: 20px;
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
}

.add {
    width: 48px;
    height: 48px;
}

a{
    color: white;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    text-decoration: none;
}

a:link,a:visited,a:hover,a:active{
    color: white;
}


</style>