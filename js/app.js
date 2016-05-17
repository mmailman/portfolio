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
  Project.all.forEach(function(project){
    $('#projects').append(project.toHtml());
  });
};

Project.localAjaxCall = function(){
  $.ajax({
    url: '/data/projectData.json',
    success: function(data, textStatus, xhr){
      var eTag = xhr.getResponseHeader('ETag');
      localStorage.eTag = JSON.stringify(eTag);
      Project.loadAll(data);
      localStorage.projectData = JSON.stringify(data);
      viewSection.initIndexPage();
    }
  });
};

Project.fetchAll = function(){
  if(localStorage.projectData){
    $.ajax({
      type: 'HEAD',
      url: '/data/projectData.json',
      success: function(data, textStatus, xhr){
        var eTag = xhr.getResponseHeader('ETag');
        console.log('Most recent etag: ' + eTag);
        if(eTag === JSON.parse(localStorage.eTag)){
          Project.loadAll(JSON.parse(localStorage.projectData));
          viewSection.initIndexPage();
          console.log('Most recent etag is equal to localStorage.etag');
        }else{
          Project.localAjaxCall();
        }
      }
    });
  }else{
    Project.localAjaxCall();
  }
};
