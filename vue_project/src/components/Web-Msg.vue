<template>
    <transition :appear="true">
        <div v-if="msg != null" ref="proMsg" class="promptMessage come">
            <div class="message" :class="msg[1]">
                <i v-show="msg[1] === 'error'" class="icon icon-times"></i>
                <i v-show="msg[1] === 'success'" class="icon icon-check"></i>
                &nbsp;&nbsp;<span>{{msg[0]}}</span>
            </div>
        </div>
    </transition>
</template>


<script>
import { mapState} from 'vuex'
export default {
    name: 'webMsg',
    data(){
        return {

        }
    },
    methods:{
    },
    computed:{
        ...mapState(['msg'])
    },
    watch:{
        msg:{
            handler(newValue){
                if (newValue != null){
                    setTimeout(()=>{
                        this.$store.commit('delMsg')
                    },2000)
                } 
            }
        }
    }
}
</script>

<style scoped>
.promptMessage{
    position: absolute;
    display: flex;
    height: 50px;
    width: 100%;
    background-color: transparent;
    top: 50px;
    justify-content: center;
    z-index: 99999999999;
}
.message {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
    color: white;
    padding: 0 20px;
}

.success {
    background-color: cornflowerblue;
}

.error {
    background-color: red;
}

.v-enter-active {
    animation: wwy 0.5s linear;
}

.v-leave-active {
    animation: wwy 0.5s reverse;
}

@keyframes wwy {
    from {
        opacity: 0;
    }
    to {    
        opacity: 1;
    }
}
</style>
