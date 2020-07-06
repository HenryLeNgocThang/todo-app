<template>
    <div id="todo-form-wrap">
        <h1>{{todoHeadline}}</h1>
        <form class="addTodoForm" v-on:submit.prevent="emittingTodo">
            <div class="flex-wrap">
                <div class="flex-2">
                    <label for="todo-priority">Gebe die Priorität an:</label>
                    <select id="todo-priority" required>
                        <option value="Hoch">Hoch</option>
                        <option value="Normal" selected>Normal</option>
                        <option value="Gering">Gering</option>
                    </select>
                </div>
                <div class="flex-2">
                    <label for="todo-calendar">Gebe die Frist ein:</label>
                    <input id="todo-calendar" type="date" required>
                </div>
                <div class="flex-1">
                    <label for="todo-input">Gebe einen neuen Eintrag ein:</label>
                    <div class="flex-wrap">
                        <input v-model="newTodo.text" type="text" id="todo-input" placeholder="Neuer Eintrag" required>
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
                    todoText: "",
                    priority: "",
                    date: ""
                },
                todoMessage: ""
            }
        },
        mounted() {
            this.$el.querySelector("#todo-form-wrap .addTodoForm input#todo-calendar").value = new Date().toISOString()
                .substring(0, 10);
        },
        methods: {
            emittingTodo() {
                this.$emit("inputData", this.newTodo);
                this.todoMessage = "Neuer Eintrag wurde erfolgreich hinzugefügt."

                setTimeout(() => {
                    this.todoMessage = ""
                }, 5000);

                this.newTodo = { };
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
            }
        }

        form.addTodoForm {
            .flex-wrap {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                position: relative;

                .flex-2 {
                    width: 50%;
                    flex: 1 1 50%;

                    &:first-child {
                        padding-right: 10px;
                    }

                    &:nth-child(2) {
                        padding-left: 10px;
                    }
                }

                .flex-1 {
                    width: 100%;
                    flex: 1 1 100%;
                }
            }

            label {
                color: $primary-color;
                font-size: 21px;
                font-weight: bold;
                width: 100%;
                display: block;
                margin: 20px 0 5px;
            }

            label[for="todo-input"] {
                flex: 1 1 100%;
            }

            select,
            input {
                display: block;
                width: 100%;
                color: $darkgray;
                border: none;
                outline: none;
                padding: 15px;
                font-size: 21px;
                border-radius: 0px;
                max-height: 54px;
                background: $white;
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
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