(function(module){
  function Project(project){
    for(key in project){
      this[key] = project[key];
    }
  }

  Project.all = [];

  Project.prototype.toHtml = function(){
    var $source = $('#project-template').html();
    var template = Handlebars.compile($source);
    return template(this);
  };

  Project.loadAll = function(data){
    data.forEach(function(ele) {
      Project.all.push(new Project(ele));
    });
  };

  Project.totalLines = function(){
    return Project.all.map(function(project){
      return project.code.reduce(function(a, b){
        return a + b;
      });
    }).reduce(function(a, b){
      return a + b;
    });
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
    module.Project = Project;
  };
})(window);
