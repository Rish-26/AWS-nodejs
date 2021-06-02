//basic node server responding to different http requests
//Reference  https://www.youtube.com/watch?v=LavEJd38vd8

const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const util = require("util");
const formidable = require("formidable");

const server = http.createServer(function(req, res){
  //console.log(req.headers);
  //console.log(req.url);
  let path = url.parse(req.url, true);
  //gives us path.pathname, path.search, path.query
  if (req.method.toLowerCase() == 'post'){
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(err){
        console.error(er.message);
        return;
      }
      res.writeHead(200);
      res.write('the POST response \n\n')
      res.end(util.inspect({fields:fields, files:files}));
    })
  }else if (req.method.toLowerCase() == 'get'){
    res.writeHead(200);
    res.write(util.inspect(path.query) + "\n\n");
    res.end("End of message");
  }else{
    //other requests
  }
  /*let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(chunk){
    buffer += decoder.write(chunk);
  });

  req.on('end', function(){
    buffer += decoder.end();
  });*/

});

server.listen(1234, function(){
  console.log("Listening on port 1234");
})
