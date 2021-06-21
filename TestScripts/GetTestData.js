//This code sends GET rewuests to get data continuously

const http = require("http");
const axios = require("axios");

//var ip = "15.207.106.148"  //Mumbai Server
var ip = "127.0.0.1" //Local
var j = 0;

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
  getNotif();
  //console.log(j);
  j++;
}
*/



//Getting data continuously
function getData(){
  axios.get("http://"+ip+":8585/doc/data/")
  .then(function (response){
    //console.log(response.data);
    console.log(">" + Date() + "\n" + response.status + " " + response.statusText + "\n\n" + response.config.url + "\n\n" + response.data);
  })
  .catch(function (error){
    console.log(error);
  })
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
