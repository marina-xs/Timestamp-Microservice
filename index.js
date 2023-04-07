// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('express');
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

app.get("/api/", function(req, res) {
  const now = new Date();
  res.json({unix: now.getTime(), utc: now.toUTCString()});
});

app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  //if (! date) {//does not work, so I write another get end point above
  //  const now = new Date();
  //  res.json({unix: now.getTime(), utc: now.toUTCString()});
  //} else {
    if (isNaN(date)) {//the input is not unix timestamp
      const timestamp = Date.parse(date);
      if (isNaN(timestamp)) {
        res.json({ error: "Invalid Date"});
      }
      else {
        res.json({unix: timestamp, utc: new Date(date).toUTCString()});
      }
    }
    else {//input unix timstamp
      //console.log("Unix timestamp:", date); 
      //const isMilliseconds = date > 2147483647;
      let dateObj;//!!!must be declared outside the if-else, or it will throw error when it is being used later
  
      //if (isMilliseconds) {
      //  dateObj = new Date(Number(date) /1000);
      //} else {
        dateObj = new Date(Number(date));
      //}
  
      const unixForCheck = dateObj.getTime();
      if (unixForCheck === Number(date) || unixForCheck === Number(date) / 1000) {//check if it is valid date
        //console.log("Date object:", dateObj.toUTCString());
        res.json({unix: Number(date), utc: dateObj.toUTCString()});
      } else {
        //console.log("the calculated one is:" + dateObj.getTime() + "the original is: " + date);
        res.json({ error: "Invalid Date"})
      }
    }
  //}
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
