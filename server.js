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
 // get all projects
 app.get('/api/projects', controllers.projects.show);
 app.post('/api/projects', controllers.projects.create);
 app.delete('/api/projects/:id', controllers.projects.destroy);

 app.post('/api/projects/:project_id/members', function create(req, res){
   var projectId = req.params.project_id;
   console.log("there should be something here ", db.Project);
   console.log(projectId);
   db.Project.findById(projectId)
    //  .populate('author')
     .exec(function(err, foundProject){
       // handle errors
       if(err){
         res.status(500).json({error: 'so sorry'});
       }else if(!foundProject){
         res.status(404).json({error: 'There is no project id ' + projectId});
       }else{
         console.log("-----", req.body);
         foundProject.member.push(req.body);
         foundProject.save();
         res.status(201).json(foundProject);
       }
       // push req.body into characters array

       // save the book with the new character
       // send the entire book back
     });
   });


app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
