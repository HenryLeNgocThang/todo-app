import Vue from 'vue';
import store from './store';
import SimpleTodo from '../components/simple-todo.vue';
import A2hs from '../components/a2hs-button.vue';
import ServiceWorker from './sw';


window.addEventListener('load', () => {
    const simpleTodo = new Vue({
        store,
        render: (h) => h(SimpleTodo)
    }).$mount('simple-todo');
    
    const a2hsApp = new Vue({
        render: (h) => h(A2hs)
    }).$mount('a2hs');
});