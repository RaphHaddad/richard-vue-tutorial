import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mgr from './security/security.js'
import axios from 'axios'

const globalData = {
  isAuthenticated: false,
  user: '',
  mgr: mgr
}

const globalMethods = {
  async authenticate(returnPath) {
    const user = await this.$root.getUser(); //see if the user details are in local storage
    if (!!user) {
      this.isAuthenticated = true;
      this.user = user;
    } else {
      await this.$root.signIn(returnPath);
    }
  },
  async getUser () {
    try {
      let user = await this.mgr.getUser();
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  signIn (returnPath) {
    returnPath ? this.mgr.signinRedirect({ state: returnPath })
        : this.mgr.signinRedirect();
  }
}
let v = new Vue({
  router,
  data: globalData,
  methods: globalMethods,
  render: h => h(App),
}).$mount('#app')

axios.interceptors.request.use((config) => {
  const user = v.$root.user;
  if (user) {
    const authToken = user.access_token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
  }
  return config;
},
(err) => {
  console.log("error");
  //What do you want to do when a call fails?
});
