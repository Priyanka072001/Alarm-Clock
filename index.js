let arr = [];
// Fetching elements by its ID
let setHour = document.getElementById("hr");
let setMin = document.getElementById("min");
let setSec = document.getElementById("sec");
let setAMPM = document.getElementById("ampm");
let incompleteAlarmsholder = document.getElementById("incomplete-alarms");
// Fetching elements by its class
let colorChange = document.getElementsByClassName("alarm");

// Alarm ringtone
var ringtone = new Audio("clock-digital-alarm.wav");
ringtone.loop = true;

// To set hrs, mins, secs and AM, PM in the dropdown menu by users

let totalHours = 12;
// Hours range from 1 to 12 hrs
for (let i = 1; i <= totalHours; i++) {
    setHour.options[setHour.options.length] = new Option(i < 10 ? '0' + i : i); // 0 is added before single digit
}

let totalMins = 59;
// Minutes range of 00-59 minutes
for (let i = 0; i <= totalMins; i++) {
    setMin.options[setMin.options.length] = new Option(i < 10 ? '0' + i : i);   // 0 is added before single digit
}

let totalSecs = 59;
// seconds range of 00-59 seconds
for (let i = 0; i <= totalSecs; i++) {
    setSec.options[setSec.options.length] = new Option(i < 10 ? '0' + i : i);  // 0 is added before single digit
}

let morningornoon = ["AM", "PM"];
// selection of AM or PM
for (let i = 0; i < morningornoon.length; i++) {
    setAMPM.options[setAMPM.options.length] = new Option(morningornoon[i]); 
}


// Function to display the  current time:
function currenttime() {
    const currentdate = new Date();
    let hour = currentdate.getHours();
    let min = currentdate.getMinutes();
    let sec = currentdate.getSeconds();
    let AMPM = "";

    if (currentdate.getHours() == 0) {
        hour = 12;
    }
//condition for 12 hour format
    if (currentdate.getHours() >= 12) {
        if (currentdate.getHours() == 12) {
            hour = 12;
        } else {
            hour = hour - 12;    // 24 hour format to 12 hour format conversion
        }
//condition for AM and PM
        AMPM = "PM";
    } else {
        AMPM = "AM";
    }
//condition for 0 before single digit
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
//displaying the current time
    document.getElementById("currenttime").innerHTML = hour + ":" + min + ":" + sec + AMPM;
}
setInterval(currenttime, 1000) ;

//To set new alarm time by users using the dropdown menu   
var createNewTaskElement = function (alarmString) {
    let lists = document.createElement("li");
    let labels = document.createElement("label");
    let deleteButton = document.createElement("button");
//To delete the alarm time 
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    labels.innerText = alarmString;

    lists.appendChild(labels);
    lists.appendChild(deleteButton);
    return lists;
}


// Clicking the set alarm time button which triggers creating the alarm time element:
document.getElementById("setButton").addEventListener("click", function () {
    let selectedHour = setHour.options[setHour.selectedIndex].value;
    let selectedMin = setMin.options[setMin.selectedIndex].value;
    let selectedSec = setSec.options[setSec.selectedIndex].value;
    let selectedAMPM = setAMPM.options[setAMPM.selectedIndex].value;
    console.log(selectedHour, selectedMin, selectedSec, selectedAMPM);
    let len = arr.length + 1;

    // Getting today's date
    var todaysdate = new Date();
    var dd = String(todaysdate.getDate()).padStart(2, '0');
    var mm = String(todaysdate.getMonth() + 1).padStart(2, '0'); //0 is added before single digit
    var yyyy = todaysdate.getFullYear(); //getting the year
//today's date format
    todaysdate = dd+ '/' + mm + '/' + yyyy;
    let alarmhour = parseInt(selectedHour);  //converting string to integer
    if (selectedAMPM == "PM") {
        alarmhour = 12 + alarmhour; 
    }
//
    if (selectedAMPM == "AM" && alarmhour == 12) {
        alarmhour = 0;
    }
    if (alarmhour.toString.length == 1) {
        alarmhour = '0' + alarmhour;
    }
    let Alarmtime= alarmhour + ":" + selectedMin + ":" + selectedSec;
    var d = new Date(`${todaysdate} ${Alarmtime}`);

    // Getting time in milliseconds 
    var milliseconds = d.getTime();

    // storing alarm time data in an array
    arr.push([selectedHour, selectedMin, selectedSec, selectedAMPM, milliseconds, len]);

    // milliseconds time is used for sorting the array and the first element in the array
    // will be the first alarm to get triggered
    arr = arr.sort((a, b) => a[4] - b[4]);
    let val = len.toString() + ") " + selectedHour + ":" + selectedMin + ":" + selectedSec + ":" + selectedAMPM;

    // creating the alarm list element which includes delete button
    var lists = createNewTaskElement(val);
    incompleteAlarmsholder.appendChild(lists);
    // This function is used for deleting an alarm element
    bindAlarmEvents(lists);

    // function to check alarm time with current time
    setInterval(() => {
        const currentdate = new Date();
    let hour = currentdate.getHours();
    let min = currentdate.getMinutes();
    let sec = currentdate.getSeconds();
    let AMPM = "";

    if (currentdate.getHours() == 0) {
        hour = 12;
    }
//condition for 12 hour format
    if (currentdate.getHours() >= 12) {
        if (currentdate.getHours() == 12) {
            hour = 12;
        } else {
            hour = hour - 12;    // 24 hour format to 12 hour format conversion
        }
//condition for AM and PM
        AMPM = "PM";
    } else {
        AMPM = "AM";
    }
//condition for 0 before single digit
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }

        // When current time matches with alarm time, the alarm shows an alert and then starts ringing
        if (arr.length != 0 && arr[0][0] == hour && arr[0][1] == min && arr[0][2] == sec && arr[0][3] == selectedAMPM) {
            alert("Turn off your alarm");  //alert message
            ringtone.play();  //alarm sound
        }
    }, 1000);
})

// When set clear button is clicked, alarm sound stops
document.getElementById("ClearButton").addEventListener("click", function () {
    ringtone.pause();
})
var indexDel = 0;

// To delete  perticular alarm from the recent listed alarms:
var deleteAlarm = function () {
    let lists = this.parentNode; //this refers to the button clicked and parent node is the list item 
    var ul = lists.parentNode ;  //this refers to the list item and parent node is the ul
    var deleteButton = lists.querySelector("button.delete"); //this refers to the delete button in the list item 
    indexDel = parseInt(deleteButton.innerHTML[6]); //getting the index of the alarm to be deleted 
    for (let i = 0; i < arr.length; i++){
        if (arr[i][5] == indexDel) { // checking the index of the alarm to be deleted with the index of the alarm in the array
            arr.splice(i, 1); // deleting the alarm from the array
        }
    }
    ul.removeChild(lists); // deleting the alarm from the list
}
//
var bindAlarmEvents = function (alarmListItem) { // binding the alarm list item with the delete button
    var deleteButton = alarmListItem.querySelector("button.delete");
    deleteButton.onclick = deleteAlarm; // calling the delete alarm function
}