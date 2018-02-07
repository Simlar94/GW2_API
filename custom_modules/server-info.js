var dateAndTime = require("./date-and-time.js");
var ip = require("./ip.js");

module.exports = function() {
    console.log("Started at: " + dateAndTime());
    ip();
};