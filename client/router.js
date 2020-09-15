import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/:name/:id',
            component: require('./vue/lightbox.vue').default
        }
    ]
});