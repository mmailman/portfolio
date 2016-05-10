var projects = [];

function Project(project){
  this.projectName = project.projectName;
  this.imgPath = project.imgPath;
  this.lastUpdated = project.lastUpdated;
  this.projectUrl = project.projectUrl;
  this.description = project.description;

}

Project.prototype.toHtml = function(){
  var $newProject = $('article.template').clone();

  $newProject.find('img').attr('src', this.imgPath);
  $newProject.find('h3').html(this.projectName);
  $newProject.find('a').attr('href', this.projectUrl).html(this.projectUrl); //experiment
  // $newProject.find('a').html(this.projectUrl);
  $newProject.find('time').html('Last updated: ' + this.lastUpdated);
  $newProject.find('.description').html(this.description);

  $newProject.removeClass('template');
  return $newProject;
};

projectData.forEach(function(project){
  projects.push(new Project(project));
});

projects.forEach(function(project){
  $('#projects').append(project.toHtml());
});
