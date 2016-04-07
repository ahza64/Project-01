console.log("JS is definitely working");



$(document).ready(function() {


  $('#newProjectForm').on('submit', function(e){
    e.preventDefault();
    var source = $('#projectTemplate').html();
    var template = Handlebars.compile(source);
    var $data = $(this).serialize();
    var html = template($data);
    console.log('serialized info from Project form ', $data);
    $('#projectTarget').append(html);
    $(this).trigger("reset");
  });//end newProjectForm




});//end of doc.ready
