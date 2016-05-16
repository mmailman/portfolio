var projects = [];

function Project(project){
  for(key in project){
    this[key] = project[key];
  }

}

Project.prototype.toHtml = function(){
  var $source = $('#project-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

projectData.forEach(function(project){
  projects.push(new Project(project));
});

projects.forEach(function(project){
  $('#projects').append(project.toHtml());
});
