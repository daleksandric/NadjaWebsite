/*
    Initialize Bootstrap Lightbox gallery
*/

$(document).on('click', '[data-toggle="lightbox"]', 
    function(event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            alwaysShowClose: true               
        });
    }
);