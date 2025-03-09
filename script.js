document.addEventListener("DOMContentLoaded", function () {
    console.log("Fenrir Finds is ready to hunt deals!");

    // Check if Firebase is loaded correctly
    if (window.firebaseApp) {
        console.log("✅ Firebase is successfully initialized!", window.firebaseApp);
    } else {
        console.error("❌ Firebase failed to initialize. Check your configuration.");
    }
});
