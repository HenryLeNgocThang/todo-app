<template>
    <div id="simple-todo-wrap">
        <form v-on:submit.prevent="addTodo">
            <label for="todo-input">Enter your new entry:</label>
            <input v-model="newTodo" type="text" id="todo-input" placeholder="New entry">
            <button type="submit"> Add</button>
        </form>
        <p id="todo-error-message" v-if="errorMessage">{{errorMessage}}</p>
        <h3>Todos:</h3>
        <div class="list" id="todos-list">
            <swipe-list ref="list" class="card" :disabled="!enabled" :items="todos" item-key="id"
                v-on:swipeout:click="itemClick">
                <template v-slot:left="{ item, close, index }">
                    <div class="swipeout-action success" v-on:click="switchList(index, item)">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </div>
                </template>
                <template v-slot="{ item }">
                    <div class="card-content">
                        <p>{{ item.text }}</p>
                    </div>
                </template>
                <template v-slot:right="{ item, close, index }">
                    <div class="swipeout-action success" v-on:click="switchList(index, item)">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </div>
                    <div class="swipeout-action delete" title="remove" v-on:click="removeTodo(index, 1)">
                        <i class="fa fa-trash"></i>
                    </div>
                </template>
            </swipe-list>
        </div>
        <h3>Dones:</h3>
        <div class="list" id="dones-list">
            <swipe-list ref="list" class="card" :disabled="!enabled" :items="dones" item-key="id"
                v-on:swipeout:click="itemClick">
                <template v-slot:left="{ item, close, index }">
                    <div class="swipeout-action reopen" v-on:click="switchList(index, item)">
                        <i class="fa fa-undo" aria-hidden="true"></i>
                    </div>
                </template>
                <template v-slot="{ item }">
                    <div class="card-content">
                        <p>{{ item.text }}</p>
                    </div>
                </template>
                <template v-slot:right="{ item, close, index }">
                    <div class="swipeout-action reopen" v-on:click="switchList(index, item)">
                        <i class="fa fa-undo" aria-hidden="true"></i>
                    </div>
                    <div class="swipeout-action delete" title="remove" v-on:click="removeDone(index, 1)">
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
        data() {
            return {
                enabled: true,
                newTodo: "",
                errorMessage: "",
                todos: localStorage.getItem('simple-todos') != null ? [...JSON.parse(localStorage.getItem(
                    'simple-todos'))] : [],
                dones: localStorage.getItem('simple-dones') != null ? [...JSON.parse(localStorage.getItem(
                    'simple-dones'))] : []
            }
        },
        methods: {
            addTodo: function (e) {
                if (this.newTodo && this.newTodo !== "") {
                    this.todos.push({
                        state: false,
                        text: this.newTodo
                    });

                    localStorage.setItem('simple-todos', JSON.stringify(this.todos));
                    localStorage.setItem('simple-dones', JSON.stringify(this.dones));

                    this.newTodo = "";
                } else {
                    if (this.errorMessage == "") {
                        this.errorMessage = 'Please make sure that the input is not empty!';

                        setTimeout(() => {
                            this.errorMessage = "";
                        }, 5000);
                    }
                }
            },
            switchList: function (index, type) {
                if (!type.state) {
                    this.dones.push(this.todos.splice(index, 1)[0]);
                } else {
                    this.todos.push(this.dones.splice(index, 1)[0]);
                }

                type.state = !type.state;

                localStorage.setItem('simple-todos', JSON.stringify(this.todos));
                localStorage.setItem('simple-dones', JSON.stringify(this.dones));
            },
            removeTodo: function (index, amount) {
                this.todos.splice(index, amount);
                localStorage.setItem('simple-todos', JSON.stringify(this.todos));
            },
            removeDone: function (index, amount) {
                this.dones.splice(index, amount);
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

    $appMaxWidth: 480px;

    // 480     Pixel
    // 768     Pixel
    // 1024    Pixel

    #simple-todo-wrap {
        width: 100%;
        display: block;
        margin: 0 auto;
        padding: 20px;
        max-width: $appMaxWidth;
        font-family: 'Nunito', sans-serif;

        h3 {
            color: $primary-color;
            font-size: 21px;
        }

        p#todo-error-message {
            color: #f00;
            animation: todoErrorMessage 1s ease-in-out 1;
        }

        form {
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
                border: 0;
                outline: 0;
                padding: 15px;
                font-size: 21px;
                border-radius: 0px;
                background: $white;
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);

                &:active,
                &:focus {
                    ~button {
                        padding-left: 40px;

                        &:before {
                            color: $black;
                        }
                    }
                }
            }

            button {
                width: 100%;
                flex: 1 1 25%;
                text-transform: uppercase;
                border: 0;
                outline: 0;
                transition: all .3s ease-in;
                cursor: pointer;
                color: $darkgray;
                background: $primary-color;
                box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
                border-radius: 0px;
                padding: 15px;
                opacity: 1;
                font-size: 21px;
                font-weight: bold;
                position: relative;
                overflow: hidden;

                &:before {
                    position: absolute;
                    top: 50%;
                    transform: translate(-30px, -50%);
                    font-family: FontAwesome;
                    content: "\f067";
                    font-size: 21px;
                    color: $primary-color;
                    transition: .3s ease-in-out all;
                }

                &.focus,
                &.active,
                &:hover {
                    border: 0;
                    padding-left: 40px;

                    &:before {
                        color: $black;
                    }
                }

                &:focus {
                    outline: 0;
                }
            }
        }

        .list#todos-list {
            .swipeout-list-item {
                background: $success;
            }

            .swipeout-content {
                background: $gray;

                p,
                i {
                    color: $white;
                }
            }
        }

        .list#dones-list {
            .swipeout-list-item {
                background: $gray;
            }

            .swipeout-content {
                background: $goldenlineargradient;

                i {
                    color: $darkgray;
                }

                p {
                    text-decoration: line-through;
                    color: $darkgray;
                }
            }
        }

        .list {
            padding: 0;

            .swipeout-list {
                display: flex;
                flex-direction: column;

                .swipeout-list-item {
                    flex: 1;
                    margin: 5px 0;
                    height: auto;
                    min-height: 70px;
                }

                .swipeout {
                    position: relative;
                    overflow: hidden;
                    display: flex;

                    p,
                    i {
                        color: $white;
                    }

                    .swipeout-left,
                    .swipeout-right {
                        position: absolute;
                        height: 100%;
                        display: flex;
                        z-index: 1;
                        right: 0;
                        transform: translateX(100%);

                        .swipeout-action {
                            transition: transform .2s;
                            will-change: transform;
                            width: 70px;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            i {
                                font-size: 30px;
                            }

                            &.success {
                                background-color: $success;
                            }

                            &.reopen {
                                background-color: $gray;
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
                    }

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

    @keyframes todoErrorMessage {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
</style>