var projects = [];

function Project(project){
  this.projectName = project.projectName;
  this.imgPath = project.imgPath;
  this.lastUpdated = project.lastUpdated;
  this.projectUrl = project.projectUrl;
  this.description = project.description;

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
