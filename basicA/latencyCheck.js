// sends get request specific amount of time for latency check

const http = require("http");
const axios = require("axios");

//var ip = "15.207.106.148"  //Mumbai Server
var ip = "127.0.0.1" //Local
var j = 0;
no = 11; //number of requests

while(j<no){
  axios.get("http://"+ip+":8585/latency/")
  .then(function (response){
    console.log(response.data)
  })
  .catch(function(error){
    console.log(error);
  })
  j++;
}
console.log("Sent "+no+" get requests");
