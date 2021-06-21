//sending HTTP get requests with data in the query to test the server
/*
json obj design:
{"patientID":"id",
 "patientName":"Name",
 "heartRate":"bpm",
 "resp":"breaths per min",
 "spo2":"percentage",
 "co2":"mm Hg",
 "bpS":"mm Hg",
 "bpD":"mm Hg",
 "temp":"farenheit"}
*/

const http = require("http");
const axios = require("axios");

//var ip = "15.207.106.148"  //Mumbai Server
//var ip = "155.146.11.205" //WZ Server
var ip = "127.0.0.1" //Local
var j = 0;
var count = 0;
// JS Object to catch the notification
var notifObj = {};
// JS Object for the data
var testObj = {"patientID":"55",
 "patientName":"John Doe",
 "heartRate":65,
 "resp":14,
 "spo2":95,
 "co2":38,
 "bpS":100,
 "bpD":78,
 "temp":988
};

//this code works infinately.

while(j<12){
  setInterval(postData, 2000);
  setInterval(postBadData, 2000);
  j++;
}


// sending one request with data
function postData(){
  //console.log(testObj);
  count++;
  axios.post("http://"+ ip +":8585/patient/", testObj)
  .then(function (response) {
    console.log(">" + Date() + "\n" + response.status + " " + response.statusText + "\n\n" + response.config.url);
    console.log(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
  if(count < 5){
    setInterval(postData, 2000);
  }
}

function postBadData(){
  testObj.heartRate = 58;
  testObj.resp = 14;
  testObj.spo2 = 88;
  testObj.co2 = 38;
  testObj.bpS = 100;
  testObj.bpD = 78;
  testObj.temp = 1001;
  //console.log(testObj);
  axios.post("http://"+ip+":8585/patient/", testObj)
  .then(function (response) {
    console.log(response.status + response.config.url + "\n\n" + response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}
//sending doctor's app notif get request
function getNotif(){
  axios.get("http://"+ ip + ":8585/doc/notif/")
  .then(function (response) {
    // handle success
    notifObj = response.data;
    console.log(response);
    //console.log(">" + Date() + "\n" + notifObj.param);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

// sending requests in loop
function postDataLoop(){
  var i = 0;
  for(i = 1; i<4; i++){
    testObj.heartRate++;
    testObj.resp++;
    if(i%2 == 0){
        testObj.spo2 = testObj.spo2 + 2;
    }
    testObj.co2++;
    testObj.bpS++;
    testObj.bpD++;
    testObj.temp = testObj.temp + 3;
    //console.log(testObj);
    axios.post("http://"+ip+":8585/patient/", testObj)
    .then(function (response) {
      console.log(response.status + response.config.url + "\n\n" + response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    sleep(2000);
  }
  for(i = 1; i<4; i++){
    testObj.heartRate--;
    testObj.resp--;
    if(i%2 == 0){
        testObj.spo2 = testObj.spo2 - 2;
    }
    testObj.co2--;
    testObj.bpS--;
    testObj.bpD--;
    testObj.temp = testObj.temp - 3;
    //console.log(testObj);
    axios.post("http://"+ip+":8585/patient/", testObj)
    .then(function (response) {
      console.log(response.status + response.config.url + "\n\n" + response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    sleep(2000);
  }
}

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
//Getting data continuously
function getData(){
  axios.get("http://"+ip+":8585/doc/data/")
  .then(function (response){
    console.log(">" + Date() + "\n" + response.status + " " + response.statusText + "\n\n" + response.config.url + "\n\n" + response.data);
  })
  .catch(function (error){
    console.log(error);
  })
}
