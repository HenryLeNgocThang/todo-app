<template>
    <div id="todo-form-wrap">
        <h1>{{todoHeadline}}</h1>
        <form class="addTodoForm" v-on:submit.prevent="emittingTodo">
            <div class="flex-wrap">
                <div class="flex-2">
                    <label class="todo-label" for="todo-priority">Priorität:</label>
                    <select class="todo-select" v-model="newTodo.priority" id="todo-priority" required>
                        <option v-for="(priority, index) in options.priorities" v-bind:key="index"
                            v-bind:value="priority">{{priority}}</option>
                    </select>
                </div>
                <div class="flex-2">
                    <label class="todo-label" for="todo-calendar">Frist:</label>
                    <input class="todo-input" v-model="newTodo.date" id="todo-calendar" type="date" required>
                </div>
                <div class="flex-1">
                    <label class="todo-label" for="todo-input">Neuer Eintrag:</label>
                    <div class="flex-wrap">
                        <input class="todo-input" v-model="newTodo.text" type="text" id="todo-input" placeholder="Neuer Eintrag" required>
                        <button type="submit"> Add</button>
                    </div>
                </div>
            </div>
        </form>
        <div id="todo-form-message">
            <p>{{todoMessage}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                todoHeadline: "Simple Todo App",
                newTodo: {
                    text: "",
                    priority: "",
                    date: ""
                },
                todoMessage: "",
                options: {
                    priorities: {
                        a: "High",
                        b: "Medium",
                        c: "Low"
                    }
                }
            }
        },
        mounted() {
            const priorityArray = Object.keys(this.options.priorities);

            this.newTodo.date = new Date().toISOString().substring(0, 10);
            this.newTodo.priority = this.options.priorities[priorityArray[Math.round(priorityArray.length / 2 - 1)]];
        },
        methods: {
            emittingTodo() {
                const priorityArray = Object.keys(this.options.priorities);

                this.$emit("inputData", this.newTodo);
                this.todoMessage = "Neuer Eintrag wurde erfolgreich hinzugefügt."

                setTimeout(() => {
                    this.todoMessage = ""
                }, 5000);

                this.newTodo = {};
                this.newTodo.date = new Date().toISOString().substring(0, 10);
                this.newTodo.priority = this.options.priorities[priorityArray[Math.round(priorityArray.length / 2 -
                1)]];

                this.newTodo.text = "";
            }
        }
    }
</script>

<style lang="scss">
    @import '~scss/style';

    #todo-form-wrap {
        #todo-form-message {
            p {
                color: $success;
                font-size: 21px;
                margin-bottom: 0;
            }
        }

        form.addTodoForm {
            label[for="todo-input"] {
                flex: 1 1 100%;
            }

            select {
                cursor: pointer;
            }


            input#todo-input {
                flex: 1 1 65%;

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
                        opacity: 1;
                    }
                }

                &:focus {
                    outline: none;
                }
            }
        }
    }
</style>