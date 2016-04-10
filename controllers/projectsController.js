var db = require('../models');
// GET /api/albums
function index(req, res) {
  var dataProjects = db.Project;
  dataProjects.find(function(err, projects){
    res.json(projects);
  });
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
  // console.log('show is working');
  db.Project.findById(req.params.project_id, function(err, foundProject) {
    // if(err) { console.log('projectsController.show error', err); }
    // console.log('projectsController.show responding with', foundProject);
    res.json(foundProject);
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
