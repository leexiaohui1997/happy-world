import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/scss/index.scss';
import router from './router';
import './utils/flexible';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

async function init() {
  app.mount('#app');
}

init();
