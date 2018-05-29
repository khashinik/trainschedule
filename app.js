var config = {
    apiKey: "AIzaSyAYFM8wVReKsgW_W7jDjnsXV38MhSezsvE",
    authDomain: "codstuffs-5d02d.firebaseapp.com",
    databaseURL: "https://codstuffs-5d02d.firebaseio.com",
    projectId: "codstuffs-5d02d",
    storageBucket: "codstuffs-5d02d.appspot.com",
    messagingSenderId: "302733750681"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var trainDB = database.ref("/schedule");

  $("#submit").on('click', function(){
    event.preventDefault();
    var train = $("#train_name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var newDB = {
        "trainName": train,
        "destination": destination,
        "firstTrain": firstTrain,
        "frequency": frequency,
  }
  trainDB.push(newDB);


})

trainDB.on('child_added', function(childSnapshot) {
    var newfrequency = childSnapshot.val().frequency;
    var convertedDate = moment(childSnapshot.val().firstTrain, 'hh:mm').subtract(1, 'years');
    var trainTime = moment(convertedDate).format('HH:mm');
    var currentTime = moment();
    var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var newRemainder = diffTime % newfrequency;
    var newMinutesTillTrain = newfrequency - newRemainder;

    var nextTrain = moment().add(newMinutesTillTrain, 'minutes').format('HH:mm')
  
    $("#schedule").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" +
    childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency +
    "</td><td>" + trainTime + "</td><td>" + newMinutesTillTrain + "</td></tr>")
    },function(errorObject) {
      console.log('Errors handled: ' + errorObject.code);
    })
    setInterval(function(){
        location.reload();
      }, 60000)