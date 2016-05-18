'use strict';
(function(module){
  var viewSection = {};

  viewSection.handleMainNav = function(){
    $('nav').on('click', '.tab', function(){
      var target = $(this);
      console.log(target);
      $('.main-section').hide();
      $('.tab').removeClass('active');
      $('.main-section').each(function(index){
        if($(this).attr('id') === target.attr('data-content')){
          console.log('true');
          $(target).addClass('active');
          console.log($(this));
          $('.main-section').hide();
          $(this).fadeIn(500);
          //Added this because dynamic addition of navbar tab items is currently non-functional.
          if($('#projects').attr('style', 'display: block;')){
            $('#stats').empty()
            .append(viewSection.renderStats())
            .fadeIn(500);
          }
        }
      });
    });
  };

  viewSection.renderStats = function () {
    var $source = $('#stats-template').html();
    var template = Handlebars.compile($source);
    return template({totalLines: Project.totalLines});
  };

  //Alternative method to display stats.
  viewSection.displayStats = function(){
    $('#stats-container').append('<p>Total Lines of code written across Projects: ' + Project.totalLines() + '</p>');
  };

  viewSection.initIndexPage = function(){
    Project.all.forEach(function(project){
      $('#projects').append(project.toHtml());
    });
    viewSection.handleMainNav();
    $('nav').find('a', 'Projects').click();

  };

  module.viewSection = viewSection;
})(window);
