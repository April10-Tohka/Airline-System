import './assets/main.css'

import { createApp } from 'vue'
import {loadDirectives} from "@/directives/index.js";
import App from './App.vue'
import pinia from "./stores/index.js"
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus);
//加载自定义指令
loadDirectives(app);
app.mount('#app')
