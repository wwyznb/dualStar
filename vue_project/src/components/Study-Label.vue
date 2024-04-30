<template>
    <div style="display: inline-block;">
        <div class='label' v-for="items in userInfo.labels" :key="items.id">
            <span>{{ items.name}}</span>
            <i class="icon icon-times" @click.stop='delLabel($event,items.id)'></i>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'studyLabel',
    data(){
        return {

        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods: {
        delLabel(e,value){
           e.target.parentNode.parentNode.removeChild(e.target.parentNode)
           this.$store.commit('delLabels',value)
        }
    }
}
</script>

<style scoped>
.label {
    display: inline-block;
    text-align: center;
    background-color: rgb(235, 231, 231);
    color: black;
    border-radius: 5px;
    margin: 0 2px;
}

</style>
