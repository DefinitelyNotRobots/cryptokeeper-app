import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import './main.css';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.component('RouterLink', Vue.component('router-link'));
Vue.component('RouterView', Vue.component('router-view'));

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
