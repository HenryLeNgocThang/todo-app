<template>
    <div id="todo-main" class="glide">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <li class="glide__slide">
                    <simple-todo></simple-todo>
                </li>
                <li class="glide__slide">
                    <h2>Hello, World!</h2>
                </li>
                <li class="glide__slide">
                    <h2>Test</h2>
                </li>
            </ul>
        </div>
        <div class="bullet-wrap">
            <div class="glide__bullets" data-glide-el="controls[nav]">
                <button class="glide__bullet glide-todo-list" data-glide-dir="=0">
                    <p>todo-list</p>
                </button>
                <button class="glide__bullet glide-kalender" data-glide-dir="=1">
                    <p>kalender</p>
                </button>
                <button class="glide__bullet glide-settings" data-glide-dir="=2">
                    <p>settings</p>
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

    let glide;

    export default {
        components: {
            simpleTodo
        },
        data() {
            return {}
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
        watch: {},
        methods: {},
    }
</script>

<style lang="scss">
    @import '~scss/style';

    $navheight: 70px;

    #todo-main {
        width: 100%;
        max-width: $appMaxWidth;
        margin: 0 auto;
        padding-bottom: $navheight;
        min-height: calc(100vh - #{$navheight});

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
                    flex: 1;
                    height: $navheight;
                    border-radius: 0;
                    outline: 0px;
                    border: 0px;
                    background: $white;
                    font-size: 21px;
                    position: relative;
                    transition: all .3s ease-in-out;

                    p {
                        margin: 0;
                        display: inline-block;
                        opacity: 0;
                        padding-left: 30px;
                        transform: translateY(-50%);
                        transition: all .2s ease-in-out;
                    }

                    &:before {
                        font-family: FontAwesome;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        transition: all .2s .2s ease-in-out;
                    }

                    &.glide__bullet--active {
                        &:before {
                            left: 20%;
                            transition: all .2s ease-in-out;
                        }

                        p {
                            opacity: 1;
                            transform: translateY(0);
                            transition: all .2s .2s ease-in-out;
                        }
                    }
                }

                .glide-todo-list {
                    &:before {
                        content: "\f0ca";
                    }
                }

                .glide-kalender {
                    &:before {
                        content: "\f073";
                    }
                }

                .glide-settings {
                    &:before {
                        content: "\f013";
                    }
                }

            }
        }
    }
</style>