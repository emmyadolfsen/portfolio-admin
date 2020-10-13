"use strict"

// Toggla artiklarna vid klick på h2

$(document).ready(function(){
    $("#toggle-courses").click(function(){
      $("#courses-read").slideToggle();
    });
  });
  
  $(document).ready(function(){
    $("#toggle-work").click(function(){
      $("#work-toggle").slideToggle();
    });
  });

  $(document).ready(function(){
    $("#toggle-projects").click(function(){
      $("#projects-toggle").slideToggle();
    });
  });