console.log("JS is definitely working");



$(document).ready(function() {


  $.ajax({
    method: "GET",
    url: "api/sanity",
    success: sanitySuccess,
    error: sanityError
  });

  $('#newProjectForm').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "api/project",
      data: $(this).serialize(),
      success: projectSuccess,
      error: projectError
    });


    $(this).trigger("reset");
  });//end newProjectForm



});//end of doc.ready


function sanitySuccess(json){
  // $('.test').append(json.message);
  console.log("ajax success ", json);
  renderHandlebars(json);
}


function sanityError(err){
  console.log("ajax err");
}

function renderHandlebars(project) {
  console.log('rendering project:', project);
  var gettingHTML = $('#projectTemplate').html();
  var projectTemplate = Handlebars.compile(gettingHTML);

  var html = projectTemplate(project);
  $('#projectTarget').append(html);
}
