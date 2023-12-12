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
                    if (sessionStorage.eventID == undefined) {
                        window.location.href = "index.html";
                        return;
                    }


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

                        // Returning to homepage if accesscode mismateches on any call
                        if (sessionStorage.accessCode != data.accessCode) {
                            sessionStorage.removeItem("eventID");
                            sessionStorage.removeItem("accessCode");
                            window.location.href = "index.html";
                            return;
                        }


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



                        let $capacityMsg = "0";
                        if (data.currentCapacity >= data.maxCapacity) {
                            $capacityMsg = " !!! CAPACITY REACHED !!!";
                        } else {
                            $capacityMsg = "";
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



            // Re-requesting data every 1 seconds
            // setInterval(() => dataCall($buttonRunStat), 1000);
            // Initial data request for first load
            dataCall($buttonRunStat);