const butInstall = document.getElementById("buttonInstall");

//Global variable
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
    //Prevent the default prompt
    event.preventDefault();

    //Store the event for later use
    deferredPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
    //Validate if deferredPrompt is available
    if(deferredPrompt) {
        try {
            //Manual trigger of prompt
            await deferredPrompt.prompt();

            //Dont know how long it will take for a response. Wait for user to respond
            const choiceResult = await deferredPrompt.userChoice;

            if(choiceResult.outcome === "accepted") {
                console.log("User accepted the installation");
            }else {
                console.log("User declined the installation");
            }
        }
    }

});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {});
