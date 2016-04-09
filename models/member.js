var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var memberSchema = new Schema({
  worker: String,
  task: String
});


var Member = mongoose.model('Member', memberSchema);
module.exports = Member;
