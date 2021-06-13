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

var ip = "15.207.106.148"  //Mumbai Server
//var ip = "127.0.0.1" //Local
var j = 0;
// JS Object to catch the notification
var notifObj = {};
// JS Object for the data
var testObj = {"patientID":"55",
 "patientName":"John Doe",
 "heartRate":50,
 "resp":14,
 "spo2":96,
 "co2":38,
 "bpS":100,
 "bpD":78,
 "temp":960
};

//this code works infinately.
/*
while(j<12){
  setInterval(postData, 10);
  //getData();
  //postData();
  //console.log(j);
  j++;
}
*/

//postData();
getNotif();

// sending one request with data
function postData(){
  //console.log(testObj);
  axios.post("http://"+ ip +":8585/patient/", testObj)
  .then(function (response) {
    console.log(">" + Date() + "\n" + response.status + " " + response.statusText + "\n\n" + response.config.url);
    console.log(response.data)
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
    console.log(">" + Date() + "\n" + notifObj.param);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

// sending requests in loop
function postDataLoop(){
  while(1){
    var i = 0;
    for(i = 1; i<3; i++){
      testObj.heartRate++;
      testObj.resp++;
      if(i%2 == 0){
          testObj.spo2++;
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
    }
    for(i = 1; i<3; i++){
      testObj.heartRate--;
      testObj.resp--;
      if(i%2 == 0){
          testObj.spo2--;
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
    }
    //j++;
  }
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
