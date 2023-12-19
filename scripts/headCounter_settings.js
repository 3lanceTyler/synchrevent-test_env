let tempTable = 987654;

// Requesting Data from N8N    
function dataCall () { 


    // Returning if no eventID assigned
    // if (sessionStorage.eventID == undefined) {
    //     window.location.href = "accountsdashboard.html";
    //     return;
    // }

    
    let con = "https://primary-production-9330.up.railway.app/webhook/head_counter/data_collect?eventID=" + tempTable;
    fetch(con)
.then(res => {
    // Converting data to usable JSON
    return res.json();
})
    .then(data => {
        console.log(data);

        let $totalInbound = data.totalMinorsIn + data.totalAdultsIn + data.totalWcIn;
        let $totalOutbound = data.totalMinorsOut + data.totalAdultsOut + data.totalWcOut;
        
        // Adjusting HTML element to show data
        document.getElementById('currentAdults').textContent = data.currentAdults;
        document.getElementById('currentMinors').textContent = data.currentMinors;
        document.getElementById('currentWc').textContent = data.currentWc;
        document.getElementById('currentTotal').textContent = data.currentCapacity;

        document.getElementById('adultsTotalIn').textContent = data.totalAdultsIn;
        document.getElementById('adultsTotalOut').textContent = data.totalAdultsOut;

        document.getElementById('minorsTotalIn').textContent = data.totalMinorsIn;
        document.getElementById('minorsTotalOut').textContent = data.totalMinorsOut;

        document.getElementById('TotalIn').textContent = $totalInbound;
        document.getElementById('TotalOut').textContent = $totalOutbound;

        document.getElementById('wcTotalIn').textContent = data.totalWcIn;
        document.getElementById('wcTotalOut').textContent = data.totalWcOut;

        let $capacityMsg = "0";
        if (data.currentCapacity >= data.maxCapacity) {
            $capacityMsg = " !!! CAPACITY REACHED !!!";
        } else {
            $capacityMsg = "";
        }

        document.getElementById('maxCapacity').textContent = data.maxCapacity + $capacityMsg;
        document.getElementById('capacityEdit').placeholder = "Current Capacity: " + data.maxCapacity;

        document.getElementById('eventName').textContent = data.eventName;
        document.getElementById('eventNameEdit').placeholder = "Current Name: " + data.eventName;

        document.getElementById('errorPopup').style.display = "none";
        document.getElementById('errorMsg').textContent = "";

        // Updating entry block status / switch
        if (data.entryBlock == 1) {
            document.getElementById('entryStop').checked = true;
            document.getElementById('entryStat').textContent = "Entry Halted";
        } else {
            document.getElementById('entryStop').checked = false;
            document.getElementById('entryStat').textContent = "Entry Allowed";
        }

        document.getElementById('currentAccessCode').textContent = data.accessCode;


    })
    .catch(error => {
        console.log(error);
        document.getElementById('errorPopup').style.display = "block";
        document.getElementById('errorMsg').textContent = "Error establishing connection with Database.";
    }
    );
}


    let setCon = "https://primary-production-9330.up.railway.app/webhook/head_counter/settings";

// TOGGLING THE ENTRY STATUS (WITH CONFIRMATION AND CANCLE)
function entryCheck () {
    var tog = document.getElementById('entryStop');

    let question = "?action=updateEntryblock";

    if (tog.checked) {
        let text = "Confirm you would like to halt entry?";
        if (confirm(text) == true) {
            alert("Entry has been halted!");

            let val = "&value=1";
            let eid = "&eid=" + tempTable;
            let toSend = setCon + question + val + eid;
                fetch(toSend)

        }

    } else {
        let text = "Confirm you would like to enable entry?";
        if (confirm(text) == true) {
            alert("Entry has been allowed!");

            let val = "&value=0";
            let eid = "&eid=" + tempTable;
            let toSend = setCon + question + val + eid;
                fetch(toSend)

        }
    }
}

// FETCHING THE INITAL ENTRY STATUS VIA THE CHECK BOX
function entryCheckInit () {
    var tog = document.getElementById('entryStop');

    if (tog.checked) {
        document.getElementById('entryStat').textContent = "Entry Halted";        
    } else {
        document.getElementById('entryStat').textContent = "Entry Allowed";
    }
}



