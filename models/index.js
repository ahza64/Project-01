var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/ProBuilder");

module.exports.Project = require("./project");
module.exports.Member = require("./member");
