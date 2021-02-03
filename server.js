// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let responseObj={};
app.get("/api/timestamp/:input",(request, response)=>{
  let inputDate=request.params.input
  
  
  if((/\-|\\|[a-z]/).test(inputDate)){
    responseObj['unix']=new Date(inputDate).getTime();
    responseObj['utc']=new Date(inputDate).toUTCString();
  } else{
    
    inputDate=parseInt(inputDate);
    responseObj['unix']=new Date(inputDate).getTime();
    responseObj['utc']=new Date(inputDate).toUTCString();
    
  }
  
  if(!responseObj['utc'] || !responseObj['unix']){
    response.json({"error":"Invalid Date"})
  } else {
    response.json(responseObj)
  }
  
  
})

app.get('/api/timestamp', (request, response)=>{
  response.json({"unix": new Date().getTime(), "utc": new Date().toUTCString()})
})
