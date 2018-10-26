<template>
  <div id="app">
    <Header 
      :user="user"
      :onSignOut="handleSignOut"
    />
    <RouterView 
      :user="user"
      :onUser="handleUser"
    />
    <Footer />
  </div>
</template>

<script>
import { getToken, signOut, getMe } from './services/api';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    Header, Footer
  },
  data() {
    return {
      user: null,
      token: null
    };
  },
  created() {
    this.token = getToken();
    getMe().then(user => this.user = user);
  },
  methods: {
    handleUser(user) {
      console.log(user);
      this.user = user;
      this.token = getToken();
    },
    handleSignOut() {
      signOut();
      this.user = null;
      this.$router.push('/');
    },
  }
};

</script>

<style>

.Chart {
  background: #212733;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  25px 0;
}

.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}
</style>
