var db = require('./models');

var sampleProject = [
  {
    projectName: "Sample Project",
    owner: "Sample Owner",
    lead: "Sample Lead",
    desc: "Sample Description",
    image: "http://www.wntdesign.com/images/R_BELVEDERE.jpg",
  },
  {
    projectName: "Sample Project2",
    owner: "Sample Owner2",
    desc: "Sample Description2",
    lead: "Sample Lead2",
    image: "http://www.wntdesign.com/images/C_MEADOW_1.jpg",
  }
];



db.Project.remove({}, function(err, removed){
console.log("removed all quotes db");
  db.Project.create(sampleProject, function(err, project){
    if (err){
      return console.log("project data error " + err);
    }
    console.log("Created new project", project._id);
    proccess.exit();
  });
});
