<template>
    <button class="todo-button" id="a2hs-button" v-on:click="openPrompt" v-if="display"><i class="fa fa-download"
            aria-hidden="true"></i> {{buttonText}}</button>
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