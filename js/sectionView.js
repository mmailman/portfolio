var viewSection = {};

viewSection.handleMainNav = function(){
  $('nav').on('click', '.tab', function(){
    var target = $(this);
    $('.main-section').hide();
    $('.tab').removeClass('active');
    $('.main-section').each(function(index){
      if($(this).attr('id') === target.attr('data-content')){
        $(target).addClass('active');
        $(this).fadeIn(500);
      }
    });
  });
};

viewSection.initIndexPage = function(){
  viewSection.handleMainNav();
};

$(function(){
  viewSection.initIndexPage();
  $('nav').find('a', 'Projects').click();
});
