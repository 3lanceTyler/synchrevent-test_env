let $buttonRunStat = false;

function runHook(qry, qty, btid) {

            if (sessionStorage.eventID == undefined) {
                return;
            }

    $buttonRunStat = true;
    document.getElementById(btid).disabled = true;

    let con = "https://primary-production-9330.up.railway.app/webhook/head_counter/action?query=";
    let ques = qry + "&quantity=" + qty + "&eventID=" + sessionStorage.eventID;
    let url = con + ques;

            fetch(url)
                .then(updated => {
                    return updated.json();
                })
                    .then(updatedData => {
                        // Adjusting HTML element to show data
                        document.getElementById('currentAdults').textContent = updatedData.currentAdults;
                        document.getElementById('currentMinors').textContent = updatedData.currentMinors;
                        document.getElementById('currentWc').textContent = updatedData.currentWc;
                        document.getElementById('currentTotal').textContent = updatedData.currentCapacity;

                        document.getElementById('adultsTotalIn').textContent = updatedData.totalAdultsIn;
                        document.getElementById('adultsTotalOut').textContent = updatedData.totalAdultsOut;

                        document.getElementById('minorsTotalIn').textContent = updatedData.totalMinorsIn;
                        document.getElementById('minorsTotalOut').textContent = updatedData.totalMinorsOut;

                        document.getElementById('TotalIn').textContent = updatedData.totalMinorsIn + updatedData.totalAdultsIn + updatedData.totalWcIn;
                        document.getElementById('TotalOut').textContent = updatedData.totalMinorsOut + updatedData.totalAdultsOut + updatedData.totalWcOut;

                        document.getElementById('wcTotalIn').textContent = updatedData.totalWcIn;
                        document.getElementById('wcTotalOut').textContent = updatedData.totalWcOut;

                        document.getElementById('maxCapacity').textContent = updatedData.maxCapacity;



                        let $inButtonsNorun = false;
                        if (updatedData.entryBlock == 1) {
                            $inButtonsNorun = true;
                        } 
                        
                        setTimeout(function() {
                            

                        // CHECKING CAPACITY HAS NOT EXCEEDED, IF SO DISABLING "IN" BUTTONS
                    if ($inButtonsNorun == false) {
                        if (updatedData.currentCapacity < updatedData.maxCapacity) {
                            document.getElementById("adultINButton").disabled = false;
                            document.getElementById("minorINButton").disabled = false;
                            document.getElementById("wcINButton").disabled = false;
                        } else if (updatedData.currentCapacity > updatedData.maxCapacity) {
                            document.getElementById("adultINButton").disabled = true;
                            document.getElementById("minorINButton").disabled = true;
                            document.getElementById("wcINButton").disabled = true;
                        } else if (updatedData.currentCapacity >= updatedData.maxCapacity) {
                            document.getElementById("adultINButton").disabled = true;
                            document.getElementById("minorINButton").disabled = true;
                            document.getElementById("wcINButton").disabled = true;
                        }
                    }

                        // DISABLING OUT BUTTONS IF CAPACITY AT 0
                        if (updatedData.currentWc <= updatedData.minCapacity) {
                            document.getElementById("wcOUTButton").disabled = true;
                        } else {
                            document.getElementById("wcOUTButton").disabled = false;
                        }

                        if (updatedData.currentAdults <= updatedData.minCapacity) {
                            document.getElementById("adultOUTButton").disabled = true;
                        } else {
                            document.getElementById("adultOUTButton").disabled = false;
                        }

                        if (updatedData.currentMinors <= updatedData.minCapacity) {
                            document.getElementById("minorOUTButton").disabled = true;
                        } else {
                            document.getElementById("minorOUTButton").disabled = false;
                        }

                        
                    $buttonRunStat = false;

                        
                }, 500);
                    


                    })
                    .catch(error => {
                        console.log(error);
                        document.getElementById('errorPopup').style.display = "block";
                        document.getElementById('errorMsg').textContent = "Error establishing connection with Database - ACTION NOT ISSUED.";
                    }
                    );
        };


        

                // Requesting Data from N8N    
