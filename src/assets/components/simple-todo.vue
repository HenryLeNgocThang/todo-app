<template>
    <div id="simple-todo-wrap">
        <form class="todo-filter-form" v-on:submit.prevent>
            <div class="flex-wrap">
                <div class="flex-1">
                    <label class="todo-label" for="todo-sort-type">Filter by:</label>
                </div>
                <div class="flex-2 flex-padding-right">
                    <select class="todo-select" id="todo-sort-type" v-on:change="sortArray($event)">
                        <option selected disabled>Please choose</option>
                        <option value="text">Alphabetical</option>
                        <option value="date">Deadline</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>
                <div class="flex-2 flex-padding-left">
                    <button class="todo-order-button todo-button" v-on:click="revertOrder($event); sortArray($event)"> order</button>
                </div>
            </div>
        </form>
        <h3 class="todo-label">Todos:</h3>
        <div class="list" id="todos-list">
            <swipe-list ref="list" class="card swipeout-non-selectable" v-bind:disabled="!enabled" v-bind:items="todos"
                item-key="id" v-on:swipeout:click="itemClick">
                <template v-slot:left="{ item, close, index }">
                    <div class="swipeout-action success" v-on:click="switchList(index, item)">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </div>
                    <div class="swipeout-action clone" v-on:click="clone(item)">
                        <i class="fa fa-clone" aria-hidden="true"></i>
                    </div>
                </template>
                <template v-slot="{ item }">
                    <div class="card-content">
                        <form class="todo-list-item-form" v-on:submit.prevent="save($event, item)">
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
                    <div class="swipeout-action delete" title="remove" v-on:click="remove(item, index, 1)">
                        <i class="fa fa-trash"></i>
                    </div>
                </template>
            </swipe-list>
        </div>
        <h3 class="todo-label">Dones:</h3>
        <div class="list" id="dones-list">
            <swipe-list ref="list" class="card swipeout-non-selectable" v-bind:disabled="!enabled" v-bind:items="dones"
                item-key="id" v-on:swipeout:click="itemClick">
                <template v-slot:left="{ item, close, index }">
                    <div class="swipeout-action reopen" v-on:click="switchList(index, item)">
                        <i class="fa fa-undo" aria-hidden="true"></i>
                    </div>
                    <div class="swipeout-action clone" v-on:click="clone(item)">
                        <i class="fa fa-clone" aria-hidden="true"></i>
                    </div>
                </template>
                <template v-slot="{ item }">
                    <div class="card-content">
                        <form class="todo-list-item-form" v-on:submit.prevent="save($event, item)">
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
                    <div class="swipeout-action delete" title="remove" v-on:click="remove(item, index, 1)">
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

    export default {
        components: {
            SwipeOut,
            SwipeList
        },
        props: {
            addTodo: {
                type: Object
            }
        },
        data() {
            return {
                enabled: true,
                orderDirection: 1,
                todos: localStorage.getItem('simple-todos') != null ? [...JSON.parse(localStorage.getItem(
                    'simple-todos'))] : [],
                dones: localStorage.getItem('simple-dones') != null ? [...JSON.parse(localStorage.getItem(
                    'simple-dones'))] : []
            }
        },
        watch: {
            addTodo() {
                if (this.addTodo && this.addTodo !== null && this.addTodo !== "undefined") {
                    this.addTodo["state"] = false;
                    this.todos.push(this.addTodo);

                    this.updateStorage();
                }
            },
        },
        methods: {
            revertOrder(e) {
                e.target.classList.toggle("todo-order-desc");
                this.orderDirection *= -1;
            },
            sortArray(e) {
                let sortEvent = e;

                const compare = (a, b) => {
                    let sortTypeSelect = null;

                    sortEvent.path.forEach(element => {
                        if (element instanceof HTMLFormElement && element.classList.contains(
                                "todo-filter-form")) {
                            sortTypeSelect = element.querySelector("select.todo-select");
                        }
                    });

                    if (a.hasOwnProperty(sortTypeSelect.value) && b.hasOwnProperty(sortTypeSelect.value)) {
                        const bandA = a[sortTypeSelect.value].toUpperCase();
                        const bandB = b[sortTypeSelect.value].toUpperCase();
                        let comparison = 0;

                        if (bandA > bandB) {
                            comparison = 1;
                        } else if (bandA < bandB) {
                            comparison = -1;
                        }

                        if (this.orderDirection === -1) {
                            return comparison * (-1)
                        } else {
                            return comparison
                        }
                    } else {
                        return null;
                    }
                }

                this.todos.sort(compare);
                this.dones.sort(compare);
            },
            switchList(index, type) {
                if (!type.state) {
                    this.dones.push(this.todos.splice(index, 1)[0]);
                } else {
                    this.todos.push(this.dones.splice(index, 1)[0]);
                }

                type.state = !type.state;
                this.updateStorage();
            },
            remove(type, index, amount) {
                if (!type.state) {
                    this.todos.splice(index, amount);
                    this.updateStorage();
                } else {
                    this.dones.splice(index, amount);
                    this.updateStorage();
                }
            },
            clone(type) {
                if (!type.state) {
                    this.todos.push({
                        ...type
                    });
                } else {
                    this.dones.push({
                        ...type
                    });
                }

                this.updateStorage();
            },
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

                this.updateStorage();
            },
            updateStorage() {
                localStorage.setItem('simple-todos', JSON.stringify(this.todos));
                localStorage.setItem('simple-dones', JSON.stringify(this.dones));
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