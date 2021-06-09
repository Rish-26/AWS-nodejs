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

// JS Object for the data
var testObj = {"patientID":"55",
 "patientName":"John Doe",
 "heartRate":70,
 "resp":14,
 "spo2":96,
 "co2":38,
 "bpS":100,
 "bpD":78,
 "temp":960
};


//while(1){
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
    axios.post("http://127.0.0.1:8585/dummydata/", testObj)
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
    axios.post("http://127.0.0.1:8585/dummydata/", testObj)
    .then(function (response) {
      console.log(response.status + response.config.url + "\n\n" + response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
//}
