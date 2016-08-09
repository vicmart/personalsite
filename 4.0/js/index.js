/*jslint latedef:false*/

$(document).ready(function() {
    $(window).resize();
    
    $(".underline").addClass("underline-slower");
    bringUpTitle(0, 250);
    
    var height = $(document).height();
    
    $(".circle").each(function() {
        $(this).data('xvel', random(-3, 3));
        $(this).data('yvel', random(-3, 3));
        $(this).data('fadeCounter', random(0, 250));
        
        if ($(this).data('fadeCounter') < 0) {
            $(this).css("opacity",  0);
        }
        
        if ($(this).data('xvel') == 0) {
            $(this).data('xvel', 1);
        }
        if ($(this).data('yvel') == 0) {
            $(this).data('yvel', 1);
        }
        
        var short = Math.min($(window).width(), $(window).height());
        
        $(this).css('top', random(0, 70) + "%");
        $(this).css('left', random(0, 70) + "%");
        $(this).css('width', random(short * 0.15, short * 0.3));
        $(this).css('height', $(this).css('width'));
    });
    
    if (!isMobile()) {
        animateCircles();
    } else {
        $(".background").remove();
    }
});

function bringUpTitle(index, time) {
    $(".letter").eq(index).css("opacity", 1);
    
    if (index == 6) {
        $(".underline").css("width", "40%");
    } else if (index == 11) {
        $(".subtitle").css("opacity", 1);
        $(".subtitle").css("top","calc(50vh - 50px)");
    }
    
    if (index + 1 < $(".letter").length) {
        setTimeout(function() {
            if (index < 1 && $(window).scrollTop() != 0) {
                $(".letter").each(function() {
                    $(this).css("opacity", 1);
                });
                finishTitle(time);
            } else {
                bringUpTitle(index + 1, time);
            }
        }, time);
    } else {
        $(".underline").removeClass("underline-slower");
        $(".underline").addClass("underline-faster");

        setTimeout(function() {
            finishTitle(time);
        }, time * 7);
    }
}

function finishTitle(time) {
    $(".big-title").css("top", 0);
    $(".big-title").css("font-size", parseInt($(".big-title").css("font-size"))/2 + "px");
    $(".underline").css("top", 0);
    $(".underline").css("width", "10%");
    $(".subtitle").css("opacity", 0);
    $(".subtitle").css("top", 0);

    setTimeout(function() {
        $(".subtitle").remove();
        bringUpBase(0, time);

        $(".fake-header").css("height", parseInt($(".header").css("height")) + 10);
        $(".header").addClass("header-shadow");
    }, time * 2);
}

function bringUpBase(index, time) {
    $(".base").eq(index).css("opacity", 1);
    $(".base").eq(index).css("top", 0);
    
    if (index + 1 < $(".base").length) {
        setTimeout(function() {
            if (index < 1 && $(window).scrollTop() != 0) {
                bringUpBaseInstantly();
            } else {
                bringUpBase(index + 1, time);
            }
        }, time);
    }
}

function bringUpBaseInstantly() {
    $(".base").each(function() {
        $(this).css("opacity", 1); 
        $(this).css("top", 0); 
    });
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
        var fade = $(this).data('fadeCounter');
        
        if (left + $(this).width() > window.innerWidth && xvel > 0) {
            xvel *= -1;
        } else if (left < 0 && xvel < 0) {
            xvel *= -1;
        }
            
        if (top + $(this).height() > window.innerHeight && yvel > 0) {
            yvel *= -1;
        } else if (top < 0 && yvel < 0) {
            yvel *= -1;
        }
        
        fade--;
        
        if (fade < 0) {
            if ($(this).css("opacity") < 0.05) {
                $(this).css("opacity", 0.3);
                
                $(this).css('top', random(0, 70) + "%");
                $(this).css('left', random(0, 70) + "%");
                $(this).data('xvel', random(-3, 3));
                $(this).data('yvel', random(-3, 3));
                
                fade =  random(100, 400);
            } else {
                $(this).css("opacity", 0);  
                fade =  random(100, 400);
            }
            
        } else {           
            $(this).css('left', left + xvel);
            $(this).css('top', top + yvel);
        
            $(this).data('xvel', xvel);
            $(this).data('yvel', yvel);
        }
        
        $(this).data('fadeCounter', fade);
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