import { createApp } from 'vue'
import App from './App.vue'
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';

createApp(App).use(Chartkick.use(Chart)).mount('#app')
