//This is my javascript for assignment 7.  
//Most javascript was coded by Curran(Thanks), 
//Simple variable names were changed, along with some ID locators

// Wrap everything in an immediately invoked function expression,
// so no global variables are introduced.
(function () {

  // Stores the cached partial HTML pages.
  // Keys correspond to fragment identifiers.
  // Values are the text content of each loaded partial HTML file.
  var pC = {};

  // Gets the appropriate content for the given fragment identifier.
  // This function implements a simple cache.
  function getContent(fId, callback){

    // If the page has been fetched before,
    if(pC[fId]) {

      // pass the previously fetched content to the callback.
      callback(pC[fId]);

    } else {
      // If the page has not been fetched before, fetch it.
      $.get(fId + ".html", function (content) {

        // Store the fetched content in the cache.
        pC[fId] = content;

        // Pass the newly fetched content to the callback.
        callback(content);
      });
    }
  }

  // Sets the "active" class on the active navigation link.
  function setActiveLink(fId){
    $("#WebNav a").each(function (i, linkElement) {
      var link = $(linkElement),
          pageName = link.attr("href").substr(1);
      if(pageName === fId) {
        link.attr("class", "active");
      } else {
        link.removeAttr("class");
      }
    });
  }

  // Updates dynamic content based on the fragment identifier.
  function navigate(){

    // Isolate the fragment identifier using substr.
    // This gets rid of the "#" character.
    var fId = location.hash.substr(1);

    // Set the "content" div innerHTML based on the fragment identifier.
    getContent(fId, function (content) {
      $("#content").html(content);
    });

    // Toggle the "active" class on the link currently navigated to.
    setActiveLink(fId);
  }

  // If no fragment identifier is provided,
  if(!location.hash) {

    // default to #index.
    location.hash = "#home";
  }

  // Navigate once to the initial fragment identifier.
  navigate();

  // Navigate whenever the fragment identifier value changes.
  $(window).bind('hashchange', navigate);
}());