// RESETTING HEAD COUNTER TABLE VALUES TO 0
function masterReset () {
    

    let text = "Confirm you would like to reset the head counter values to 0?";
    if (confirm(text) == true) {
        // CONFIRMING MASTER RESET
        let subText = "Are you sure you want to reset? (LAST CHANCE TO BACK OUT!)"
        if (confirm(subText) == true) {
            // MASTER RESET CONFIRMED
            alert("Table values have been reset!");

            let question = "?action=resetHeadcountertable"
            let val = "&value=0";
            let eid = "&eid=" + tempTable;
            let toSend = setCon + question + val + eid;
                fetch(toSend)

        } else {
            alert("Value reset cancelled.");
        }
        
    } else { 
        alert("Value reset cancelled.");
    }
}

// GENERATING A NEW ACCESS CODE
function generateNewAccessCode () {
    

    let text = "Confirm you would like to generate a new ACCESS CODE?";
    if (confirm(text) == true) {
        // CONFIRMING MASTER RESET
        let subText = "Are you sure you want to set a new code? (This will disconnect everybody from the evnt page.)"
        if (confirm(subText) == true) {
            // MASTER RESET CONFIRMED
            alert("Access code has been reset");

            let question = "?action=generateNewAccessCode"
            let val = "&value=0";
            let eid = "&eid=" + tempTable;
            let toSend = setCon + question + val + eid;
                fetch(toSend)
                    setTimeout(() => {
                        dataCall();
                    }, 1000);

        } else {
            alert("New code generation cancelled!");
        }
        
    } else { 
        alert("New code generation cancelled!");
    }
}


// CONFIRMING EVENT NAME EDIT
function editEventName () {
    let newEventName = document.getElementById('eventNameEdit').value;
    let text = "Confirm you would like to adjust the event name to '" + newEventName + "'";
    if (newEventName != "") {
        if (confirm(text) == true) {
            // UPDATING EVENT NAME
            alert("Event name has been updated to '" + newEventName + "'");
            document.getElementById('eventNameEdit').value = "";

            let question = "?action=updateName"
            let val = "&value=" + newEventName;
            let eid = "&eid=" + tempTable;
            let toSend = setCon + question + val + eid;
                fetch(toSend)

        } else {
            alert("Event name has NOT been adjusted.");
            document.getElementById('eventNameEdit').value = "";
        }
    } else {
        alert("You need to specify a new name before updating.")
    }
}


// CONFIRMING MAX CAPACITY EDIT
function editMaxCapacity () {
    let newCapacity = document.getElementById('capacityEdit').value;
    let text = "Confirm you would like to adjust the event capacity to '" + newCapacity + "'";
    if (newCapacity != "") {
        if (confirm(text) == true) {
            if (!isNaN(newCapacity)) {
                // UPDATING CAPACITY
                alert("Event capacity has been updated to '" + newCapacity + "'");
                document.getElementById('capacityEdit').value = "";

                let question = "?action=updateCapacity"
                let val = "&value=" + newCapacity;
                let eid = "&eid=" + tempTable;
                let toSend = setCon + question + val + eid;
                    fetch(toSend)

            } else {
                alert("ERROR > '" + newCapacity + "' IS AN INVALID NUMBER - Capacity not adjusted.");
                document.getElementById('capacityEdit').value = "";
            }
        } else {
            alert("Event capacity has NOT been adjusted.");
            document.getElementById('capacityEdit').value = "";
        }
    } else {
        alert("You need to specify a new capacity before updating.")
    }
}

