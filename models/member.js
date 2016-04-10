var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var memberSchema = new Schema({
  memberName: String,
  task: String
});


var Member = mongoose.model('Member', memberSchema);
module.exports = Member;
