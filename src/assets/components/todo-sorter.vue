<template>
    <div id="todo-sorter-wrap">
        <form class="todo-sorter-form" v-on:submit.prevent>
            <label class="todo-label" for="todo-sort-type">Sort by:</label>
            <select class="todo-select" id="todo-sort-type" name="todo-sort-type"
                v-on:change="sortArray($event)">
                <option selected disabled>Please choose</option>
                <option value="text">Alphabetical</option>
                <option value="date">Deadline</option>
                <option value="priority">Priority</option>
            </select>
            <button class="todo-order-button todo-button" v-on:click="revertOrder($event); sortArray($event)">
                order</button>
        </form>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        data() {
            return {
                orderDirection: 1,
            }
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
                                "todo-sorter-form")) {
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

                this.$store.state.todos.sort(compare);
                this.$store.state.dones.sort(compare);
            },
        },
    }
</script>