<template>
    <div id="todo-form-wrap">
        <h1>{{todoHeadline}}</h1>
        <form class="addTodoForm" v-on:submit.prevent="emittingTodo">
            <label for="todo-calendar">Gebe die Frist ein:</label>
            <input id="todo-calendar" type="date">
            <label for="todo-input">Gebe einen neuen Eintrag ein:</label>
            <input v-model="newTodo" type="text" id="todo-input" placeholder="Neuer Eintrag" required>
            <button type="submit"> Add</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                todoHeadline: "Simple Todo App",
                newTodo: ""
            }
        },
        mounted() {
            this.$el.querySelector("#todo-form-wrap .addTodoForm input#todo-calendar").value = new Date().toISOString().substring(0, 10);
        },
        methods: {
            emittingTodo() {
                this.$emit("inputData", this.newTodo);
                this.newTodo = "";
            }
        }
    }
</script>

<style lang="scss">
</style>