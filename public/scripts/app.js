console.log("JS is definitely working");



$(document).ready(function() {

$('#newProjectForm').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      method: "GET",
      url: "api/projects",
      // data: $(this).serialize(),
      success: projectSuccess,
      error: projectError
    });
    $(this).trigger("reset");
  });//end newProjectForm





});//end of doc.ready
// ajax functions
function projectSuccess(json){
  renderHandlebars(json);
}

function projectError(err){
  console.log("projectError return ", err);
}

// handlebar controls
function renderHandlebars(project) {
  console.log('rendering project:', project);
  var gettingHTML = $('#projectTemplate').html();
  var projectTemplate = Handlebars.compile(gettingHTML);

  var html = projectTemplate(project);
  $('#projectTarget').append(html);
}
