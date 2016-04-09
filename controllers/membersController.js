var db = require('../models');

function create(req, res){
  var projectId = req.params.project_id;
  // console.log("there should be something here ", db.Project);
  // console.log(projectId);
  db.Project.findById(projectId)
   //  .populate('author')
    .exec(function(err, foundProject){
      // handle errors
      if(err){
        res.status(500).json({error: 'so sorry'});
      }else if(!foundProject){
        res.status(404).json({error: 'There is no project id ' + projectId});
      }else{
        // console.log("-----", req.body);
        foundProject.member.push(req.body);
        foundProject.save();
        console.log(foundProject);
        res.status(201).json(foundProject);
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
