//basic node server responding to different http requests
//Reference  https://www.youtube.com/watch?v=LavEJd38vd8

const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const util = require("util");
const formidable = require("formidable");

var recievedObj = {}  //ls object to get the data from the POST requests
var notifObj = {"flag":0,
  "param":""}; //param string gets appended with all the data thats out of place
var count = 0; //for the latency Test
var timeStamp = []
var lat = [];
var latAvg = 0;
var i = 0;

const server = http.createServer(function(req, res){
  //console.log(req.headers);
  //console.log(req.url);
  let path = url.parse(req.url, true);
  //gives us path.pathname, path.search, path.query
  //console.log(req);
  //responding to POST request with url /patient/
  if (req.method.toLowerCase() == 'post' & req.url == '/patient/'){
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(err){
        console.error(er.message);
        return;
      }
      res.writeHead(200);
      res.write('');
      recievedObj = {fields:fields};
      recievedObj = recievedObj.fields;
      res.end(JSON.stringify(recievedObj));
      console.log(">" + Date() + "\n", recievedObj);
      //clearing the notifObj.param string
      notifObj.param = "!!ALARM!!\n";
      //if statements for notifying the doctor application
      if (recievedObj.heartRate < 60){
        notifObj.flag = 1;
        notifObj.param = notifObj.param + "Heart Rate is " + recievedObj.heartRate;
        //console.log(notifObj);
      }else{

      }
    })
//responding to get request got notification at /doc/notif/
  }else if (req.method.toLowerCase() == 'get' & req.url == '/doc/notif/' & notifObj.flag == 1){
    res.writeHead(200);
    res.write(JSON.stringify(notifObj));
    res.end();
    console.log(">" + Date() + "\nNotification sent.");
    notifObj.flag = 0;
    notifObj.param = "!!ALARM!!\n";
  }else if(req.method.toLowerCase() == 'get' & req.url == '/doc/data/'){
    res.writeHead(200);
    res.write(JSON.stringify(recievedObj));
    res.end();
    console.log(">"+Date()+"\nSent data:\n"+ recievedObj);
  }else if(req.method.toLowerCase() == 'get' & req.url == '/latency/'){
    var t = process.hrtime()
    timeStamp[count] =  t[1];
    res.writeHead(200);
    res.write("received "+count);
    res.end();
    console.log("received latency check " + (count+1));
    console.log(timeStamp);
    count++;
    if (count == 11){

      for(i=0; i<10; i++){
        if(timeStamp[i+1] > timeStamp[i]){
          lat[i] = (timeStamp[i+1] - timeStamp[i])/1000000;  //converting to ms
        }else{
          lat[i] = (1000000000 - timeStamp[i+1] - timeStamp[i])/1000000;  //converting to ms
        }
      }
      for(i=0;i<10;i++){
        latAvg = latAvg + lat[i];
      }
      latAvg = latAvg/10;
      console.log(latAvg);
      count = 0;
      timeStamp = [];
    }
  }else{
    //other
  }
});

server.listen(8585, function(){
  console.log("Listening on port 8585");
})
