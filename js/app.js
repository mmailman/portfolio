'use strict';
(function(module){
  function Project(project){
    for(var key in project){
      this[key] = project[key];
    }
    this.projectTotal = Project.projectLines(this.code);
  }

  Project.all = [];

  Project.prototype.toHtml = function(){
    var $source = $('#project-template').html();
    var template = Handlebars.compile($source);
    return template(this);
  };

  Project.loadAll = function(data){
    data.map(function(ele) {
      Project.all.push(new Project(ele));
    });
  };

  Project.projectLines = function(code){
    return code.reduce(function(a, b){
      return a + b;
    });
  };

  Project.totalLines = function(){
    return Project.all.map(function(project){
      return project.projectTotal;
    }).reduce(function(a, b){
      return a + b;
    }, 0);
  };

  Project.getAll = function(next){
    $.getJSON('/data/projectData.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.projectData = JSON.stringify(responseData);
      next();
    });
  };

  Project.fetchAll = function(next){
    if(localStorage.projectData){
      $.ajax({
        type: 'HEAD',
        url: '/data/projectData.json',
        success: function(data, textStatus, xhr){
          var eTag = xhr.getResponseHeader('ETag');
          if(!localStorage.eTag || eTag !== localStorage.eTag){
            localStorage.etTag = eTag;
            Project.getAll(next);
          }else{
            Project.loadAll(JSON.parse(localStorage.projectData));
            if (next) next();
          }
        }
      });
    }else{
      Project.getAll(next);
    }
  };
  module.Project = Project;
})(window);
