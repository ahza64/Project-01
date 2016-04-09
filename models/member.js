var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var memberSchema = new Schema({
  name: String,
  task: String
});


var Member = mongoose.model('Member', memberSchema);
module.exports = Member;
