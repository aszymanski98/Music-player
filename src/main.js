import { createApp } from 'vue';
import { auth } from '@/includes/firebase';
import ProgressBar from '@/includes/progress-bar';
import App from './App.vue';
import VeeValidatePlugin from './includes/validation';
import Icon from './directives/icon';
import router from './router';
import store from './store';
import './registerServiceWorker';

// CSS
import '@/assets/tailwind.css';
import '@/assets/main.css';
import 'nprogress/nprogress.css';

ProgressBar(router);

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
