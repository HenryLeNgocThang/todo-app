<template>
    <div id="todo-main" class="glide">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <li class="glide__slide">
                    <simple-todo></simple-todo>
                </li>
                <li class="glide__slide">
                    <h2 v-on:click="disableGlide">Hello, World!</h2>
                </li>
                <li class="glide__slide">
                    <h2>Test</h2>
                </li>
            </ul>
        </div>
        <div class="glide">
            <div class="glide__bullets" data-glide-el="controls[nav]">
                <button class="glide__bullet" data-glide-dir="=0"></button>
                <button class="glide__bullet" data-glide-dir="=1"></button>
                <button class="glide__bullet" data-glide-dir="=2"></button>
            </div>
        </div>
    </div>
</template>

<script>
    import Glide, {
        Controls,
        Swipe,
        Anchors
    } from '@glidejs/glide/dist/glide.modular.esm'
    import simpleTodo from './simple-todo.vue'

    let glide;

    export default {
        components: {
            simpleTodo
        },
        data() {
            return {

            }
        },
        mounted() {
            glide = new Glide('#todo-main', {
                type: 'slider',
                gap: 0,
                startAt: 1,
                rewind: false
            }).mount({
                Controls,
                Swipe,
                Anchors
            });

            glide.disable();
        },
        methods: {
            disableGlide() {
                glide.enable();
                console.log("glide has been enabled!");
            }
        },
    }
</script>

<style lang="scss">
    @import '~scss/style';

    #todo-main {
        .glide__slide {
            h2 {
                color: $white;
            }
        }
    }
</style>