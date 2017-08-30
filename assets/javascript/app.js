// Initialize Firebase
var config = {
  apiKey: "AIzaSyC3gqrlYK4ajtrUkrFquCDK4qCE_v309DQ",
  authDomain: "trainschedule-4f799.firebaseapp.com",
  databaseURL: "https://trainschedule-4f799.firebaseio.com",
  projectId: "trainschedule-4f799",
  storageBucket: "trainschedule-4f799.appspot.com",
  messagingSenderId: "866834642240"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

$('#submit').on('click', function(){

  trainName = $('#trainName').val("");
  destination = $('#destination').val("");
  firstTrain = $('#firstTrain').val("");
  frequency = $('#frequency').val("");

  trainName = $('#trainName').val().trim();
  destination = $('#destination').val().trim();
  firstTrain = $('#firstTrain').val().trim();
  frequency = $('#frequency').val().trim();

  database.ref().push({
    Train_Name: trainName,
    Destination: destination,
    First_Train: firstTrain,
    Frequency: frequency
  });
});

database.ref().on('child_added', function(snapshot){
  var data = snapshot.val();
  trainName = data.Train_Name;
  destination = data.Destination;
  firstTrain = data.First_Train;
  frequency = data.Frequency;

  var firstTrainTime = moment(firstTrain, "hh:mm").subtract(1, "years");
  var minDiff = moment().diff(moment(firstTrainTime),"minutes");
  var reminder = minDiff % frequency;
  var minAway = frequency - reminder;

  $('#tbody').append("<tr><td id='table-name'> " + trainName +
      " </td><td id='table-destination'> " + destination +
      " </td><td id='table-frequency'> " + frequency +
      " </td><td id='table-start'> " + firstTrain + "</td><td id='table-min'>" + minAway +"</td><</tr>");

      trainName = $('#trainName').html();
      destination = $('#destination').html();
      firstTrain = $('#firstTrain').html();
      frequency = $('#frequency').html();

      console.log('here');

}, function(errorObject){
  console.log(errorObject);
});
