if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log("SW registered: ", registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });

        navigator.serviceWorker.ready.then((serviceWorker) => {
            const pushManagerOptions = {
                userVisibleOnly: true,
            }

            serviceWorker.pushManager.permissionState(pushManagerOptions).then((PushMessagingState) => {
                switch (PushMessagingState) {
                    case "prompt":
                        serviceWorker.pushManager.subscribe(pushManagerOptions);
                        break;
                    case "granted":
                        displayNotification();
                        break;
                    default:
                        console.log("Notification denied!");
                        break;
                }

                function displayNotification() {
                    const dateToday = new Date().toISOString().substring(0, 10);
                    let todos = localStorage.getItem('simple-todos') != null ? [...JSON.parse(localStorage.getItem(
                        'simple-todos'))] : [];
                    let past = 0;
                    let today = 0;

                    for (let i = 0; i < todos.length; i++) {
                        const todo = todos[i];

                        if (todo.date < dateToday) {
                            past++;
                        } else if (todo.date == dateToday) {
                            today++;
                        }

                        if (i == todos.length - 1) {
                            serviceWorker.showNotification("Simple TODO App", {
                                body: "Missed TODOs: " + past + ".\nTODOs today: " + today,
                                icon: "/assets/img/logo.png",
                                badge: "/assets/img/icons/logo-192x192.png",
                            })
                        }
                    }
                }
            });
        })
    });
} else {
    console.error('Service Worker or Push Manager is not supported!');
};