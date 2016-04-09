var db = require('../models');
// GET /api/albums
function index(req, res) {

}

function create(req, res) {
  console.log("body", req.body);
  var newProject = new db.Project(req.body);
  newProject.save(function(err, project){
    if(err){
      return console.log("project save err ", err);
    }
    console.log(project);
    res.json(project);
  });
}

function show(req, res) {
    // console.log("get request ", db.Project);
    var seedSampleProject = db.Project;
    seedSampleProject.find(function(err, projects){
      res.json(projects);
    });
}

function destroy(req, res) {
  console.log("project delete", req.params);
  //find the _id of this delete
  var projectId = req.params.id;
  var projectData = db.Project;
  projectData.findOneAndRemove({_id: projectId}, function(err, deletedProject){
    res.sendStatus(204);
  });
}

function update(req, res) {

}
// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
