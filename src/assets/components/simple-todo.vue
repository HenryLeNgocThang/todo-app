<template>
    <div id="simple-todo-wrap">
        <h3 class="todo-label">Filtern nach:</h3>
        <form class="todo-filter-form" v-on:submit.prevent>
            <div class="flex-wrap">
                <div class="flex-2">
                    <select class="todo-select todo-sort-type" v-on:change="sortArray($event)">
                        <option selected disabled>Bitte wählen</option>
                        <option value="text">Alphabetisch</option>
                        <option value="date">Frist</option>
                        <option value="priority">Priorität</option>
                    </select>
                </div>
                <div class="flex-2">
                    <button class="todo-order-button" v-on:click="revertOrder($event); sortArray($event)"></button>
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
                                        placeholder="Bitte ausfüllen" disabled required>
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
                                        placeholder="Bitte ausfüllen" disabled required>
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

<style lang="scss">
    @import '~scss/style';

    #simple-todo-wrap {
        .todo-order-button {
            &:before {
                content: "\f15d";
                font-family: FontAwesome;
                pointer-events: none;
            }

            &.todo-order-desc {
                &:before {
                    content: "\f15e";
                }
            }
        }

        .list#todos-list {
            .swipeout-list-item {
                background: $black;

                .swipeout-left {
                    .success {
                        background-color: $success;
                    }
                }

                .swipeout-right {
                    .edit {
                        background-color: $black;
                    }
                }
            }

            .swipeout-content {
                background: $goldenlineargradient;

                i {
                    color: $white;
                }

                form.todo-list-item-form {
                    button {
                        i {
                            color: $darkgray;
                        }
                    }
                }
            }
        }

        .list#dones-list {
            .swipeout-list-item {
                background: $black;

                .swipeout-left {
                    .reopen {
                        background: $success;
                    }
                }

                .swipeout-right {
                    .edit {
                        background: $black;
                    }
                }
            }

            .swipeout-content {
                background: $gray;

                form.todo-list-item-form {
                    button {
                        i {
                            color: $white;
                        }
                    }

                    input,
                    select {
                        &[disabled] {
                            color: $white;
                        }
                    }

                    input[type="text"] {
                        &[disabled] {
                            text-decoration: line-through;
                        }
                    }
                }
            }
        }

        .list {
            padding: 0;

            .swipeout--no-transition {
                .swipeout-content {
                    transition: none !important;
                }

                .swipeout-action {
                    transition: none !important;
                }
            }

            .swipeout-non-selectable {
                user-select: none !important;
            }

            .swipeout-no-pointer-events {
                pointer-events: none !important;
            }

            .swipeout-list {
                display: flex;
                flex-direction: column;

                .swipeout-list-item {
                    flex: 1;
                    margin: 5px 0;
                    height: auto;
                    min-height: 90px;
                    border-radius: 2px;
                    animation: rotateListItem 1s ease-in-out 1;
                }

                .swipeout {
                    position: relative;
                    overflow: hidden;
                    display: flex;

                    i {
                        color: $white;
                        pointer-events: none;
                    }

                    .swipeout-left {
                        left: 0;
                        transform: translateX(-100%);
                    }

                    .swipeout-right {
                        right: 0;
                        transform: translateX(100%);
                    }

                    .swipeout-left,
                    .swipeout-right {
                        position: absolute;
                        height: 100%;
                        display: flex;
                        z-index: 1;

                        .swipeout-action {
                            transition: transform .2s;
                            will-change: transform;
                            width: 70px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;

                            i {
                                font-size: 30px;
                            }

                            &.delete {
                                background-color: $alert;
                            }
                        }
                    }

                    .swipeout-content {
                        transition: transform .2s;
                        will-change: transform;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        padding-left: 20px;
                        cursor: grab;

                        &:active {
                            cursor: grabbing;
                        }

                        >div {
                            width: 100%;
                        }

                        form.todo-list-item-form {

                            input,
                            select {
                                min-height: 30px;
                                margin: 2px 0;

                                &[disabled] {
                                    background: transparent;
                                    border: none;
                                    outline: none;
                                    opacity: 1;
                                    color: $darkgray;
                                    cursor: unset;
                                    pointer-events: none;
                                    appearance: none;

                                    ~button[type="submit"] {
                                        display: none;
                                        opacity: 0;
                                        visibility: hidden;
                                    }
                                }
                            }

                            button {
                                font-size: 30px;
                                padding: 0;
                                margin: 0;
                                background: transparent;
                                border: none;
                                outline: none;
                                width: 15%;
                            }

                            input.todoTextInput {
                                width: 85%;
                            }

                            .todo-details {

                                input,
                                select {
                                    font-size: 12px;
                                }
                            }

                            .todo-text {

                                input,
                                select {
                                    font-size: 21px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @keyframes rotateListItem {
        0% {
            transform: rotateX(200deg);
            opacity: 0;
        }

        50% {
            transform: rotateX(30deg);
        }

        75% {
            transform: rotateX(-30deg);
            opacity: 1;
        }

        100% {
            transform: rotateX(0deg);
        }
    }
</style>