var db = require('../models');

function create(req, res){
  console.log("server side request made");
  var newProjectMember = new db.Project(req.body);
  newProjectMember.save(function(err, member){
    if(err){
      return console.log("member save error ", err);
    }
    console.log("member save success ", member);
    res.json(member);
  });
}

function show(req, res){

}

function destroy(req, res){

}

function update(req, res){

}

module.exports = {
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