function dataCall(buttonRunStat) { if (!$buttonRunStat) { 
                    
                    // Returning if no eventID assigned
                    // if (sessionStorage.eventID == undefined) {
                    //     window.location.href = "index.html";
                    //     return;
                    // }


                    // Set display name popup
                    if (sessionStorage.displayName == undefined) {
                        document.getElementById('fullyBody').style.display = "none";
                        document.getElementById('setDisplayNameContainer').style.display = "block";
                        document.getElementById('setNameTitle').textContent = "Set Your Name To View This Event";
                        return;
                    }

                    document.getElementById('helloUser').textContent = "Hello, " + sessionStorage.displayName + "!";

                    let con = "https://primary-production-9330.up.railway.app/webhook/head_counter/data_collect?eventID=" + sessionStorage.eventID;
                    fetch(con)
                .then(res => {
                    // Converting data to usable JSON
                    return res.json();
                })
                    .then(data => {

                        // Returning to homepage if accessCode mismateches on any call - manager exception
                    // if (!sessionStorage.manager) {
                    //     if (sessionStorage.accessCode != data.accessCode) {
                    //         sessionStorage.removeItem("eventID");
                    //         sessionStorage.removeItem("accessCode");
                    //         window.location.href = "index.html";
                    //         return;
                    //     }
                    // }


                        console.log(data);
                        // Adjusting HTML element to show data
                        document.getElementById('currentAdults').textContent = data.currentAdults;
                        document.getElementById('currentMinors').textContent = data.currentMinors;
                        document.getElementById('currentWc').textContent = data.currentWc;
                        document.getElementById('currentTotal').textContent = data.currentCapacity;

                        document.getElementById('adultsTotalIn').textContent = data.totalAdultsIn;
                        document.getElementById('adultsTotalOut').textContent = data.totalAdultsOut;

                        document.getElementById('minorsTotalIn').textContent = data.totalMinorsIn;
                        document.getElementById('minorsTotalOut').textContent = data.totalMinorsOut;

                        document.getElementById('TotalIn').textContent = data.totalMinorsIn + data.totalAdultsIn + data.totalWcIn;
                        document.getElementById('TotalOut').textContent = data.totalMinorsOut + data.totalAdultsOut + data.totalWcOut;

                        document.getElementById('wcTotalIn').textContent = data.totalWcIn;
                        document.getElementById('wcTotalOut').textContent = data.totalWcOut;

                        
                        document.getElementById('eventName').textContent = data.eventName;

                        document.getElementById('errorPopup').style.display = "none";
                        document.getElementById('errorMsg').textContent = "";



                        let $capacityMsg = "";
                        if (data.currentCapacity >= data.maxCapacity) {
                            $capacityMsg = " !!! CAPACITY REACHED !!!";
                        }

                        document.getElementById('maxCapacity').textContent = data.maxCapacity + $capacityMsg;


                        let $inButtonsNorun = false;
                        if (data.entryBlock == 1) {
                            document.getElementById('ebp1').style.display = "block";
                            document.getElementById('ebp2').style.display = "block";
                            document.getElementById("adultINButton").disabled = true;
                            document.getElementById("minorINButton").disabled = true;
                            document.getElementById("wcINButton").disabled = true;
                            document.getElementById("wcOUTButton").disabled = true;
                            document.getElementById("adultOUTButton").disabled = true;
                            document.getElementById("minorOUTButton").disabled = true;
                            $inButtonsNorun = true;
                        } else {
                            document.getElementById('ebp1').style.display = "none";
                            document.getElementById('ebp2').style.display = "none";
                            document.getElementById("adultINButton").disabled = false;
                            document.getElementById("minorINButton").disabled = false;
                            document.getElementById("wcINButton").disabled = false;
                            document.getElementById("wcOUTButton").disabled = false;
                            document.getElementById("adultOUTButton").disabled = false;
                            document.getElementById("minorOUTButton").disabled = false;
                        }



                        // CHECKING CAPACITY HAS NOT EXCEEDED, IF SO DISABLING "IN" 
                    if ($inButtonsNorun == false) {
                        if (data.currentCapacity < data.maxCapacity) {
                            document.getElementById("adultINButton").disabled = false;
                            document.getElementById("minorINButton").disabled = false;
                            document.getElementById("wcINButton").disabled = false;
                        } else if (data.currentCapacity > data.maxCapacity) {
                            document.getElementById("adultINButton").disabled = true;
                            document.getElementById("minorINButton").disabled = true;
                            document.getElementById("wcINButton").disabled = true;
                        } else if (data.currentCapacity >= data.maxCapacity) {
                            document.getElementById("adultINButton").disabled = true;
                            document.getElementById("minorINButton").disabled = true;
                            document.getElementById("wcINButton").disabled = true;
                        }
                    }

                        // DISABLING OUT BUTTONS IF CAPACITY AT 0
                        if (data.currentWc <= data.minCapacity) {
                            document.getElementById("wcOUTButton").disabled = true;
                        } else {
                            document.getElementById("wcOUTButton").disabled = false;
                        }

                        if (data.currentAdults <= data.minCapacity) {
                            document.getElementById("adultOUTButton").disabled = true;
                        } else {
                            document.getElementById("adultOUTButton").disabled = false;
                        }

                        if (data.currentMinors <= data.minCapacity) {
                            document.getElementById("minorOUTButton").disabled = true;
                        } else {
                            document.getElementById("minorOUTButton").disabled = false;
                        }
                        

                    })
                    .catch(error => {
                        document.getElementById('errorPopup').style.display = "block";
                        document.getElementById('errorMsg').textContent = "Error establishing connection with Database.";
                        document.getElementById("adultINButton").disabled = true;
                        document.getElementById("minorINButton").disabled = true;
                        document.getElementById("wcINButton").disabled = true;
                        document.getElementById("wcOUTButton").disabled = true;
                        document.getElementById("adultOUTButton").disabled = true;
                        document.getElementById("minorOUTButton").disabled = true;
                    }
                    );
                }
                }



