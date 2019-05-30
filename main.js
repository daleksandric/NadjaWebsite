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

    $('#exampleModal').on('hidden.bs.modal', function(e) {
      clearInput();
    })
})

var numberOfGuests = 0;
function sendEmail() {

  let inputValues = readInput();
  if(inputValues.namesOfGuests[0].length > 0) {
    let templateParams = getEmailParameters(inputValues);

    emailjs.send('gmail', 'template_wb4zzh5Z', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
          console.log('FAILED...', error);
        });
  }
}

function getEmailParameters(inputValues) {
  let namesOfGuests = inputValues.namesOfGuests;
  let subjectText = `RSVP from ${namesOfGuests[0]}`;
  let bodyText = `Dear Nadja,<br>
  <br>
  I have decided to RSVP. My name is ${namesOfGuests[0]}.<br>
  <br>
  `;

  if(numberOfGuests = 1) {
    bodyText += `My plus one is ${namesOfGuests[1]}.<br>`;
  }

  if(inputValues.comment !== null && inputValues.comment.length > 0) {
    bodyText += `<br>Additional comments:<br>
        <i>${inputValues.comment}</i><br>`
    ;
  }

  bodyText += `<br>Sincerely,<br><br>
    ${namesOfGuests[0]}<br>
  `;

  return {
    subject: subjectText,
    body: bodyText
  }
}

function readInput() {
  let namesOfGuests = [];

  $('.guest').each(function() {
    namesOfGuests.push($(this).val())
  });
  let comment = $('#comment').val();

  return {
    namesOfGuests: namesOfGuests,
    comment: comment
  };
}

function clearInput() {
  numberOfGuests = 0;
  $('#comment').val('');

  let initialGuestHtml = `
    <div class="form-group row">
      <input type="text" class="form-control col-10 col-sm-10 guest" placeholder="Name" required>
      <div class="btn btn-primary col-2 col-sm-2 name-btn" onclick="javascript:addNameInput()"><span class="fas fa-user-plus size"></span></div>
    </div>
  `
  $("#guestsContainer").html(initialGuestHtml);
}

function addNameInput() {
  if(numberOfGuests === 0 ) {
    numberOfGuests = 1;
    let guestHtml = `
      <div class="form-group row">
        <input id="name${numberOfGuests}" type="text" class="form-control col-12 guest" placeholder="Name">
      </div>    
    `
    $("#guestsContainer").append(guestHtml);
  }

}
