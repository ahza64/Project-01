var db = require('../models');

function create(req, res){
  var projectId = req.params.project_id;
  db.Project.findById(projectId)
   //  .populate('lead') here to remind me on refactor for referenced data
    .exec(function(err, foundProject){
      if(err){
        res.status(500).json({error: 'so sorry'});
      }else if(!foundProject){
        res.status(404).json({error: 'There is no project id ' + projectId});
      }else{
        foundProject.members.push(req.body);
        foundProject.save(function(){
          res.json(foundProject);
        });
      }
  });
}

function show(req, res){

}

function destroy(req, res){
  var memberId = req.params.member_id;
  var projectId = req.params.project_id;
  db.Project.findById(projectId, function(err, foundProject){
    // console.log("foundProject ", foundProject);
    var membersArry = foundProject.members;
    console.log("foundProject ", membersArry[0]);
    for (i = 0; i < membersArry.length; i++){
      if(membersArry[i]._id == memberId){
        foundProject.members[i].remove();
        foundProject.save();
        res.sendStatus(204);
      }
    }

    // foundProject.members.forEach(function(member){
    //   if(member._id == memberId){
    //
    //   }

  });
  // projectData.findOneAndRemove({_id: memberId}, function(err, deletedMember){
  //   res.sendStatus(204);
  // });
}

function update(req, res){
  var memberId = req.params.member_id;
  var projectId = req.params.project_id;
  db.Project.findById(projectId, function(err, foundProject){
    foundProject.members.forEach(function(member){
      if(member._id == memberId){
        member.task = req.body.task;
        foundProject.save(function(){
          res.status(200).json(foundProject);
        });
      }
    });
  });
}

module.exports = {
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
