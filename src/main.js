import { createApp } from 'vue';
import { auth } from '@/includes/firebase';
import App from './App.vue';
import VeeValidatePlugin from './includes/validation';
import Icon from './directives/icon';
import router from './router';
import store from './store';

// CSS
import '@/assets/tailwind.css';
import '@/assets/main.css';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(router);
    app.use(store);
    app.use(VeeValidatePlugin);
    app.directive('icon', Icon);

    app.mount('#app');
  }
});
