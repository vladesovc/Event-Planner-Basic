// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// The below function will ensure that the code isnt run until the the browser has rendered all elements in the HTML
$(document).ready(function() {

//  this loads your past saved events and will display them and load them in the correct areas
  for (let i = 9; i <= 17; i++) {
    const savedEvent = localStorage.getItem(`hour-${i}`);
    if (savedEvent) {
      $(`#hour-${i} .description`).val(savedEvent);
    }
    // The below function is displaying the current date and time within the header field above the time table
    function updateDateTime() {
      const current = new Date();
      const dateTimeString = current.toLocaleString();
      $('#dateTime').text('' + dateTimeString);
    }
  }
 // this is the save event for saving to local storage
  $(".saveBtn").on("click", function() {
    const hour = $(this).closest(".time-block").attr("class");
    const eventDescription = $(this).siblings(".description").val();
    localStorage.setItem(hour, eventDescription);
  });

  // function to update Time lock styles but I cant seem to figure out why it isnt working - I may have confused myself with the naming and the targeting
  function updateTimeBlockStyles() {
    const currentHour = new Date().getHours();
  
    $(".time-block").each(function() {
      const hour = parseInt($(this).attr("class").split('-')[1]);
  
      if (hour < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (hour === currentHour) {
        $(this).addClass('present').removeClass('past future');
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }  
// jQuery event listener look for a save button click and it should retrieve the hour from the parent time block class - saving the hour and the text inside
  $(".saveBtn").on("click", function() {
    const hour = $(this).closest(".time-block").attr("class");
    const eventDescription = $(this).siblings(".description").val();
    localStorage.setItem(hour, eventDescription);

    // Call updateTimeBlockStyles after saving an event if I could get this to work
    updateTimeBlockStyles();
  });

 // Update styles every hour
  updateTimeBlockStyles();
  setInterval(updateTimeBlockStyles, 3600000);

  //updates current time on header every second
  updateDateTime();
  setInterval(updateDateTime, 1000);

});


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

