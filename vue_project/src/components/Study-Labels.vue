<template>
    <div ref="labelsOuter" class="outer">
        <studyLabel/>
        <input ref="studyLabelsShowArea" type="text" placeholder="请选择你的学习标签" @focus="startSelect" @blur="stopSelect">
        <i class="icon icon-search"></i><br>
        <div v-show="show" ref="selectDiv" class="selectDiv" @mousedown="optionItem">
            <p v-for="items in updateList" :key="items.id">{{items.name}}</p>
        </div>
    </div>
</template>

<script>
import studyLabel from './Study-Label.vue'
import { mapState } from 'vuex'
export default {
    name:'studyLabels',
    data(){
        return {
            show: false,
            list: [
                {id:'001',name:'美食'},
                {id:'002',name:'IT'},
                {id:'003',name:'职业技能'},
                {id:'004',name:'语言'},
                {id:'005',name:'四六级'},
                {id:'006',name:'考公考研'},
                {id:'007',name:'养生健身'},
            ],
            
        }
    },
    methods: {
        startSelect(){
            this.show = true
            this.$refs.labelsOuter.style.position = 'absolute'
        },
        stopSelect(){
            this.show = false
            this.$refs.labelsOuter.style.position = 'static'
        },
        optionItem(e){
            const a = this.list.find(element => {
                return element.name === e.target.innerText   
            });
            this.$store.commit('insertLabels',a)
        }
    },
    computed:{
        ...mapState(['userInfo']),
        updateList(){
            let array = []
            this.list.forEach(e1 => {
                let isFalse = false
                for(let k in this.userInfo.labels) {
                    if (this.userInfo.labels[k].id === e1.id) {
                        isFalse = true
                        break;
                    }
                }
                if((array.includes(e1) === false) && (isFalse === false)){
                    array.push(e1)
                }
            })
            this.userInfo.labels?.forEach(e2 => {
                    if(array.includes(e2)){
                       const index = array.indexOf(e2)
                       array.splice(index,1)
                    }
                })
            return array
        }
    },
    components: {
        studyLabel
    }
}

</script>


<style scoped>
    .outer {
        border: 1px solid black;
        background-color: white;
        width: 200px;
    }
    input {
        border: none;
        outline: none;
    }
    .selectDiv{
        border: none;
        width: 100%;
        color: black;
        position: relative;
    }

    p {
        margin: 0;
        height: 30px;
        line-height: 30px;
    }
    p:hover {
        background-color: #a4eef8;
        cursor: pointer;

    }
</style>