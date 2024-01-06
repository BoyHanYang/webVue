import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';

import { createPinia } from 'pinia' 
import piniaPersist from 'pinia-plugin-persist'
import 'ant-design-vue/dist/reset.css';
import router from './router/index.js';

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

app.use(pinia);
app.use(Antd);
app.use(router);

const vm = app.mount('#app');