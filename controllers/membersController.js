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
  console.log("serverside delete route success");
  console.log("member delete", req.params);//member_id is undefined
  res.status(201).json({ok: "ok"});
  var memberId = req.params.member_id;
  var memberData = db.Member;
  projectData.findOneAndRemove({_id: memberId}, function(err, deletedMember){
    res.sendStatus(204);
  });
  // var projectId = req.params.project_id;
  // db.Project.findById(projectId, function(err, foundProject){
  //   var memberId = foundProject.member_id
  //
}

function update(req, res){
  console.log("serverside update complete ", req);
  var memberId = req.params.member_id;
  db.Member.findById(memberId, function(err, foundMember){
    foundMember.task = req.body.task;
    foundMember.save(function(){
      res.status(201).json(foundMember);
    });
  });
}

module.exports = {
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
