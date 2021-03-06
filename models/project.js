var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Member = require("./member.js");

var projectSchema = new Schema({
  projectName: String,
  owner: String,
  desc: String,
  lead: String,
  image: String,
  members: [Member.schema]
});

var Project = mongoose.model('Project', projectSchema);
module.exports = Project;
