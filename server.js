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

 app.post('/api/projects/:project_id/members', controllers.members.create);


app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
