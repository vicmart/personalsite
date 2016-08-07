/*jslint latedef:false*/

$(document).ready(function() {
    $(window).resize();
    
    bringUpPane(0);
    
    var height = $(document).height();
    
    $(".circle").each(function() {
        $(this).data('xvel', random(-5, 5));
        $(this).data('yvel', random(-5, 5));
        
        if ($(this).data('xvel') == 0) {
            $(this).data('xvel', 1);
        }
        if ($(this).data('yvel') == 0) {
            $(this).data('yvel', 1);
        }
        
        var short = Math.min($(window).width(), $(window).height());
        
        $(this).css('top', random(0, 70) + "%") ;
        $(this).css('left', random(0, 70) + "%");
        $(this).css('width', random(short * 0.15, short * 0.3));
        $(this).css('height', $(this).css('width'));
    });
    
    if (!isMobile()) {
        //animateCircles();
    } else {
        $(".background").remove();
    }
});

function bringUpPane(index) {
    $(".pane").eq(index).css("opacity", 1);
    $(".pane").eq(index).css("top", 0);
    
    if (index + 1 < $(".pane").length) {
        setTimeout(function() {
            bringUpPane(index + 1)
        }, 250);
    }
}

function random(low, high) {
    return low + (Math.random() * (high - low));
}

function animateCircles() {
    $(".circle").each(function() {
        var top = parseInt($(this).css('top'));
        var left = parseInt($(this).css('left'));
        var xvel = $(this).data('xvel');
        var yvel = $(this).data('yvel');
        
        if (left + xvel + $(this).width() > window.innerWidth || left + xvel < 0) {
            xvel *= -1;
            $(this).data('xvel', xvel);
        }
        if (top + yvel + $(this).height() > window.innerHeight || top + yvel < 0) {
            yvel *= -1;
            $(this).data('yvel', yvel);
        }
        
        $(this).css('top', top + yvel);
        $(this).css('left', left + xvel);
    });
    
    setTimeout(animateCircles, 33);
}

$(window).resize(function() {
    $(".pane").removeClass("pane-n-fit");
    $(".pane").removeClass("pane-2-fit");
    $(".pane").removeClass("pane-1-fit");
    
    $(".flag").removeClass("flag-center-h");
    $(".flag").removeClass("flag-center-v");
    
    $(".icon").removeClass("icon-centered");
    $(".icon").removeClass("icon-centered-70");

    $(".image").removeClass("image-dyn");
    $(".image").removeClass("image-dyn-m");
    $(".image").removeClass("image-sta");
    
    $(".label").removeClass("label-portrait");
    $(".label").removeClass("label-landscape");
    $(".label").removeClass("label-dyn");
    $(".label").removeClass("label-sta");
    
    $("h1").removeClass("h1-portrait");
    if (isMobile() && !isLandscape()) {
        $(".pane").addClass("pane-1-fit"); 
        
        $(".icon").addClass("icon-centered-70");
        $(".no-center").removeClass("icon-centered-70");
        $(".no-center").addClass("flag-center-v");
        
        $(".label").addClass("label-portrait");
        
        $(".image").addClass("image-dyn-m");
        
        $("h1").addClass("h1-portrait");
    } else if ((isMobile() && isLandscape()) || $(window).width() < 780) {
        $(".pane").addClass("pane-2-fit");
        $(".icon").addClass("icon-centered");
        $(".no-center").removeClass("icon-centered");

        if (isMobile() && isLandscape()) {
            $(".label").addClass("label-landscape");
        } else {
            $(".label").addClass("label-dyn");
        }
        
        $(".image").addClass("image-dyn");
    } else {
        $(".pane").addClass("pane-n-fit");
        $(".icon").addClass("icon-centered");
        $(".no-center").removeClass("icon-centered");

        $(".label").addClass("label-sta");

        $(".image").addClass("image-sta");
    }
});

function filterMore(element, intensity, max, interval) {
    $(element).css("-webkit-filter", "blur(" + intensity + "px)");
    $(element).css("-m-filter", "blur(" + intensity + "px)");    
    $(element).css("-moz-filter", "blur(" + intensity + "px)");    
    $(element).css("-o-filter", "blur(" + intensity + "px)");  
    $(element).css("filter", "blur(" + intensity + "px)");    
    if (intensity < max) {
        setTimeout(function () {
            filterMore(element, intensity + 1, max, interval)
        }, interval);
    }
}

function filterLess(element, intensity, interval) {
    $(element).css("-webkit-filter", "blur(" + intensity + "px)");
    $(element).css("-m-filter", "blur(" + intensity + "px)");    
    $(element).css("-moz-filter", "blur(" + intensity + "px)");    
    $(element).css("-o-filter", "blur(" + intensity + "px)");    
    $(element).css("filter", "blur(" + intensity + "px)");    
    if (intensity > -1) {
        setTimeout(function () {
            filterLess(element, intensity - 1, interval)
        }, interval);
    }
}

$(".pane").hover(function() {
        if (!isMobile()) {
            filterMore($(this).find(".image"), 1, 4, 50);
        }
        var total_height = $(this).height();
        var image_height = $(this).find(".image").height();
        var old_height = total_height - image_height;
        var new_top = (total_height/2) - old_height;
    
        $(this).find(".label").css("top", -1 * new_top);
    }, function () {
        if (!isMobile()) {
            filterLess($(this).find(".image"), 4, 50);
        }
        $(this).find(".label").css("top", 0);
    }
);

$(".pane").click(function() {
    var total_height = $(this).height();
    var image_height = $(this).find(".image").height();
    var old_height = total_height - image_height;
    var new_top = (total_height) - old_height;
    
    $(this).find(".label").css("top", -1 * new_top);
    //$(this).css("margin", "50px");
});

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isLandscape() {
    return window.innerWidth > window.innerHeight;
}