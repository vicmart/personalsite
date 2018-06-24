var visited = [];
var previous_index = -1;
var guide_text = "";
var guide_subtext = "";
var reversed = false;

$('img[src$=".svg"]').each(function() {
    var $img = jQuery(this);
    var imgURL = $img.attr('src');
    var attributes = $img.prop("attributes");

    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Remove any invalid XML tags
        $svg = $svg.removeAttr('xmlns:a');

        // Loop through IMG attributes and apply on SVG
        $.each(attributes, function() {
            $svg.attr(this.name, this.value);
        });

        // Replace IMG with SVG
        $img.replaceWith($svg);
    }, 'xml');
});

$(document).ready(function() {
    $(".event").each(function() {
        visited.push(0); 
    });

    setTimeout(function() {
        $(".icon-wrapper").eq(0).removeClass("hidden");
        $(".big-pretitle").eq(0).removeClass("hidden");
        $(".big-date").eq(0).removeClass("hidden");
        $(".big-title").eq(0).removeClass("hidden");
        $(".big-subtitle").eq(0).removeClass("hidden");
    }, 250);

    $(window).scroll();
});

function reverse() {
    $('.group').reverseChildren();
    $('.early-subgroup').reverseChildren();
    $('.school-subgroup').reverseChildren();
    $('.work-subgroup').reverseChildren();
    if (!reversed) {
        reversed = true;
        $(".reverser").addClass("green");
        $(".reverser").addClass("reverser-active");
        $(".header").removeClass("red");
        $(".header").addClass("green");
        $(".footer").removeClass("green");
        $(".footer").addClass("red");                    
        $(".reverse-text").text("Most Recent First");
        $(".reverse-text").addClass("reverse-text-active");
    } else {
        reversed = false;
        $(".reverser").addClass("red");
        $(".reverser").removeClass("reverser-active");
        $(".header").removeClass("green");
        $(".header").addClass("red");
        $(".footer").removeClass("red");
        $(".footer").addClass("green");   
        $(".reverse-text").text("Chronological Order");
        $(".reverse-text").removeClass("reverse-text-active");
    }
}

$(".reverser").hover(function() {
    $(".reverse-text").removeClass("hidden");
}, function() {
    $(".reverse-text").addClass("hidden");
});

$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var index = 0;

    while (scroll > $(".big-text").eq(index).offset().top + $(".big-text").eq(index).outerHeight() - 300 && index < visited.length - 1) {
        index++;
    }

    $(".reverser").removeClass("red");
    $(".reverser").removeClass("blue");
    $(".reverser").removeClass("green");
    $(".d-background").removeClass("red-body");
    $(".body-background").removeClass("blue-body");
    $(".body-background").removeClass("green-body");

    $(".reverser").addClass("red");
    $(".body-background").addClass("red-body");
    if ($(".big-text").eq(index).parent().hasClass("blue")) {
        color = 1;
        $(".reverser").addClass("blue");
        $(".body-background").addClass("blue-body");
    } else if ($(".big-text").eq(index).parent().hasClass("green")) {
        color = 2;
        $(".reverser").addClass("green");
        $(".body-background").addClass("green-body");
    }


    if (visited[index] == 0) {
        visited[index] = 1;

        var counter = 1;
        var diff = 250;
        $(".icon-wrapper").eq(index).removeClass("hidden");
        $(".big-pretitle").eq(index).removeClass("hidden");
        $(".big-date").eq(index).removeClass("hidden");
        $(".big-title").eq(index).removeClass("hidden");
        $(".big-subtitle").eq(index).removeClass("hidden");
        setTimeout(function() { $(".big-text").eq(index).children(".subevent").eq(0).removeClass("hidden"); }, (counter++) * diff);
        setTimeout(function() { $(".big-text").eq(index).children(".subevent").eq(1).removeClass("hidden"); }, (counter++) * diff);
        setTimeout(function() { $(".big-text").eq(index).children(".subevent").eq(2).removeClass("hidden"); }, (counter++) * diff);
        setTimeout(function() { $(".big-text").eq(index).children(".subevent").eq(3).removeClass("hidden"); }, (counter++) * diff);
        setTimeout(function() { $(".big-text").eq(index).children(".subevent").eq(4).removeClass("hidden"); }, (counter++) * diff);
    }

    previous_index = index;
});

$("#toTop").click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 2000);
});

$(".subevent").mouseenter(function() {
    if ($(window).width() > 850 && !$(this).parent().parent().hasClass("school")) {
        guide_subtext = $(this).data("info");

        $(this).children(".text").children(".subtitle").addClass("expand");

        var text = $(this).children(".text")[0];
        var text_height = $(text).outerHeight();
        $(text).css("margin-top", (145 - text_height)/2);


        /**if (guide_subtext.localeCompare("...") != 0) {

            $(".guide-text").css("opacity", 0);

            setTimeout(function() {
                $(".guide-text").html(guide_subtext);
                $(".guide-text").css("opacity", 1);

                setTimeout(function() {
                    var height = $(".guide-text").height();
                    $(".guide-text").css("padding-top", ($(".guide").height() - height)/2);
                }, 125);
            }, 125);
        }**/
    }
});

$(".subevent").mouseleave(function() {
    if ($(window).width() > 850) {
        var text = $(this).children(".text")[0];
        $(text).css("margin-top", 0);

        $(this).children(".text").children(".subtitle").removeClass("expand");

        /**if (guide_subtext.localeCompare("...") != 0) {

            $(".guide-text").css("opacity", 0);

            setTimeout(function() {
                $(".guide-text").html(guide_text);
                $(".guide-text").css("opacity", 1);

                setTimeout(function() {
                    var height = $(".guide-text").height();
                    $(".guide-text").css("padding-top", ($(".guide").height() - height)/2);
                }, 125);
            }, 125);
        }**/
    }
});

$(".switcher").click(function() {
    guide_active = -1;

    $(".reverser").removeClass("red");
    $(".reverser").removeClass("blue");
    $(".reverser").removeClass("green");

    if ($(this).hasClass("reverser") == false) {                    
        if ($(".window").hasClass("window-small")) {
            $(".window").removeClass("window-small");
            $(".code").removeClass("code-big");
            $(".switcher").removeClass("switcher-active");
            setTimeout(function() {
                var height = $(".guide-text").height();
                $(".guide-text").css("padding-top", ($(".guide").height() - height)/2);
            }, 500);

            code_active = false;
        } else {
            $(".window").addClass("window-small");
            $(".code").addClass("code-big");
            $(".switcher").addClass("switcher-active");

            setTimeout(function() {
                var height = $(".guide-text").height();
                $(".guide-text").css("padding-top", ($(".guide").height() - height)/2);
            }, 500);

            code_active = true;
        }
    } else if ($(this).hasClass("reverse-text") == false) {
        reverse();
        $('html, body').stop();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);

        visited = [];
        $(".event").each(function() {
            visited.push(0); 
        });
    }
});

$.fn.reverseChildren = function() {
    return this.each(function(){
        var $this = $(this);
        $this.children().each(function(){ $this.prepend(this) });
    });
};