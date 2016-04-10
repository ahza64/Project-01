var db = require('./models');

var sampleProject = [
  {
    projectName: "Sample Project",
    owner: "Sample Owner",
    lead: "Sample Lead",
    desc: "Sample Description",
    img: "http://i.imgur.com/7b3g13s.jpg",
  },
  {
    projectName: "Sample Project2",
    owner: "Sample Owner2",
    desc: "Sample Description2",
    lead: "Sample Lead2",
    img: "http://i.imgur.com/7b3g13s.jpg",
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
