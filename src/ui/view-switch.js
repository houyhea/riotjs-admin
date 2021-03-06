
/*
  Handle view switching, aka. "routing"
  The transition effect is done with CSS
*/
admin(function(app) {

  var klass = "is-active";

  // 1. select elements from the page to call $.route(path)
  app.root.on("click", "[href^='#/']", function(e) {

    e.preventDefault();

    var link = $(this);

    // no action
    if (link.hasClass(klass)) return;

    // loading indicator
    link.addClass("is-loading");

    // Riot changes the URL, notifies listeners and takes care of the back button
    $.route(link.attr("href"));

  });


  // 2. listen to route clicks and back button
  $.route(function(path) {

    // Call API method to load stuff from server
    app.load(path.slice(2));

  });

  // 3. Set "is-active" class name for the active page
  app.on("before:load", function() {

    // remove existing class
    $("." + klass).removeClass(klass);

  }).on("load", function(view) {

    // set a new class
    $("#" + view.type + "-page").add("#" + view.type + "-nav").addClass(klass);

    // remove loading indicator
    $("nav .is-loading").removeClass("is-loading");

  });

});

