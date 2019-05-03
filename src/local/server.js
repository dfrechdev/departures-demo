var express = require("express");
var app = express();
var path = require("path");

// add static routes
app.use("/departures.js", express.static(__dirname + "/departures.js"));
app.use("/services", express.static(__dirname + "/services/"));
app.use("/entities", express.static(__dirname + "/entities/"));
app.use("/styles", express.static(__dirname + "/styles/"));
app.use("/static", express.static(__dirname + "/static/"));
app.use(express.static("app"));

// set departures route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/html/departures.html"));
});

// start server
app.listen(3001, function() {
    console.log("Start page available on http://localhost:3001/");
});
