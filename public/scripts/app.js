console.log("JS is definitely working");

$(document).ready(function() {
  console.log('app.js loaded!');

$('#newProjectForm').on('submit', function(e){
  e.preventDefault();
  console.log('guuuud');
  console.log('serialized info from Project form ', $(this).serialize());
});




});//end of doc.ready
