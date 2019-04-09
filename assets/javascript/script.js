var add = document.querySelector("#submit");
var name = "",
  dest = "",
  first = "",
  freq = 0,
  next = "";
var newTrain = document.createElement("tr");
var newName = document.createElement("td"),
  newDest = document.createElement("td"),
  newFirst = document.createElement("td"),
  newFreq = document.createElement("td"),
  newNext = document.createElement("td"),
  newMinAway = document.createElement("td");
var table = document.querySelector("#trains");
var modal = document.getElementById('myModal');
var close = document.getElementsByClassName("close")[0];

var config = {
  apiKey: "AIzaSyA985y_KrL_WgBYxsu1W0GoWN40jC9mFe4",
  authDomain: "train-schedule-da878.firebaseapp.com",
  databaseURL: "https://train-schedule-da878.firebaseio.com",
  projectId: "train-schedule-da878",
  storageBucket: "train-schedule-da878.appspot.com",
  messagingSenderId: "280977608178"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function (snapshot) {
  var sv = snapshot.val();
  console.log(sv);
  var newTrain = document.createElement("tr");
  var newName = document.createElement("td"),
    newDest = document.createElement("td"),
    newFirst = document.createElement("td"),
    newFreq = document.createElement("td"),
    newNext = document.createElement("td"),
    newMinAway = document.createElement("td");

  var frequency = parseInt(sv.freq);
  console.log("freq: ", sv.freq);

  var trainTime = moment(sv.first, "hh:mm a");

  console.log("Train time : " + trainTime);

  var timeDifference = moment().diff(moment(trainTime, "hh:mm a"), "minutes");

  console.log("Difference in time: " + timeDifference);

  // shows how much time is left until next train arrival
  var timeRemaining = timeDifference % frequency;
  console.log(frequency);
  console.log("Time remaining: " + timeRemaining);

  //time until next train
  var timeAway = frequency - timeRemaining;

  //console.log("Minutes until next train: " + timeAway);

  //next train arrival
  var nextArrival = moment().add(timeAway, "minutes");

  // shows the next arrival time

  var arrivalDisplay = moment(nextArrival).format("hh:mm a");
  newName.textContent = sv.name;
  newDest.textContent = sv.dest;
  newFirst.textContent = sv.first;
  newFreq.textContent = sv.freq;
  newNext.textContent = arrivalDisplay;
  newMinAway.textContent = timeAway;
  newTrain.append(newName);
  newTrain.append(newDest);
  newTrain.append(newFreq);
  newTrain.append(newNext);
  newTrain.append(newMinAway);
  table.append(newTrain);

  // reloads the page every minute to update the times

  setTimeout("window.location.reload()", 60000);
})

// adds train to firebase database

const addTrain = (event) => {
  event.preventDefault();
  var name = document.querySelector("#name-entry").value.trim(),
    dest = document.querySelector("#dest-entry").value.trim(),
    first = document.querySelector("#first-entry").value.trim(),
    freq = document.querySelector("#freq-entry").value.trim();
  if (name !== "" && dest !== "" && first !== "" && freq !== "") {
    database.ref().push({
      name: name,
      dest: dest,
      first: first,
      freq: freq,
      next: next
    })
    document.querySelector("form").reset();

  // Input validation

  } else {
    modal.style.display = "block";
  }
}

// To close modal when clicking outside of the modal

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Closes modal when clicking the "X"

close.onclick = function () {
  modal.style.display = "none";
}

// Adds train when submit button is clicked

add.addEventListener("click", addTrain);

