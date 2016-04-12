



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
  });

// deleting a project
  $('#projectTarget').on('click', '#projectDelete', function(){
    var $deleteButton = $(this).attr('data-id');
    $.ajax({
      method: 'DELETE',
      url: '/api/projects/'+$(this).attr('data-id'),
      success: deleteProjectSuccess($deleteButton),
      error: deleteProjectError
    });
  });

// add member
  $('#projectTarget').on('submit', '#newMemberForm', function(e){
    e.preventDefault();
    var $memberSubmit = $(this).attr('data-id');
    $.ajax({
      method: "POST",
      url: "api/projects/"+$(this).attr('data-id')+"/members",
      data: $(this).serialize(),
      success: memberPostSuccess,
      error: memberPostError
    });
    $(this).trigger("reset");
  });

// delete member
  $('#projectTarget').on('click', '.memberDelete', function(e){
    var $memberId = $(this).attr('data-member-id');
    var $projectId = $(this).attr('data-project-id');
    $.ajax({
      method: "DELETE",
      url: "api/projects/"+$projectId+"/members/"+$memberId,
      success: memberDeleteSuccess($memberId),
      error: memberDeleteError
    });
  });

// update member
  $('#projectTarget').on('submit', '#updateMemberForm', function(e){
    e.preventDefault();
    var $memberUpdate = $(this).attr('data-member-id');
    var $project = this.parentElement.parentElement.id;
    $.ajax({
      method: "PUT",
      url: "api/projects/"+$project+"/members/"+$memberUpdate,
      data: $(this).serialize(),
      success: memberUpdateSuccess,
      error: memberUpdateError
    });
  });

});//end of doc.ready

// ajax functions
// projects load
function projectsLoadSuccess(json){
  json.forEach(function(project){
    renderHandlebars(project);
  });
  var saw = new Audio('audio/saw.mp3');
  saw.play();
}
function projectsLoadError(err){
  console.log("projectLosdError return ", err);
}
// project post
function projectPostSuccess(json){
  console.log("project ", json);
  renderHandlebars(json);
}
function projectPostError(err){
  console.log("projectPostError return ", err);
}
// project delete
function deleteProjectSuccess($deleteButton){
  console.log("deleteProject succss");
  $('#'+$deleteButton).remove();
}
function deleteProjectError(err){
  console.log("deleteProjectError ", err);
}
// member post
function memberPostSuccess(oneProject){
  console.log("memberPostSuccess");
  var projectPos = $('#'+oneProject._id).index();
  $('#'+oneProject._id).remove();
  renderHandlebars(oneProject, projectPos);
}
function memberPostError(err){
  console.log("memberPostError ", err);
}
// member delete
function memberDeleteSuccess($memberId){
  console.log("memberDelete success");
  $('#'+$memberId).remove();
}
function memberDeleteError(err){
  console.log("memberDelete Error ", err);
}
// member update
function memberUpdateSuccess(json){
  console.log("memberUpdate success");
}
function memberUpdateError(err){
  console.log("member update error ", err);
}

// handlebar controls
function renderHandlebars(json, projectPos) {
  var gettingHTML = $('#projectTemplate').html();
  var projectTemplate = Handlebars.compile(gettingHTML);
  var html = projectTemplate(json);
  if(projectPos === 0){
    $('#projectTarget').prepend(html);
  }else if(projectPos !== undefined){
    $(html).insertAfter($('#projectTarget').children().eq(projectPos-1));
  }else{
  $('#projectTarget').append(html);
  }
}