function incidentLogRetrieval () {
    
    let con = "https://primary-production-9330.up.railway.app/webhook/synchrevent/event_incident";
    let call = "?method=dataGrab";
    let eid = "&eventID=" + sessionStorage.eventID;
    let url = con + call + eid;

    fetch(url)
    .then(res => {
        // Converting returned data to usable JSON
        return res.json();
    })
    .then(data => {
        console.log(data.incidents);

        const eventListContainer = document.getElementById('incidentLogFeed');

        // Clear existing content
        eventListContainer.innerHTML = '';
    
        // Loop through the data and create HTML elements
    if (Array.isArray(data.incidents)) {
        const reversedIncidents = data.incidents.slice().reverse();

        reversedIncidents.forEach(event => {
            const eventItem = document.createElement('p');

            if (event.type == undefined) {
                eventItem.innerHTML = "No incidents reported yet!";
                eventListContainer.appendChild(eventItem);
                return;
            }


            let ackMsg = "";
            let resMsg = "";
            let ackBut = `<button onClick="incidentRespond('acknowledge', ${event.id})" type="button" class="acknowledgeIncident button">Acknowledge</button>`;
            let resBut = `<button onClick="incidentRespond('resolve', ${event.id})" type="button" class="resolveIncident button">Resolve</button>`;

            if (event.acknowledgeMsg != null) {
                ackMsg = `<div class="IIAM shadow3in"><p class="IIFL">${event.acknowledgeMsg}</p> <p class="IIFR">${event.acknowledgeTime}<br />CONTROL</p></div>`;
                ackBut = "";
            }

            if (event.resolvedMsg != null) {
                resMsg = `<div class="IIRM shadow3in"><p class="IIFL">${event.resolvedMsg}</p> <p class="IIFR">${event.resolvedTime}<br />CONTROL</p></div>`;
                resBut = "";
                ackBut = "";
            }


            eventItem.innerHTML = `<div class="IIC shadow5in">
            <div class="IITM"><h4 class="IIFL">Incident: ${event.type}</h4>  <h4 class="IIFR"><button onClick="incidentRespond('delete', ${event.id})" type="button" class="resolveIncident button">Remove Incident</button> Status: ${event.status}</h4></div>
            <div class="IIIM shadow3in"><p class="IIFL">${event.initialMsg}</p> <p class="IIFR">${event.creationTime}<br />${event.author}</p></div>`
            + ackMsg + resMsg +
            ackBut + resBut
            + `</div>`;
            eventListContainer.appendChild(eventItem);
        });
    } else {
        const eventItem = document.createElement('p');

        if (data.type == undefined) {
            eventItem.innerHTML = "No incidents reported yet!";
            eventListContainer.appendChild(eventItem);
            return;
        }


        let ackMsg = "";
        let resMsg = "";
        let ackBut = `<button onClick="incidentRespond('acknowledge', ${data.id})" type="button" class="acknowledgeIncident button">Acknowledge</button>`;
            let resBut = `<button onClick="incidentRespond('resolve', ${data.id}")" type="button" class="resolveIncident button">Resolve</button>`;

        if (data.acknowledgeMsg != null) {
            ackMsg = `<div class="IIAM shadow3in"><p class="IIFL">${data.acknowledgeMsg}</p> <p class="IIFR">${data.acknowledgeTime}<br />CONTROL</p></div>`;
            ackBut = "";
        }

        if (data.resolvedMsg != null) {
            resMsg = `<div class="IIRM shadow3in"><p class="IIFL">${data.resolvedMsg}</p> <p class="IIFR">${data.resolvedTime}<br />CONTROL</p></div>`;
            ackBut = "";
            resBut = "";
        }


            eventItem.innerHTML = `<div class="IIC shadow5in">
            <div class="IITM"><h4 class="IIFL">Incident: ${data.type}</h4> <h4 class="IIFR"><button onClick="incidentRespond('delete', ${data.id})" type="button" class="resolveIncident button">Remove Incident</button> Status: ${data.status}</h4></div>
            <div class="IIIM shadow3in"><p class="IIFL">${data.initialMsg}</p> <p class="IIFR">${data.creationTime}<br />${data.author}</p></div>`
            + ackMsg + resMsg +
            ackBut + resBut
            + `</div>`;
            eventListContainer.appendChild(eventItem);
    }


    })
    .catch(error => {
        console.log(error);
    });
}


function selectNewIncident (bid) {
    // ENABLING ALL BUTTONS
    document.getElementById('riFIRE').disabled = false;  
    document.getElementById('riSECURITY').disabled = false;  
    document.getElementById('riMEDICAL').disabled = false;  
    document.getElementById('riLOST').disabled = false;  
    document.getElementById('riTECH').disabled = false;  
    document.getElementById('riGENERAL').disabled = false;
    
    // DISABLING THE TOGGLED BUTTON
    setTimeout(() => {
        document.getElementById(bid).disabled = true;
    }, 100);
}


