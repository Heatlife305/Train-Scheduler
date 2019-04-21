$(document).on("ready", function() {

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
    
    database.ref().on("value", function(snapshot) {
        console.log(snapshot.val());
    });


});