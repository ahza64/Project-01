var db = require('../models');
// GET /api/albums
function index(req, res) {
  db.Album.find(function(err, albumtaco){
    if(err){
      console.log("data in controller err ", err);
    }
    // console.log("this is awesome stuff", albumtaco);
     res.json(albumtaco);
   });
  // db.Album.find({}, function(err, allAlbums){
  //   res.json(allAlbums);
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
    console.log("get request ", db.Project);
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
  // FILL ME IN !
}
// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
