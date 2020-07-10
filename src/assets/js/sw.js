if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            navigator.serviceWorker.ready.then(() => {
                console.log('SW registered and activated: ', registration);
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                });
            })
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });

        navigator.serviceWorker.ready.then((serviceWorker) => {
            let todos = localStorage.getItem('simple-todos') != null ? [...JSON.parse(localStorage.getItem(
                'simple-todos'))] : [];
            const dateToday = new Date().toISOString().substring(0, 10);

            todos.forEach(todo => {
                if (todo.date < dateToday) {
                    console.log("past");
                } else if (todo.date > dateToday) {
                    console.log("future");
                } else {
                    serviceWorker.showNotification("Todo for today", {
                        body: todo.priority + ": " + todo.text,
                    })
                }
            });
        })
    });
} else {
    console.error('Push messaging is not supported!');
};