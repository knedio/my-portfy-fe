import '@/assets/styles/main.css';
import '@/assets/styles/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(MotionPlugin);

app.mount('#app');
