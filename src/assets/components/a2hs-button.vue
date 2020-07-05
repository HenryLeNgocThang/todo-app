<template>
    <button id="a2hs-button" v-on:click="openPrompt" v-if="display"><i class="fa fa-download" aria-hidden="true"></i> {{buttonText}}</button>
</template>

<script>
    const cookieHelper = require('../../helpers/cookie-helper');
    let deferredPrompt;

    export default {
        data() {
            return {
                display: true,
                buttonText: "Install App now!"
            }
        },
        created: function () {
            if (!cookieHelper.getCookie("promptA2HS")) {
                cookieHelper.setCookie("promptA2HS", true, 1);

                if (!cookieHelper.getCookie("A2HSInstalled")) {
                    window.addEventListener('beforeinstallprompt', (e) => {
                        e.preventDefault();
                        deferredPrompt = e;
                    });
                } else {
                  this.display = !this.display;
                }
            } else {
                this.display = !this.display;
            }
        },
        methods: {
            openPrompt: function () {
                this.display = !this.display;

                // Show the prompt, catch the error and log results instead
                deferredPrompt.prompt()
                    .then(res => console.log('User has ' + res.outcome + ' the prompt.'))
                    .catch(error => {
                        console.log(`----> ${error}`)
                    })

                // Wait for the users choice
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User ' + choiceResult.outcome +
                            ' the prompt.');
                        this.display = !this.display;
                        cookieHelper.setCookie("A2HSInstalled", true);
                        location.reload();
                    } else {
                        cookieHelper.setCookie("promptA2HS", true, 1);
                        this.display = !this.display;
                    }

                    deferredPrompt = null;
                });
            }
        }
    }
</script>

<style lang="scss">
    @import '~scss/style';

    #a2hs-button {
        position: fixed;
        top: 5%;
        right: 5%;
        z-index: 100;
        display: block;
        animation: a2hs 1s ease-in-out 1;
        width: auto;
        height: auto;
        border: 0;
        outline: 0;
        transition: all .3s ease-in;
        cursor: pointer;
        background: $primary-color;
        color: $darkgray;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        padding: 10px;
        opacity: 1;
        font-size: 16px;
        font-weight: bold;

        &.focus,
        &.active,
        &:hover {
            background: $primary-color-lighten;
        }

        &:focus {
            outline: 0;
        }
    }

    @keyframes a2hs {
        0% {
            right: -5%;
        }

        50% {
            right: 6%;
        }

        75% {
            right: 4%;
        }

        100% {
            right: 5%;
        }
    }
</style>