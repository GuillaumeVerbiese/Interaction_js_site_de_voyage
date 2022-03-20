const app = {

  init: function()
  {
    destinations.init();
    newsletter.init();
    reviews.init();
    slider.init();
    theme.init();
  }

}

document.addEventListener( "DOMContentLoaded", app.init );