function submitNewIncidentReport () {
    let context = document.getElementById('reportIncidentMsgInput');

    // FINDING THE SELECTED INCIDENT TYPE

    let incType = (() => {
    if (document.getElementById('riGENERAL').disabled == true) {
        return "GENERAL";
    }
    if (document.getElementById('riFIRE').disabled == true) {
        return "FIRE";
    }
    if (document.getElementById('riSECURITY').disabled == true) {
        return "SECURITY";
    }
    if (document.getElementById('riMEDICAL').disabled == true) {
        return "MEDICAL";
    }
    if (document.getElementById('riLOST').disabled == true) {
        return "LOST CHILD";
    }
    if (document.getElementById('riTECH').disabled == true) {
        return "TECHNICAL";
    }
    })();


    // CHECKING TEXT HAS BEEN PROVIDED
    let incRep = (() =>{
        if (context.checkValidity()) {
            return "true";
        } else {
            return "false";
        }
    })();
    

    let newIncSubmitRun = (() => {
        if (incType != undefined) {
            if (incRep != "false") {
                return "run";
            } else { return "noRun"; }
        } else { return "noRun"; }
    })();

    if (newIncSubmitRun == "run") {
        // SUCCESSFULLY FILLED INCIDENT REPORT
        console.log("Submit run");
            let con = "https://primary-production-9330.up.railway.app/webhook/synchrevent/event_incident";
            let call = "?method=reportSubmit";
            let eid = "&eventID=" + sessionStorage.getItem('eventID');
            let type = "&type=" + incType;
            let msg = "&msg=" + document.getElementById('reportIncidentMsgInput').value;
            let author = "&user=" + sessionStorage.getItem('displayName');
            let url = con + call + eid + type + msg + author;

            fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                if(data.success == true) {
                    document.getElementById('reportIncidentMsgInput').value = "";
                    document.getElementById('reportIncident').textContent = "Report New Incident";
                    selectNewIncident("riGENERAL");
                    document.getElementById('newIncidentContainer').style.display = "none";
                    incidentLogRetrieval();
                }
            })
            .catch(error => {
                console.log(error);
            })
        
    } else {
        // FAILED TO SUCCESSFULLY FILL INCIDENT REPORT
        console.log("Submit no Run");

    }
    


}

function showHideNewIncidents () {
    if (document.getElementById('newIncidentContainer').style.display == "none") {

        document.getElementById('newIncidentContainer').style.display = "block";
        document.getElementById('reportIncident').textContent = "Close";
    } else {

        document.getElementById('newIncidentContainer').style.display = "none";
        document.getElementById('reportIncidentMsgInput').value = "";
        selectNewIncident("riGENERAL");
        document.getElementById('reportIncident').textContent = "Report New Incident";
    }
}


function incidentRespond (action, iid) {

    // action = delete/resolve/acknowledge
    let tInTitle;
    if (action == "acknowledge") {
        console.log('acknowledge');
        sessionStorage.setItem('incidentResponseType', 'acknowledge');
        sessionStorage.setItem('incidentResponseID', iid);
        tInTitle = "Acknowledgement";
    }

    if (action == "resolve") {
        console.log('resolve');
        sessionStorage.setItem('incidentResponseType','resolve');
        sessionStorage.setItem('incidentResponseID', iid);
        tInTitle = "Resolution";
    }

    if (action == "delete") {
        console.log("delete");
        sessionStorage.setItem('incidentResponseType', 'delete');

            if (confirm("Are you sure you want to delete this incident? ( !!! THIS CAN NOT BE REVERSED !!! )") == false) {
                return;
            };

        let con = "https://primary-production-9330.up.railway.app/webhook/synchrevent/event_incident?method=reportDelete&incidentID=" + iid;

        fetch(con)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.success == true) {
                incidentLogRetrieval();
                hideElement("respondTextContainer");
                setTimeout(() => {
                    alert("Incident report deleted successfully");
                }, 100);
            } else {
                hideElement("respondTextContainer");
                setTimeout(() => {
                    alert("Failed to delete incident report - try again");
                }, 100);
            }
        })
        .catch(error => {
            console.log(error);
        })

        return;
    }

    document.getElementById('respondTextContainer').style.display = "block";
    document.getElementById('incidentResponseInput').value = "";
    document.getElementById('incidentResponseTypeTitle').textContent = tInTitle;
} 

function submitIncidentRespond () {
    if (!document.getElementById('incidentResponseInput').checkValidity()) {
        return;
    }

    
    let con = "https://primary-production-9330.up.railway.app/webhook/synchrevent/event_incident";
    let q;
        if (sessionStorage.getItem('incidentResponseType') == 'acknowledge') {
            q = "?method=reportAcknowledge";
        }

        if (sessionStorage.getItem('incidentResponseType') =='resolve') {
            q = "?method=reportResolve";
        }

    
    let iid = "&incidentID=" + sessionStorage.getItem('incidentResponseID');
    let msg = "&message=" + encodeURI(document.getElementById('incidentResponseInput').value);

    fetch(con + q + iid + msg)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        if (data.success == true) {
            incidentLogRetrieval();
            hideElement("respondTextContainer");
            setTimeout(() => {
                alert("Response submitted successfully");
            }, 100);
        } else {
            hideElement("respondTextContainer");
            setTimeout(() => {
                alert("Failed to submit response - try again");
            }, 100);
        }
    })
    .catch(error => {
        console.log(error);
    })

}


function hideElement (eid) {
    document.getElementById(eid).style.display = "none";
}


// Re-requesting data every 1 seconds
// setInterval(() => dataCall(), 1000);
// Initial data request for first load
dataCall();
entryCheckInit();
selectNewIncident("riGENERAL");
incidentLogRetrieval();