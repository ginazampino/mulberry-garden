import './scss/index.scss';

import App from './vue/App.vue';
import Vue from 'vue';
import Router from './router.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwPagination from 'jw-vue-pagination';

Vue.use(VueAxios, axios);
Vue.component('jw-pagination', JwPagination);

new Vue({
    components: {App},
    el: '#app',
    router: Router,
    template: '<App></App>'
});
