'use strict';
(function(module){
  var aboutController = {};

  aboutController.index = function(){
    $('.tab').removeClass('active');
    $('li[data-content="about-me"]').addClass('active');
    $('#projects').hide();
    $('#stats').hide();
    $('#about-me').show();
  };

  module.aboutController = aboutController;
})(window);
