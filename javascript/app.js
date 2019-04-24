
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
    console.log(childSnapshot.val());

    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    // Train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    //Moment js to calculate next arrival
    var tFrequency = childSnapshot.val().frequency;

    // First train starts at 03:30
    var trainTime = childSnapshot.val().time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var timeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Time difference
    var diffTime = moment().diff(moment(timeConverted, "minutes"));
    console.log("TIME DIFFERENCE: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minutes until next arrival
    var tMinAway = tFrequency - tRemainder;
    console.log(tMinAway);

    // Arrival time
    var tArrival = moment().add(tMinAway, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + tArrival);
});


