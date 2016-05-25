'use strict';
(function(module){
  function Project(project){
    for(var key in project){
      this[key] = project[key];
    }
    this.projectTotal = Project.projectLines(this.code);
  }

  Project.all = [];
  Project.reposArray = [];

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
      return ('<li>' + project.projectName + ': '+ project.projectTotal + ' lines</li>');
    }).reduce(function(a, b){
      return a + b;
    });
  };

  //Method that pulls in the data from the json file in our Project object
  Project.getAll = function(next){
    $.getJSON('/data/projectData.json', function(responseData) {
      Project.loadAll(responseData);
      Project.requestRepos(Project.repoDataMerge);
      // localStorage.projectData = JSON.stringify(responseData);
      localStorage.projectData = JSON.stringify(Project.all);
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

  //Method that call upon the github /repos endpoint to get all the repositories sorted by last updated from my github account filtered by non fork repos.
  Project.requestRepos = function(callback){
    $.ajax({
      url: 'https://api.github.com/users/' + gitRepo.gitUser + '/repos' + '?sort=updated',
      type: 'GET',
      headers: {'Authorization': 'token ' + gitRepo.gitToken},
      success: function(data, message, xhr){
        console.log(data);
        Project.reposArray = data.filter(function(repo){
          return repo.fork === false;
        });
        callback();
      }
    });
  };

  //Method to mutate the data in the Project.all property with updated information from the github /repos api
  Project.repoDataMerge = function(){
    Project.reposArray.forEach(function(repo){
      Project.all.forEach(function(project){
        if(repo.name === project.repoName){
          project.lastUpdated = repo.updated_at;
          project.repoUrl = repo.html_url;
        }
      });
    });
  };

  module.Project = Project;
})(window);
