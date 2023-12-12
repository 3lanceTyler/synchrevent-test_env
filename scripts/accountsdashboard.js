function shouldYouBeHere () {
    // Returning if no eventID assigned
    if (sessionStorage.userID == undefined) {
        window.location.href = "index.html";
        return;
    }
}

// shouldYouBeHere();