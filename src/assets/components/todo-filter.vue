<template>
    <div id="todo-filter-wrap">
        <form class="todo-filter-form" v-on:submit.prevent>
            <div class="flex-wrap">
                <div class="flex-1">
                    <h3 class="todo-label">Filter by:</h3>
                </div>
                <div class="flex-2 flex-padding-right">
                    <label class="hidden" for="todo-filter-priority">Priority</label>
                    <select class="todo-select" id="todo-filter-priority" name="todo-filter-priority" v-on:change="filterArray">
                        <option selected disabled>Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div class="flex-2 flex-padding-left">
                    <label class="hidden" for="todo-filter-date">Date</label>
                    <input class="todo-input" type="date" id="todo-filter-date" name="todo-filter-date" v-on:change="filterArray">
                </div>
                <div class="flex-2">
                    <div class="flex-wrap">
                        <div class="flex-2 flex-padding-right">
                            <button class="todo-filter-button todo-button" v-on:click="filterArray">
                                <span class="hidden">filter</span></button>
                        </div>
                        <div class="flex-2 flex-padding-left">
                            <button class="todo-filter-reset todo-button" v-on:click="filterArray">
                                <span class="hidden">reset</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";

    export default {
        data() {
            return {
                filter: []
            }
        },
        methods: {
            filterArray(e) {
                let sortEvent = e;

                const compare = (object) => {
                    let filterForm;
                    let filterElements = [];
                    this.filter = [];

                    console.log(object);

                    sortEvent.path.forEach(element => {
                        if (element instanceof HTMLFormElement && element.classList.contains(
                                "todo-filter-form")) {
                            filterForm = element;
                        }
                    });

                    filterElements = filterForm.querySelectorAll("select.todo-select, input.todo-input");

                    filterElements.forEach(element => {
                        this.filter.push(element.value);

                        if (object.hasOwnProperty(element.value)) {
                            console.log(element.value);
                            return true;
                        }
                    });
                }

                this.$store.state.todos.filter(compare);
                this.$store.state.dones.filter(compare);
            },
        },
    }
</script>