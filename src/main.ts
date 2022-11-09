import { createApp } from 'vue'
import '@/assets/css/base.scss'
import '@/assets/css/iconfont.css'
import router from './router/index'
import App from './App.vue'
import 'vant/es/toast/style';
createApp(App).use(router).mount('#app')
