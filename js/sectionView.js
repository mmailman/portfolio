'use strict';
(function(module){
  var viewSection = {};

  viewSection.handleMainNav = function(){
    $('nav').on('click', '.tab', function(){
      var $target = $(this);
      console.log($target);
      $('.main-section').hide();
      $('.tab').removeClass('active');
      $($target).addClass('active');
      $('#' + ($(this).attr('data-content'))).fadeIn(500);
      //Added this because dynamic addition of navbar tab items is currently non-functional.
      if($($target).attr('data-content') === 'projects'){
        $('#stats').empty()
        .append(viewSection.renderStats())
        .fadeIn(500);
      }
    });
  };

  viewSection.renderStats = function () {
    var $source = $('#stats-template').html();
    var template = Handlebars.compile($source);
    return template({totalLines: Project.totalLines});
  };

  viewSection.initIndexPage = function(){
    Project.all.forEach(function(project){
      $('#projects').append(project.toHtml());
    });
    viewSection.handleMainNav();
    $('nav').find('a:contains("Projects")').click();

  };

  module.viewSection = viewSection;
})(window);
