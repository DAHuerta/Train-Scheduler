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