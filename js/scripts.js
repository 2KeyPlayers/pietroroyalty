function initialize() {
  $('span.copyright').html('2016-' + new Date().getFullYear());

  // var href = window.location.href;
  // var url = new URL(href);
  // var id = url.searchParams.get("id");
  // if (id && $('#' + id)) {
  //   $('html, body').animate({
  //     scrollTop: parseInt($('#' + id).offset().top)
  //   });
  // }
}

function top() {
  $('html, body').animate(
    {
      scrollTop: 0
    },
    500
  );
}

function toggleNavigation() {
  if ($('.searchbar').is('.opened')) {
    toggleSearch();
  }
  $('.sidenav').toggleClass('opened');
  $('#overlay').toggle();
  //$("html").toggleClass("opened");
  //$("body").toggleClass("opened");
}

function toggleSearch() {
  if ($('.sidenav').is('.opened')) {
    toggleNavigation();
  }
  var bar = $('.searchbar');
  bar.toggleClass('opened');
  $('#overlay').toggle();
  //$("html").toggleClass("opened");
  //$("body").toggleClass("opened");
  if (bar.is('.opened')) {
    $('#search-bar input').focus();
  }
}

function search() {
  //toggleSearch();
  var value = $('#search')
    .val()
    .toLowerCase();
  var counter = 0;
  $('.post').each(function() {
    $(this).removeClass('white');
    $(this).removeClass('grey');
    if (value == '') {
      $(this).show();
    }
    if (
      $(this)
        .attr('tags')
        .toLowerCase()
        .search(value) >= 0 ||
      $(this)
        .find('h2')
        .text()
        .toLowerCase()
        .search(value) >= 0 ||
      $(this)
        .find('h3')
        .text()
        .toLowerCase()
        .search(value) >= 0
    ) {
      var cls = counter % 2 == 0 ? 'white' : 'grey';
      $(this).addClass(cls);
      counter++;
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

$(function() {
  // Check if the device supports touch events
  if ('ontouchstart' in document.documentElement) {
    // Loop through each stylesheet
    for (var sheetI = document.styleSheets.length - 1; sheetI >= 0; sheetI--) {
      var sheet = document.styleSheets[sheetI];
      // Verify if cssRules exists in sheet
      if (sheet.cssRules) {
        // Loop through each rule in sheet
        for (var ruleI = sheet.cssRules.length - 1; ruleI >= 0; ruleI--) {
          var rule = sheet.cssRules[ruleI];
          // Verify rule has selector text
          if (rule.selectorText) {
            // Replace hover psuedo-class with active psuedo-class
            rule.selectorText = rule.selectorText.replace(':hover', ':active');
          }
        }
      }
    }
  }
});

$(document).ready(function() {
  $('#overlay').click(function() {
    if ($('.sidenav').is('.opened')) {
      toggleNavigation();
    } else if ($('.searchbar').is('.opened')) {
      toggleSearch();
    }
  });

  $('a.top').click(function() {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      400
    );
  });

  $('#search').keyup(function(e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      toggleSearch();
    } else {
      search();
    }
  });
});
