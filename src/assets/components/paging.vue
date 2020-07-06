<template>
    <div id="todo-main" class="glide">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <li class="glide__slide">
                    <simple-todo :addTodo="formData" />
                </li>
                <li class="glide__slide">
                    <todoForm v-on:inputData="updateTodo" />
                </li>
                <li class="glide__slide">
                    <h2>Einstellungen</h2>
                </li>
            </ul>
        </div>
        <div class="bullet-wrap">
            <div class="glide__bullets" data-glide-el="controls[nav]">
                <button class="glide__bullet glide-todo-list" data-glide-dir="=0">
                    <i class="fa fa-list-ul" aria-hidden="true"></i>
                </button>
                <button class="glide__bullet glide-kalender" data-glide-dir="=1">
                    <i class="fa fa-plus-square" aria-hidden="true"></i>
                </button>
                <button class="glide__bullet glide-settings" data-glide-dir="=2">
                    <i class="fa fa-cog" aria-hidden="true"></i>
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

<style lang="scss">
    @import '~scss/style';

    $navheight: 85px;

    #todo-main {
        width: 100%;
        max-width: $appMaxWidth;
        margin: 0 auto;
        padding-bottom: $navheight;
        min-height: 100vh;
        
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

        #todo-form-wrap,
        #simple-todo-wrap {
            width: 100%;
            display: block;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Nunito', sans-serif;
        }

        .bullet-wrap {
            width: 100%;
            max-width: $appMaxWidth;
            position: fixed;
            bottom: 0;
            z-index: 100;

            .glide__bullets {
                display: flex;

                button.glide__bullet {
                    display: block;
                    width: 100%;
                    flex: 1;
                    height: $navheight;
                    padding-bottom: calc(#{$navheight} / 4);
                    border-radius: 0;
                    outline: none;
                    border: none;
                    background: #121212de;
                    backdrop-filter: blur(15px);
                    font-size: 21px;
                    position: relative;
                    color: $primary-color;
                    cursor: pointer;
                    transition: all .3s ease-in-out;

                    &:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -73%);
                        width: 10px;
                        height: 10px;
                        opacity: 0;
                        border-radius: 50%;
                        border: 2px solid $primary-color;
                        transition: all .3s ease-in-out;
                    }


                    &.glide__bullet--active {
                        &:after {
                            width: 40px;
                            height: 40px;
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
</style>