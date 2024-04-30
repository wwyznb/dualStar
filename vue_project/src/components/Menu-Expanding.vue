<template>
    <div>
        <ul ref="ulMenu" class="ul-menu" >
            <li @mouseup="delModule">删除</li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'menuExpanding',
    data(){
        return {

        }
    },
    computed:{
        ...mapState(['expandings'])
    },
    props:['index','mouseX','mouseY'],
    mounted() {
        this.$refs.ulMenu.style.left = this.mouseX + 'px'
        this.$refs.ulMenu.style.top = this.mouseY + 'px'
    },
    methods:{
        delModule(){
            this.$store.commit('delExpandingList',this.index)
            localStorage.setItem('Expandings',JSON.stringify(this.expandings))
        }
    }
}
</script>

<style scoped>
.ul-menu {
    list-style: none;
    background-color: red;
    padding: 0px;
    background-color: rgb(15,12,12,0.8);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    position: fixed;
}

li {
    width: 100px;
    display: flex;
    height: 20px;
    justify-content: center;
    align-items: center;
    margin: 5px;
    border-radius: 5px;
}

li:hover {
    background-color: rgb(104, 104, 104);
}
</style>