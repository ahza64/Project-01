var express = require('express');
    app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

var db = require('./models');
var controllers = require('./controllers');

/**********
 * ROUTES *
 **********/



 /*
  * HTML Endpoints
  */
  //serve static files from views directory
  app.get('/', function homepage (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

/*
 * API Endpoints
 */
 //testing
 app.get('/api/sanity', function(req, res){
   res.json({
     message: "Hello"
   });
 });
 // get all projects
 app.get('/api/projects', controllers.projects.show);
 
 app.post('/api/projects', function postProject(req, res){
   var newProject = new db.Project(req.body);
   newProject.save(function(err, project){
     if(err){
       return console.log("project save err ", err);
     }
     console.log(project);
     res.json(project);
   });
 });



app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
