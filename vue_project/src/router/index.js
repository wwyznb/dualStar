//创建应用路由器
import VueRouter from "vue-router";
import webHome from '../pages/web-Home.vue'
import webCollected from '../pages/web-Collected.vue'
import webHistory from '../pages/web-History.vue'
import webAnalysis from '../pages/web-Analysis.vue'
import webProcess from '../pages/web-Process.vue'
import webExpanding from '../pages/web-Expanding.vue'
import webLike from '../pages/web-Like.vue'


export default new VueRouter({
    routes:[
        {
            path:'/home',
            component: webHome
        },
        {
            path:'/collected',
            component: webCollected
        },
        {
            path:'/history',
            component: webHistory
        },
        {
            path:'/analysis',
            component: webAnalysis
        },
        {
            path:'/process',
            component: webProcess
        },
        {
            path:'/expanding',
            component: webExpanding
        },
        {
            path:'/like/:label',
            component: webLike,
            props: true
        },
    ]
})
