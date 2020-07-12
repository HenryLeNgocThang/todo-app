<template>
    <div id="todo-list-wrap">
        <h3 class="todo-label">Todos:</h3>
        <div class="list" id="todos-list">
            <swipe-list ref="list" class="card swipeout-non-selectable" v-bind:disabled="!enabled"
                v-bind:items="$store.state.todos" item-key="id" v-on:swipeout:click="itemClick">
                <template v-slot:left="{ item, close, index }">
                    <div class="swipeout-action success" v-on:click="switchList([index, item]); updateStorage()">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </div>
                    <div class="swipeout-action clone" v-on:click="clone(item); updateStorage()">
                        <i class="fa fa-clone" aria-hidden="true"></i>
                    </div>
                </template>
                <template v-slot="{ item }">
                    <div class="card-content">
                        <form class="todo-list-item-form" v-on:submit.prevent="save($event, item); updateStorage()">
                            <div class="flex-wrap">
                                <div class="flex-1 todo-details">
                                    <select v-bind:value="item.priority" disabled required>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                    <input type="date" v-bind:value="item.date" disabled required>
                                </div>
                                <div class="flex-1 display-flex todo-text">
                                    <input class="todoTextInput" type="text" v-bind:value="item.text"
                                        placeholder="Please enter entry" disabled required>
                                    <button type="submit"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </template>
                <template v-slot:right="{ item, close, index }">
                    <div class="swipeout-action edit" v-on:click="edit($event), close()">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </div>
                    <div class="swipeout-action delete" title="remove"
                        v-on:click="remove([index, item]); updateStorage()">
                        <i class="fa fa-trash"></i>
                    </div>
                </template>
            </swipe-list>
        </div>
        <h3 class="todo-label">Dones:</h3>
        <div class="list" id="dones-list">
            <swipe-list ref="list" class="card swipeout-non-selectable" v-bind:disabled="!enabled"
                v-bind:items="$store.state.dones" item-key="id" v-on:swipeout:click="itemClick">
                <template v-slot:left="{ item, close, index }">
                    <div class="swipeout-action reopen" v-on:click="switchList([index, item]); updateStorage()">
                        <i class="fa fa-undo" aria-hidden="true"></i>
                    </div>
                    <div class="swipeout-action clone" v-on:click="clone(item); updateStorage()">
                        <i class="fa fa-clone" aria-hidden="true"></i>
                    </div>
                </template>
                <template v-slot="{ item }">
                    <div class="card-content">
                        <form class="todo-list-item-form" v-on:submit.prevent="save($event, item); updateStorage()">
                            <div class="flex-wrap">
                                <div class="flex-1 todo-details">
                                    <select v-bind:value="item.priority" disabled required>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                    <input type="date" v-bind:value="item.date" disabled required>
                                </div>
                                <div class="flex-1 display-flex todo-text">
                                    <input class="todoTextInput" type="text" v-bind:value="item.text"
                                        placeholder="Please enter entry" disabled required>
                                    <button type="submit"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </template>
                <template v-slot:right="{ item, close, index }">
                    <div class="swipeout-action edit" v-on:click="edit($event), close()">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </div>
                    <div class="swipeout-action delete" title="remove"
                        v-on:click="remove([index, item]); updateStorage()">
                        <i class="fa fa-trash"></i>
                    </div>
                </template>
            </swipe-list>
        </div>

    </div>
</template>

<script>
    import {
        SwipeList,
        SwipeOut
    } from 'vue-swipe-actions';
    import {
        mapActions
    } from "vuex";

    export default {
        components: {
            SwipeOut,
            SwipeList
        },
        data() {
            return {
                enabled: true,
            }
        },
        methods: {
            ...mapActions([
                'updateStorage',
                'remove',
                'switchList',
                'clone',
            ]),
            edit(e) {
                let listItems = e.toElement.parentElement.parentElement.querySelectorAll(
                    ".todo-list-item-form input, .todo-list-item-form select");

                listItems.forEach(element => {
                    if (element.disabled) {
                        element.disabled = false;
                        element.focus();
                    } else {
                        element.disabled = true;
                    }
                });
            },
            save(e, item) {
                let listItems = e.target.querySelectorAll("input, select");

                listItems.forEach((element, index) => {
                    switch (index) {
                        case 0:
                            item.priority = element.value;
                            break;
                        case 1:
                            item.date = element.value;
                            break;
                        case 2:
                            item.text = element.value;
                            break;
                        default:
                            break;
                    }

                    element.disabled = true;
                });
            },
            revealFirstRight() {
                this.$refs.list.revealRight(0);
            },
            revealFirstLeft() {
                this.$refs.list.revealLeft(0);
            },
            closeFirst() {
                this.$refs.list.closeActions(0);
            },
            closeAll() {
                this.$refs.list.closeActions();
            },
            itemClick(e) {},
            fbClick(e) {},
            sbClick(e) {},
        },
    }
</script>