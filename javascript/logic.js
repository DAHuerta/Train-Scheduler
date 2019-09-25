var firebaseConfig = {
    apiKey: "AIzaSyDD6FIZt8cSJqZgHXKq63niLgXp5R2GJ2k",
    authDomain: "test-718af.firebaseapp.com",
    databaseURL: "https://test-718af.firebaseio.com",
    projectId: "test-718af",
    storageBucket: "",
    messagingSenderId: "1095688204984",
    appId: "1:1095688204984:web:e6da693ac3a05974b7ba4d"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#train-frequency").val().trim();

    database.ref().push({

        name: trainName,
        target: destination,
        start: firstTrain,
        recurrence: frequency,

    });

    $("input").val("");

})

database.ref().on("child_added", function(childSnapshot) {
    console.log("child_added")
    var timeAway;

    var tranStart = moment(childSnapshot.val().start, "HH:mm").subtract(1, "years");
    console.log(tranStart)
    var timeDifference = moment().diff(moment(tranStart), "minutes");
    console.log(timeDifference)
    var residue = timeDifference % childSnapshot.val().recurrence;
    console.log(residue)
    var timeAway = childSnapshot.val().recurrence - residue;
    console.log(timeAway)
    var nextTrain = moment().add(timeAway, "minutes");
    console.log(nextTrain)
    nextTrain = moment(nextTrain).format("HH:mm")
    console.log(nextTrain)
    var tranName = (childSnapshot.val().name);
    var tranTarget = (childSnapshot.val().target);
    var tranFrequency = (childSnapshot.val().recurrence);

    $("#info").append("<tr><td>" + tranName + "</td><td>" + tranTarget + "</td><td>" + tranFrequency + "</td><td>" + nextTrain + "</td><td>" + timeAway + "</td></tr>");

}, function(errorObj) {
    console.log("Errors handled: " + errorObj.code)
})