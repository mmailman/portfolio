'use strict';
(function(module){
  var projectController = {};

  projectController.index = function(){
    if($('#projects').length === 0){
      Project.fetchAll(viewSection.initIndexPage);
    }
    $('.tab').removeClass('active');
    $('li[data-content="projects"]').addClass('active');
    $('.main-section').hide();
    $('#projects').show();
    $('#stats').show();
  };

  module.projectController = projectController;
})(window);
