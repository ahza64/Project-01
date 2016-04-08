


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
  });//end new Project

// deleting a project
  $('#projectTarget').on('click', '.deleteBtn', function(){
    console.log('clicked delete button to', '/api/projects/'+$(this).attr('data-id'));
    var $deleteButton = $(this).attr('data-id');
    $.ajax({
      method: 'DELETE',
      url: '/api/projects/'+$(this).attr('data-id'),
      success: deleteProjectSuccess($deleteButton),
      error: deleteProjectError
    });
  });//end delete project





});//end of doc.ready
// ajax functions
function projectsLoadSuccess(json){
  json.forEach(renderHandlebars);
}

function projectsLoadError(err){
  console.log("projectLosdError return ", err);
}

function projectPostSuccess(json){
  renderHandlebars(json);
}

function projectPostError(err){
  console.log("projectPostError return ", err);
}

function deleteProjectSuccess($deleteButton){
  console.log("this is the delete", $deleteButton);
  $('#'+$deleteButton).remove();
}

function deleteProjectError(err){
  console.log("deleteProjectError ", err);
}

// handlebar controls
function renderHandlebars(json) {
  console.log('rendering project:', json);
  var gettingHTML = $('#projectTemplate').html();
  var projectTemplate = Handlebars.compile(gettingHTML);

  var html = projectTemplate(json);
  $('#projectTarget').append(html);
}
