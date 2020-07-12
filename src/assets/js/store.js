import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    todos: localStorage.getItem('simple-todos') != null ? [...JSON.parse(localStorage.getItem(
        'simple-todos'))] : [],
    dones: localStorage.getItem('simple-dones') != null ? [...JSON.parse(localStorage.getItem(
        'simple-dones'))] : []
}

const mutations = {
    addTodo(state, newTodo) {
        state.todos.push(newTodo);
    },
    updateStorage(state) {
        localStorage.setItem('simple-todos', JSON.stringify(state.todos));
        localStorage.setItem('simple-dones', JSON.stringify(state.dones));
    },
    remove(state, currentElement) {
        if (!currentElement[1].status) {
            state.todos.splice(currentElement[0], 1);
        } else {
            state.dones.splice(currentElement[0], 1);
        }
    },
    switchList(state, currentElement) {
        if (!currentElement[1].status) {
            state.dones.push(state.todos.splice(currentElement[0], 1)[0]);
        } else {
            state.todos.push(state.dones.splice(currentElement[0], 1)[0]);
        }

        currentElement[1].status = !currentElement[1].status;
    },
    clone(state, item) {
        if (!item.status) {
            state.todos.push({
                ...item
            });
        } else {
            state.dones.push({
                ...item
            });
        }
    },
}

const actions = {
    addTodo: ({ commit }, newTodo) => commit('addTodo', newTodo),
    updateStorage: ({ commit }) => commit('updateStorage'),
    remove: ({ commit }, currentElement) => commit('remove', currentElement),
    switchList: ({ commit }, currentElement) => commit('switchList', currentElement),
    clone: ({ commit }, item) => commit('clone', item),
}

const getters = {
    list: (state, getters) => {
        return state;
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});