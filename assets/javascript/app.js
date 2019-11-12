var database = firebase.database();

var trainName = "";
var trainDestination = "";
var trainFrequency = 0;
var nextArrival = 0;
var minutesAway = 0;

$("#submit").on("click", function(event) {
    event.preventDefault();

    console.log("anything?")

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#train-time-input").val().trim();
    arrival = 79;
    minutesAway = 81;

    database.ref().push({
        name,
        destination,
        frequency,
        arrival,
        minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
})

database.ref().on("child_added", function(snapshot) {

    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().arrival);
    console.log(snapshot.val().minutesAway);


    var row = $("<tr>");
    row.append($("<td>").text(snapshot.val().name))
    row.append($("<td>").text(snapshot.val().destination))
    row.append($("<td>").text(snapshot.val().destination))
    row.append($("<td>").text(snapshot.val().frequency))
    row.append($("<td>").text(snapshot.val().arrival))
    row.append($("<td>").text(snapshot.val().minutesAway))

    $("#table").append(row);

})