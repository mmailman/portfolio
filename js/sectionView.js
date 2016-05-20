'use strict';
(function(module){
  var viewSection = {};

  //Method that handles navbar interations.
  viewSection.handleMainNav = function(){
    $('nav').on('click', '.tab', function(){
      var $target = $(this);
      console.log($target);
      $('.main-section').hide();
      $('.tab').removeClass('active');
      $($target).addClass('active');
      $('#' + ($(this).attr('data-content'))).fadeIn(500);
      if($($target).attr('data-content') === 'projects'){
        $('#stats').empty()
        .append(viewSection.renderStats())
        .fadeIn(500);
      }
    });
  };

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
    viewSection.handleMainNav();
    $('nav').find('a:contains("Projects")').click();
  };

  module.viewSection = viewSection;
})(window);
