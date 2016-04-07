var express = require('express');
    app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

var db = require('./models');

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
 //get all projects
 app.get('/api/project', function(req, res){
   console.log("get request ", req);
   res.json(req);
 });
 //create a new project
 app.post('/api/project', function(req, res){
   console.log("server operational ", req);
   res.json(req);
 });



app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
