//Imported modules.
var express = require('express');
var pouchDB = require('pouchdb');
var bodyParser = require('body-parser');
var serverInfo = require('./custom_modules/server-info.js');
var dateAndTime = require('./custom_modules/date-and-time.js')
//var currentIP = require('./custom_modules/ip.js')

var app = express();

//Global variables.
var dbName = "testdb";
var database = new pouchDB("http://127.0.0.1:5984/" + dbName);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Allow CORS(Cross Origin Resource Sharing). Decides who gets to access your server and what they are able to do.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*, DELETE");
    next();
});


//GET-method: Get items from my database.
app.get("/" + dbName, function (req, res) {
    database.allDocs({
        include_docs: true
    }).then(function (result) {
        res.send(result.rows.map(function (item) {
            return item.doc;
        }));
    }, function (error) {
        res.status(400).send(error);
    });
});


//POST-method: Post an item to my database.
app.post("/" + dbName, function (req, res) {
    database.post(req.body).then(function (result) {
        console.log("\n" + "Posted at: " + dateAndTime());

        res.redirect("back"); // Redirects user to the previous page.
    }, function (error) {
        res.status(400).send(error);
    });
});


// DELETE specific ID from database.
app.delete("/" + dbName + "/:id", function (req, res) {
    database.get(req.params.id).then(function (result) {
        database.remove(result);
    }).then(function (result) {
        console.log("\n" + "Deleted at: " + dateAndTime());

        res.send(result);
    });

});

/*
app.put("/" + dbName + "/:id", function (req, res){
   database.get(req.params.id).then(function (result){
      result.name = req.body.name;
       database.put(result);
       res.send(result);
   }) 
});
*/
app.listen(3000, function (error) {
    if (!error) {
        console.log("Server started on port 3000.")
        serverInfo();
    } else {
        console.log("Error. Something went wrong.")
    }
});
