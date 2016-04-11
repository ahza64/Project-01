


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
      success: memberPostSuccess,
      error: memberPostError
    });
    $(this).trigger("reset");
  });

// delete member
  $('#projectTarget').on('click', '.memberDeleteBtn', function(e){
    var $memberUpdate = $(this).attr('data-member-id');
    var $project = $(this).closest(".").attr("itsits");
    var $projects = this.parentElement.parentElement.id;
    console.log("parentElement ", $projects);
    $.ajax({
      method: "DELETE",
      url: "api/projects/"+$projects+"/members/"+$memberUpdate,
      data: $(this).serialize(),
      success: memberDeleteSuccess,
      error: memberDeleteError
    });
  });

// update member
  $('#projectTarget').on('submit', '#updateMemberForm', function(e){
    e.preventDefault();
    var $memberUpdate = $(this).attr('data-member-id');
    var $projects = this.parentElement.parentElement.id;
    // console.log("thig this here ", $projects, this);
    $.ajax({
      method: "PUT",
      url: "api/projects/"+$projects+"/members/"+$memberUpdate,
      data: $(this).serialize(),
      success: memberUpdateSuccess,
      error: memberUpdateError
    });
  });

});//end of doc.ready

// ajax functions
function projectsLoadSuccess(json){
  json.forEach(function(project){
    renderHandlebars(project);
  });
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

function memberPostSuccess(oneProject){
  console.log("memberPostSuccess");
  var projectPos = $('#'+oneProject._id).index();
  $('#'+oneProject._id).remove();
  renderHandlebars(oneProject, projectPos);
}

function memberPostError(err){
  console.log("memberPostError ", err);
}

function memberDeleteSuccess(json){
  console.log("memberDelete success");
}

function memberDeleteError(err){
  console.log("memberDelete Error ", err);
}

function memberUpdateSuccess(json){
  console.log("memberUpdate success ", json);
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
