/*
    Initialize Bootstrap Lightbox gallery
*/

$(document).on('click', '[data-toggle="lightbox"]',
  function (event) {
    event.preventDefault();
    $(this).ekkoLightbox({
      alwaysShowClose: true
    });
  }
);

/* -----------------Smooth Scroll Code-------------- */

// Select all links with hashes
$(document).ready(function () {
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
})

function sendEmail() {

  let templateParams = readInput();

  emailjs.send('gmail', 'template_wb4zzh5Z', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        clearInput();
      }, function(error) {
        console.log('FAILED...', error);
      });
}

function readInput() {
  let name = $('#name').val();
  let numberOfGuests = $('#number').val();
  let comment = $('#comment').val();

  return {
    who_replied: name,
    number_of_guests: numberOfGuests, 
    comment: comment
  };
}

function clearInput() {
  $('#name').val('');
  $('#number').val('');
  $('#comment').val('');

}
