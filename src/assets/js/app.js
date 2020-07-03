import Vue from 'vue';
import SimpleTodo from '../components/simple-todo.vue';
import A2hs from '../components/a2hs-button.vue';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
};

const simpleTodoApp = new Vue({
    render: (h) => h(SimpleTodo)
}).$mount('simple-todo');

const a2hsApp = new Vue({
    render: (h) => h(A2hs)
}).$mount('a2hs');