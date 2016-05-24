'use strict';
(function(module){
  var viewSection = {};

  //Method that renders the Stats section.
  viewSection.renderStats = function () {
    var $source = $('#stats-template').html();
    var template = Handlebars.compile($source);
    return template({totalLines: Project.totalLines, projectStats: Project.collateTotals});
  };

  //Method that initializes the Index page, it is called upon page load.
  viewSection.initIndexPage = function(){
    Project.all.forEach(function(project){
      $('#projects').append(project.toHtml());
    });
    $('#stats').show().empty().append(viewSection.renderStats());

    $('nav').find('a:contains("Projects")').click();
  };

  module.viewSection = viewSection;
})(window);
