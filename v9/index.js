var current_city = 0;
var on_city = false;
var animating = false;

$(document).ready(function() {
});

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var height = window.outerHeight * 0.05;
    
    $(".city > .bg-group").each(function() {
        var offset = $(this).parent().offset().top;
        $(this).css("margin-top", height + ((offset - scroll)/-4));
    });
    
    current_city = 0;
    on_city = false;

    $(".city").each(function() {
        if (scroll > $(this).offset().top) {
            current_city++;
        }
    });
});

$(document).keydown(function(event) {
    //38 - up
    //40 - down
    
    if (event.which == 38 && !animating) {
        event.preventDefault();
        
        var target_index = current_city - 1;
        animating = true;

        $('html, body').animate(
            {scrollTop: $(".city").eq(target_index).offset().top}
        , 1000, function() {
            on_city = true;
            animating = false;
        });
    } else if (event.which == 40 && !animating) {
        event.preventDefault();

        var target_index = current_city;
        if (on_city) {
            target_index++;
        }
        animating = true;
        
        $('html, body').animate(
            {scrollTop: $(".city").eq(target_index).offset().top}
        , 1000, function() {
            on_city = true;
            animating = false;
        });
    }
});