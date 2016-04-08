


$(document).ready(function() {
  console.log("JS is definitely working, and document is loaded");

// rendering all projects on the page
  $.ajax({
    method: "GET",
    url: "api/projects",
    success: projectsLoadSuccess,
    error: projectsLoadError
  });

// adding a new project
$('#newProjectForm').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "api/projects",
      data: $(this).serialize(),
      success: projectPostSuccess,
      error: projectPostError
    });
    $(this).trigger("reset");
  });//end newProjectForm





});//end of doc.ready
// ajax functions
function projectsLoadSuccess(json){
  json.forEach(renderHandlebars);
}

function projectsLoadError(err){
  console.log("projectError return ", err);
}

// handlebar controls
function renderHandlebars(json) {
  console.log('rendering project:', json);
  var gettingHTML = $('#projectTemplate').html();
  var projectTemplate = Handlebars.compile(gettingHTML);

  var html = projectTemplate(json);
  $('#projectTarget').append(html);
}
