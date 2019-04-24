
var config = {
    apiKey: "AIzaSyB7NscjJtn1YDiD10GWzKlNVvqZRs1In-A",
    authDomain: "train-scheduler-c7973.firebaseapp.com",
    databaseURL: "https://train-scheduler-c7973.firebaseio.com",
    projectId: "train-scheduler-c7973",
    storageBucket: "train-scheduler-c7973.appspot.com",
    messagingSenderId: "256075595247"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding train
$("#add-train").on("click", function (event) {
    event.preventDefault();

    //Grabs user input
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logging inputs to the console
    console.log(trainName.name);
    console.log(trainDestination.destination);
    console.log(trainTime.time);
    console.log(trainFrequency.frequency);

    alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");

    });

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot,val());
});


