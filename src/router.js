import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Team from './components/Team.vue';
import Auth from './components/Auth.vue';
import Logout from './components/Logout.vue';
import Dashboard from './components/Dashboard.vue';


export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/team', component: Team },
    { path: '/auth', component: Auth },
    { path: '/logout', component: Logout },
    { path: '/dashboard', component: Dashboard },
    { path: '*', redirect: '/' }
  ]
});
