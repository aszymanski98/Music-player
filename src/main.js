import { createApp } from 'vue';
import App from './App.vue';

// Plugins
import VeeValidatePlugin from './includes/validation';
import router from './router';
import store from './store';

// CSS
import '@/assets/tailwind.css';
import '@/assets/main.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VeeValidatePlugin);

app.mount('#app');
