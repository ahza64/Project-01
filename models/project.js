var mongoose = require('mongoose'),
  Schema = mongoose.Schema;



var projectSchema = new Schema({
  name: String,
  owner: String,
  desc: String,
  lead: String,
  img: String,
  // member: [workerSchema]
});


var Project = mongoose.model('Project', projectSchema);
module.exports = Project;
