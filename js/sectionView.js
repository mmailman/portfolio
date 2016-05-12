var viewSection = {};

viewSection.handleMainNav = function(){
  $('nav').on('click', '.tab', function(){
    var target = $(this);
    $('.main-section').hide();
    $('nav').removeClass('active');
    $('.main-section').each(function(index){
      if($(this).attr('id') === target.attr('data-content')){
        $(target).addClass('active');
        console.log('target: ' + target.html());
        $(this).fadeIn(2000);
      }
    });
  });
};

$(function(){
  viewSection.handleMainNav();
  $('nav').find('a', 'Projects').click();
});
