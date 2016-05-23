'use strict';
(function(module){
  function Project(project){
    for(var key in project){
      this[key] = project[key];
    }
    this.projectTotal = Project.projectLines(this.code);
  }

  Project.all = [];

  //Method that compiles the project template and returns it.
  Project.prototype.toHtml = function(){
    var $source = $('#project-template').html();
    var template = Handlebars.compile($source);
    return template(this);
  };

  //Method that populates the Project.all property
  Project.loadAll = function(data){
    data.map(function(ele) {
      Project.all.push(new Project(ele));
    });
  };

  //Method that is used to populate the projectTotal property
  Project.projectLines = function(code){
    return code.reduce(function(a, b){
      return a + b;
    });
  };

  //Method that is used to calculate the total lines of code across projects, it is called by the stats template.
  Project.totalLines = function(){
    return Project.all.map(function(project){
      return project.projectTotal;
    }).reduce(function(a, b){
      return a + b;
    }, 0);
  };

  //Method to grab each project's total lines into a format that is usable for a handlebars template
  Project.collateTotals = function(){
    return Project.all.map(function(project){
      // console.log(typeof(project.projectTotal));
      return ('<li>' + project.projectName + ': '+ project.projectTotal + ' lines</li>');
    }).reduce(function(a, b){
      return a + b;
    });
  };

  //Method that pulls in the data from the json file in our Project object
  Project.getAll = function(next){
    $.getJSON('/data/projectData.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.projectData = JSON.stringify(responseData);
      next();
    });
  };

  //Method that checks local storage for the data and determines if we use it or parse it from the json file.
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
