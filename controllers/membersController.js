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
        foundProject.member.push(req.body);
        foundProject.save(function(){
            console.log("member save successful ", foundProject);
            res.json(foundProject);
          });
      }
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
