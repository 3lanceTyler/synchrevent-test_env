function shouldYouBeHere () {
    // Returning if no eventID assigned
    if (sessionStorage.userID == undefined) {
        window.location.href = "index.html";
        return;
    }
}

function displayUserInfo () {
    document.getElementById('userAccountName').textContent = localStorage.getItem('username');
    document.getElementById('userAccountEmail').textContent = localStorage.getItem('email');
}

function getUserEventList (uid) {

    let con = "https://primary-production-9330.up.railway.app/webhook/synchrevent/account_dashboard";
    let url = con + "?userID=" + uid;

    fetch(url)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);

        // No events found for user
        if (data.noEvents) {
            console.log("No Events Found");
            document.getElementById('eventListing').style.display = "block";
            document.getElementById('accountEventList').style.display = "none";
            return;
        }

        if (data.noEvents == undefined) {
            document.getElementById('eventListing').style.display = "none";
            document.getElementById('accountEventList').style.display = "block";
        }




        displayData(data.events);

    })
    .catch(error => {
        console.log(error);
    });
}

function displayData(data) {
    const eventListContainer = document.getElementById('accountEventList');

    // Clear existing content
    eventListContainer.innerHTML = '';

    // Loop through the data and create HTML elements
if (Array.isArray(data)) {
    data.forEach(event => {
        const eventItem = document.createElement('p');
        eventItem.innerHTML = `<button class="button" onclick="manageEventLoad(${event.eventID}, true)">Manage</button> <button class="button" onclick="manageEventLoad(${event.eventID}, false)">Load</button> ${event.eventName}`;
        eventListContainer.appendChild(eventItem);
    });
} else {
    const eventItem = document.createElement('p');
        eventItem.innerHTML = `<button class="button" onclick="manageEventLoad(${data.eventID}, true)">Manage</button> <button class="button" onclick="manageEventLoad(${data.eventID}, false)">Load</button> ${data.eventName}`;
        eventListContainer.appendChild(eventItem);
}
}

function manageEventLoad (eid, manage) {

    sessionStorage.setItem('eventID', eid);
    sessionStorage.setItem('manager', true);

    if (manage) {
        window.location.href = "headCounter_Settings.html";
    } else {
        window.location.href = "headCounter.html";
    }

    

}

// shouldYouBeHere();