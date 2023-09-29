// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// The below function will ensure that the code isnt run until the the browser has rendered all elements in the HTML
$(document).ready(function () {

  //  this loads your past saved events and will display them and load them in the correct areas
  for (let i = 9; i <= 17; i++) {
    const savedEvent = localStorage.getItem(`hour-${i}`);
    if (savedEvent) {
      $(`#hour-${i} .description`).val(savedEvent);
    }
    // The below function is displaying the current time in 24 hour format within the header field above the time table
    function updateDateTime() {
      const current = new Date();
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const dateTimeString = new Intl.DateTimeFormat('en-US', options).format(current);
      $('#dateTime').text(dateTimeString);
    }
  }
  // this is the save event for saving to local storage
  $(".saveBtn").on("click", function () {
    const hour = $(this).closest(".time-block").attr("class");
    const eventDescription = $(this).siblings(".description").val();
    localStorage.setItem(hour, eventDescription);
  });

  // function to update Time lock styles but I cant seem to figure out why it isnt working - I'm going crazy trying to get these to pair properly
  function updateTimeBlockStyles() {
    const currentHour = dayjs().hour();

    $(".time-block").each(function () {
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
  $(".saveBtn").on("click", function () {
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