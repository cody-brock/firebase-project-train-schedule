var database = firebase.database();

var trainName = "";
var trainDestination = "";
var trainFrequency = 0;
var nextArrival = 0;
var minutesAway = 0;

$("#submit").on("click", function(event) {
    event.preventDefault();

    $("#warning").css("visibility", "hidden");
    $("#invalid-arrival").css("display", "none");


    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    arrival = moment($("#train-time-input").val().trim(), "HH:mm").format("HH:mm");
    frequency = parseInt($("#frequency-input").val().trim());
    minutesAway = 81;

    if (name === "" || destination === "" || arrival === "" || frequency === "") {
        $("#warning").css("visibility", "visible");
        return;
    }

    newArrival = arrival.split(":");
    console.log("newArrival", newArrival[0], newArrival[1]);
    if (isNaN(newArrival[0]) || isNaN(newArrival[1]) || newArrival[0] < 0 || newArrival[0] > 23 || newArrival[1] < 0 || newArrival[1] > 59 || newArrival[1].length !==2) {
        console.log("invalid time");
        $("#invalid-arrival").css("display", "block");
        return;
    } else {
        console.log("valid time!")
    }

    database.ref().push({
        name,
        destination,
        frequency,
        arrival,
        minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
    $("#warning").css("visibility", "hidden");

})

database.ref().on("child_added", function(snapshot) {

    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().arrival);
    console.log(snapshot.val().minutesAway);

    let frequency = snapshot.val().frequency
    let arrival = snapshot.val().arrival;
    console.log("arrival", arrival);

    // let  difference = (moment().diff(moment(arrival, "HH:mm"), 'minutes'))
    let difference = moment(arrival, "HH:mm").diff(moment(), 'minutes')
    console.log("moment now", moment());
    console.log("difference", difference);

    if (difference >= 0) {
        arrival = snapshot.val().arrival
        minutesAway = difference;
        (console.log("arrival", arrival));
        (console.log("minutesAway", minutesAway));
    } else if (difference < 0) {
        minutesAway = frequency - (Math.abs(difference) % frequency);
        console.log("minutesAway", minutesAway)
        arrival = moment().add(minutesAway, 'minutes').format("HH:mm");
    }



    var row = $("<tr>");
    row.append($("<td>").text(snapshot.val().name))
    row.append($("<td>").text(snapshot.val().destination))
    row.append($("<td>").text(snapshot.val().frequency))
    row.append($("<td>").text(arrival))
    row.append($("<td>").text(minutesAway))

    $("#table").append(row);

})