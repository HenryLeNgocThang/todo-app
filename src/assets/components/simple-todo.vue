<template>
    <div id="simple-todo-wrap">
        <h3>Todos:</h3>
        <div class="list" id="todos-list">
            <swipe-list ref="list" class="card swipeout-non-selectable" :disabled="!enabled" :items="todos"
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
                            <input type="text" :value="item.text" placeholder="Bitte ausfüllen" readonly required>
                            <button type="submit"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
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
        <h3>Dones:</h3>
        <div class="list" id="dones-list">
            <swipe-list ref="list" class="card swipeout-non-selectable" :disabled="!enabled" :items="dones"
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
                            <input type="text" :value="item.text" readonly>
                            <button type="submit"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
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
                type: String
            }
        },
        data() {
            return {
                enabled: true,
                todos: localStorage.getItem('simple-todos') != null ? [...JSON.parse(localStorage.getItem(
                    'simple-todos'))] : [],
                dones: localStorage.getItem('simple-dones') != null ? [...JSON.parse(localStorage.getItem(
                    'simple-dones'))] : []
            }
        },
        watch: {
            addTodo() {
                if (this.addTodo && this.addTodo !== "") {
                    this.todos.push({
                        state: false,
                        text: this.addTodo
                    });

                    this.updateStorage();
                }
            },
        },
        methods: {
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
                        state: type.state,
                        text: type.text
                    });
                } else {
                    this.dones.push({
                        state: type.state,
                        text: type.text
                    });
                }

                this.updateStorage();
            },
            edit(e) {
                let listItemInput = e.toElement.parentElement.parentElement.getElementsByTagName("input")[0];

                if (listItemInput.readOnly) {
                    let input = listItemInput;
                    input.readOnly = false;
                    input.focus();
                } else {
                    let input = listItemInput;
                    input.readOnly = true;
                }
            },
            save(e, item) {
                let listItemInput = e.target.querySelector("input");

                item.text = listItemInput.value;
                listItemInput.readOnly = true;
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

    // 480     Pixel
    // 768     Pixel
    // 1024    Pixel

    #simple-todo-wrap {
        width: 100%;
        display: block;
        margin: 0 auto;
        padding: 20px;
        font-family: 'Nunito', sans-serif;

        h1 {
            text-align: center;
            font-family: "Nunito", sans-serif;
            font-weight: bold;
            color: $primary-color;
            font-size: 40px;
            margin-top: 20px;
        }

        h3 {
            color: $primary-color;
            font-size: 21px;
        }

        form.addTodoForm {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            position: relative;

            label {
                flex: 1 1 100%;
                color: $primary-color;
                font-size: 21px;
                font-weight: bold;
                margin-bottom: 10px;
            }

            input {
                width: 100%;
                flex: 1 1 65%;
                color: $darkgray;
                border: none;
                outline: none;
                padding: 15px;
                font-size: 21px;
                border-radius: 0px;
                background: $white;
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;

                &:active,
                &:focus {
                    ~button {
                        padding-left: 40px;

                        &:before {
                            opacity: 1;
                        }
                    }
                }
            }

            button {
                width: 100%;
                flex: 1 1 25%;
                text-transform: uppercase;
                border: none;
                outline: none;
                transition: all .3s ease-in;
                cursor: pointer;
                color: $darkgray;
                background: $goldenlineargradient;
                box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
                border-radius: 0px;
                padding: 15px;
                opacity: 1;
                font-size: 21px;
                font-weight: bold;
                position: relative;
                overflow: hidden;
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;

                &:before {
                    position: absolute;
                    top: 50%;
                    transform: translate(-30px, -50%);
                    font-family: FontAwesome;
                    content: "\f067";
                    font-size: 21px;
                    opacity: 0;
                    color: $darkgray;
                    transition: .3s ease-in-out all;
                }

                &.focus,
                &.active,
                &:hover {
                    border: none;
                    padding-left: 40px;

                    &:before {
                        color: $black;
                    }
                }

                &:focus {
                    outline: none;
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

                input {
                    &[readonly] {
                        background: transparent;
                        border: none;
                        outline: none;

                        ~button[type="submit"] {
                            display: none;
                            opacity: 0;
                            visibility: hidden;
                        }
                    }
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

                input {
                    &[readonly] {
                        background: transparent;
                        text-decoration: line-through;
                        border: none;
                        outline: none;
                        color: $white;

                        ~button[type="submit"] {
                            display: none;
                            opacity: 0;
                            visibility: hidden;
                        }
                    }
                }

                form.todo-list-item-form {
                    button {
                        i {
                            color: $white;
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
                    min-height: 70px;
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

                        input {
                            font-size: 18px;
                            color: $darkgray;

                            &[readonly] {
                                cursor: unset;
                            }
                        }

                        >div {
                            width: 100%;
                        }

                        form.todo-list-item-form {
                            display: flex;

                            button {
                                font-size: 30px;
                                padding: 0;
                                margin: 0;
                                background: transparent;
                                border: none;
                                outline: none;
                                width: 15%;
                            }

                            input {
                                width: 85%;
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