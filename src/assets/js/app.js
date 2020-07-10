import Vue from 'vue';
import Paging from '../components/paging.vue';
import A2hs from '../components/a2hs-button.vue';
import ServiceWorker from '../js/sw';

const pagingApp = new Vue({
    render: (h) => h(Paging)
}).$mount('paging');

const a2hsApp = new Vue({
    render: (h) => h(A2hs)
}).$mount('a2hs');