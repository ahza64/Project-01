var db = require('../models');

// function create(req, res){
//   console.log("server side request made ", req);
//   var newProjectMember = new db.Project(req.body);
//   newProjectMember.save(function(err, member){
//     if(err){
//       return console.log("member save error ", err);
//     }
//     console.log("member save success ", newProjectMember);
//     res.json(member);
//   });
// }

function create(req, res){
  var ProjectId = req.params.project_id;
  console.log("there is something here ", projectId);
  console.log("there should be something here", db.Project);
  db.Project.findById(projectId, function(err, foundProject){
    // .populate('author')
    // .exec(function(err, foundProject){
      // handle errors
      if(err){
        res.status(500).json({error: 'so sorry'});
      }else if(!foundProject){
        res.status(404).json({error: 'There is no project id ' + projectId});
      }else{
        console.log("------", foundProject);
        foundProject.members.push(req.body);
        foundProject.save();
        res.status(201).json(foundBook);
      }
      // push req.body into characters array

      // save the book with the new character
      // send the entire book back
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
