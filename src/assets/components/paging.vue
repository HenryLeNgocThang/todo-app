<template>
    <div id="todo-main" class="glide">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <li class="glide__slide">
                    <simple-todo v-bind:addTodo="formData" />
                </li>
                <li class="glide__slide">
                    <todoForm v-on:inputData="updateTodo" />
                </li>
                <li class="glide__slide">
                    <h2 style="color: white;">Einstellungen</h2>
                </li>
            </ul>
        </div>
        <div class="bullet-wrap">
            <div class="glide__bullets" data-glide-el="controls[nav]">
                <button name="glide-todo-list" class="glide__bullet glide-todo-list" data-glide-dir="=0">
                    <i class="fa fa-list-ul" aria-hidden="true"></i><span>List</span>
                </button>
                <button name="glide-kalender" class="glide__bullet glide-kalender" data-glide-dir="=1">
                    <i class="fa fa-plus-square" aria-hidden="true"></i><span>New</span>
                </button>
                <button name="glide-settings" class="glide__bullet glide-settings" data-glide-dir="=2">
                    <i class="fa fa-cog" aria-hidden="true"></i><span>Edit</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Glide, {
        Controls
    } from '@glidejs/glide/dist/glide.modular.esm'
    import simpleTodo from './simple-todo.vue'
    import todoForm from './todo-form.vue'

    let glide;

    export default {
        components: {
            simpleTodo,
            todoForm
        },
        data() {
            return {
                formData: {}
            }
        },
        mounted() {
            glide = new Glide('#todo-main', {
                type: 'slider',
                gap: 0,
                startAt: 1,
                rewind: false
            }).mount({
                Controls
            });
        },
        methods: {
            updateTodo(payload) {
                this.formData = payload;
            }
        },
    }
</script>