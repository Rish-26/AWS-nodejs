//basic node server responding to different http requests
//Reference  https://www.youtube.com/watch?v=LavEJd38vd8

const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const util = require("util");
const formidable = require("formidable");

var recievedObj = {}  //ls object to get the data from the POST requests
var notifObj = {"flag":0,
  "param":"!!ALARM!!\n"}; //param string gets appended with all the data thats out of place

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
      res.write('the POST response from server \n\n')
      res.end(util.inspect({fields:fields}));
      recievedObj = {fields:fields};
      recievedObj = recievedObj.fields;
      console.log(">" + Date() + "\n", recievedObj);
      //if statements for notifying the doctor application
      if (recievedObj.heartRate < 60){
        notifObj.flag = 1;
        notifObj.param = notifObj.param + "Heart Rate is " + recievedObj.heartRate;
        //console.log(notifObj);
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
  }else{
    //other requests
  }


});

server.listen(8585, function(){
  console.log("Listening on port 8585");
})
