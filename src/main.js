import Vue from 'vue'
import App from './App.vue'
import vueConfig from 'vue-config'
import appConfig from './config/appConfig'
import Notifications from 'vue-notification'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Notifications);
Vue.use(vueConfig, appConfig);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
