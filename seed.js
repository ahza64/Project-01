var db = require('./models');

var sampleProject = [
  {
    name: "Sample Project",
    owner: "Sample Owner",
    desc: "Sample Description",
    lead: "Sample Lead",
    img: "http://i.imgur.com/7b3g13s.jpg",
  },
  {
    name: "Sample Project2",
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
