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
  //from solutions, works
  // var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  // req.body.genres = genres;
  //
  // db.Album.create(req.body, function(err, album) {
  //   if (err) { console.log('error', err); }
  //   console.log("This is from db to server ",album);
  //   res.json(album);
  // });
  var newAlbum = new db.Album(req.body);
   newAlbum.save(function(err, album){
     if (err){
       return console.log("album save error "+ err);
     }else{
       console.log(album);
       res.json(album);
     }
   });
}
function show(req, res) {
    console.log("get request ", db.Project);
    var seedSampleProject = db.Project;
    seedSampleProject.findOne(function(err, projects){
      res.json(projects);
    });
}
function destroy(req, res) {
  // FILL ME IN !
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
