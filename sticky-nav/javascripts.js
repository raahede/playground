
var StickyNav = (function($) {
  'use strict';

  var $nav,
      $clone,
      headroomObj,
      timeout;

  function initialize() {
    $nav = $('#sticky-nav');

    if($nav.length) {
      var promise = $.get('//cdnjs.cloudflare.com/ajax/libs/headroom/0.7.0/headroom.min.js');
      promise.done(_setupSticky);
    }
  }

  function _setupSticky() {
    $clone = $nav.clone().addClass('sticky-clone');
    $('body').append($clone);
    headroomObj = new Headroom($clone[0], {
      offset : _getNavOffset(),
    }).init();
    $(window).on('redraw', _onWindowResize);
    $(window).on('resize', _onWindowResize);
  }

  function _getNavOffset() {
    var offset = $nav.offset().top;
    var height = $nav.outerHeight();
    return offset + height;
  }

  function _onWindowResize( event ) {
    // Debounce
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      headroomObj.offset = _getNavOffset();
    }, 150);
  }

  return {
    initialize: initialize
  };

})(jQuery);

$(document).ready(function() {
  StickyNav.initialize();
});
