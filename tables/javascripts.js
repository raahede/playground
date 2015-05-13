
function TableMountColumn( $el ) {
  this.$el = $el;
  this.$columElements = $('td:first-child, th:first-child', this.$el);
  this.timeout;
  // Initiate module
  this.initialize();
}

TableMountColumn.prototype = {
  addEventListeners : function() {
    $(window).on('redraw', $.proxy(this.onWindowUpdate, this));
    $(window).on('resize', $.proxy(this.onWindowUpdate, this));
    $(window).on('load', $.proxy(this.onWindowUpdate, this));
  },

  onWindowUpdate : function() {
    // Debounce
    clearTimeout(this.timeout);
    this.timeout = setTimeout($.proxy(this.updateColumns, this), 150);
  },

  updateColumns : function() {
    // Check table's css content parameter for 'mount-column' value
    if(this.$el.css('content') === 'mount-column'){
      this.$columElements.each(this.updateColumn);
    } else {
      this.resetColumns();
    }
  },

  updateColumn : function() {
    $(this).css('height', $(this).parent().innerHeight());
  },

  resetColumns : function() {
    this.$columElements.attr('style', null);
  },

  initialize : function() {
    this.$el.addClass('is-active');
    this.addEventListeners();
    this.updateColumns();
  }
};

function TableCompare( $el ) {
  this.$el = $el;
  // Initiate module
  this.initialize();
}

TableCompare.prototype = {
  setCellTitles : function($tr) {
    var _this = this;
    var $td = $('td, th' , $tr);

    $td.each(function() {
      var $th = _this.$th.eq($(this).index());
      $(this).attr('title', $th.text());
    });
  },

  initialize : function() {
    this.$th = $('thead tr:first th, thead tr:first td' , this.$el);
    var _this = this;
    var $tr = $('tbody tr' , this.$el);

    $tr.each(function() {
      _this.setCellTitles($(this));
    });
  }
};


$(document).ready(function() {
  $('.table--mount-column').each(function() {
    var tableObj = new TableMountColumn($(this));
  });

  $('.table--compare').each(function() {
    var tableObj = new TableCompare($(this));
  });
});