function submitDisplayName () {

    if (document.getElementById('firstNameInput').value == "") {
        return;
    }
    if (document.getElementById('lastInitialInput').value == "") {
        return;
    }

    let displayName = document.getElementById('firstNameInput').value + " " + document.getElementById('lastInitialInput').value;
    sessionStorage.setItem("displayName", displayName);
    console.log(sessionStorage.getItem("displayName"));
    document.getElementById('nameInputContainer').style.display = "none";
    document.getElementById('setNameTitle').textContent = "Name successfully set!";

    dataCall($buttonRunStat);

        setTimeout(() => {
            document.getElementById('fullyBody').style.display = "block";
            document.getElementById('setDisplayNameContainer').style.display = "none";
        }, 1000);
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

            if (event.acknowledgeMsg != null) {
                ackMsg = `<div class="IIAM shadow3in"><p class="IIFL">${event.acknowledgeMsg}</p> <p class="IIFR">${event.acknowledgeTime}<br />CONTROL</p></div>`;
            }

            if (event.resolvedMsg != null) {
                resMsg = `<div class="IIRM shadow3in"><p class="IIFL">${event.resolvedMsg}</p> <p class="IIFR">${event.resolvedTime}<br />CONTROL</p></div>`;
            }


            eventItem.innerHTML = `<div class="IIC shadow5in">
            <div class="IITM"><h4 class="IIFL">Incident: ${event.type}</h4> <h4 class="IIFR">Status: ${event.status}</h4></div>
            <div class="IIIM shadow3in"><p class="IIFL">${event.initialMsg}</p> <p class="IIFR">${event.creationTime}<br />${event.author}</p></div>`
            + ackMsg + resMsg
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

        if (data.acknowledgeMsg != null) {
            ackMsg = `<div class="IIAM shadow3in"><p class="IIFL">${data.acknowledgeMsg}</p> <p class="IIFR">${data.acknowledgeTime}<br />CONTROL</p></div>`;
        }

        if (data.resolvedMsg != null) {
            resMsg = `<div class="IIRM shadow3in"><p class="IIFL">${data.resolvedMsg}</p> <p class="IIFR">${data.resolvedTime}<br />CONTROL</p></div>`;
        }


            eventItem.innerHTML = `<div class="IIC shadow5in">
            <div class="IITM"><h4 class="IIFL">Incident: ${data.type}</h4> <h4 class="IIFR">Status: ${data.status}</h4></div>
            <div class="IIIM shadow3in"><p class="IIFL">${data.initialMsg}</p> <p class="IIFR">${data.creationTime}<br />${data.author}</p></div>`
            + ackMsg + resMsg
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



            // Re-requesting data every 1 seconds
            // setInterval(() => dataCall($buttonRunStat), 1000);
            // Initial data request for first load
            dataCall($buttonRunStat);
            selectNewIncident("riGENERAL");
            incidentLogRetrieval();