


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

// add member
  $('#projectTarget').on('submit', '#newMemberForm', function(e){
    // console.log($(this).serialize());
    e.preventDefault();
    var $memberSubmit = $(this).attr('data-id');
    $.ajax({
      method: "POST",
      url: "api/projects/"+$(this).attr('data-id')+"/members",
      data: $(this).serialize(),
      success: memberPostSuccess($memberSubmit),
      error: memberPostError
    });
    $(this).trigger("reset");
  });



});//end of doc.ready

// ajax functions
function projectsLoadSuccess(json){
  json.forEach(renderHandlebars);
}

function projectsLoadError(err){
  console.log("projectLosdError return ", err);
}

function projectPostSuccess(json){
  console.log("project ", json);
  renderHandlebars(json);
}

function projectPostError(err){
  console.log("projectPostError return ", err);
}

function deleteProjectSuccess($deleteButton){
  $('#'+$deleteButton).remove();
}

function deleteProjectError(err){
  console.log("deleteProjectError ", err);
}

function memberPostSuccess($memberSubmit){
  // console.log("membersPostSuccess is successful", $memberSubmit);
    // console.log('retrieved album w/ id: ', $memberSubmit);
    // console.log($memberSubmit);
    $.ajax({
      method: "GET",
      url: "api/projects/"+$memberSubmit,
      success: oneProjectSuccess,
      error: oneProjectError
    });
    function oneProjectSuccess(oneProject){
      console.log("member success ", oneProject);
      $('#' + $memberSubmit).remove();
      renderHandlebars(oneProject);
    }
    function oneProjectError(err){
      console.log("member error ", err);
    }
    // $.get('/api/projects/' + $memberSubmit, function(data) {
        // remove the current instance of the album from the page
        // $('#' + $memberSubmit).remove();
        // re-render it with the new album data (including songs)
        // renderHandlebars(data);
    // });
}


function memberPostError(err){
  console.log("memberPostError ", err);
}
// handlebar controls
function renderHandlebars(json) {
  // console.log('rendering project:', json);
  var gettingHTML = $('#projectTemplate').html();
  var projectTemplate = Handlebars.compile(gettingHTML);

  var html = projectTemplate(json);
  $('#projectTarget').append(html);
}
