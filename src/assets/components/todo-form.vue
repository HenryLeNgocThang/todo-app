<template>
    <div id="todo-form-wrap">
        <h1>{{todoHeadline}}</h1>
        <form class="addTodoForm" v-on:submit.prevent="emittingTodo">
            <div class="flex-wrap">
                <div class="flex-2 flex-padding-right">
                    <label class="todo-label" for="todo-priority">Priority:</label>
                    <select class="todo-select" v-model="newTodo.priority" id="todo-priority" name="todo-priority" required>
                        <option v-for="(priority, index) in options.priorities" v-bind:key="index"
                            v-bind:value="priority">{{priority}}</option>
                    </select>
                </div>
                <div class="flex-2 flex-padding-left">
                    <label class="todo-label" for="todo-calendar">Deadline:</label>
                    <input class="todo-input" v-model="newTodo.date" id="todo-calendar" name="todo-calendar" type="date" required>
                </div>
                <div class="flex-1">
                    <label class="todo-label" for="todo-input">New entry:</label>
                    <div class="flex-wrap">
                        <input class="todo-input" v-model="newTodo.text" type="text" id="todo-input" name="todo-input" placeholder="Neuer Eintrag" required>
                        <button class="todo-button" type="submit"> Add</button>
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
                todoHeadline: "Simple todo app",
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