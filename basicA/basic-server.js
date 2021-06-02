// a basic node server.
//Reference https://www.youtube.com/watch?v=UMKS6su8HQc
const http = require('http');

const server = http.createServer(function(rwq, res){
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.writeHead(200);

  let dataObj = {"id":123, "name": "Bob", "email":"bob@work.org"};
  let data = JSON.stringify(dataObj);
  res.end(data);
});

server.listen(1234, function(){
  console.log('Listening on port 1234')
})
