var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var projectSchema = new Schema({
  name: String,
  owner: String,
  desc: String,
  img: String,
  member: [workerSchema]
});


var Project = mongoose.model('Project', profileSchema);
module.exports = Project;
