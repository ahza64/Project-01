


$(document).ready(function() {
  console.log("JS is definitely working, and document is loaded");

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
function renderHandlebars(json) {
  console.log('rendering project:', json);
  var gettingHTML = $('#projectTemplate').html();
  var projectTemplate = Handlebars.compile(gettingHTML);

  var html = projectTemplate(json);
  $('#projectTarget').append(html);
}
