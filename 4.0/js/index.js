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
        
        $(this).css('top', (height * random(0, 70))/100.0 ) ;
        $(this).css('left', random(0,70) + "%");
        $(this).css('width', random(short * 0.15, short * 0.3));
        $(this).css('height', $(this).css('width'));
    });
    
    if (!isMobile()) {
        animateCircles();
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
        
        if (left + xvel + $(this).width() > $(window).width() || left + xvel < 0) {
            xvel *= -1;
            $(this).data('xvel', xvel);
        }
        if (top + yvel + $(this).height() > $(window).height() || top + yvel < 0) {
            yvel *= -1;
            $(this).data('yvel', yvel);
        }
        
        $(this).css('top', top + yvel);
        $(this).css('left', left + xvel);
    });
    
    setTimeout(animateCircles, 33);
}

$(window).resize(function() {
    if ($(window).width() < 780 || isMobile()) {
        $(".pane").css("width", "calc(50% - 40px)");
        $(".pane").css("height", $(".pane").css("width"));
        $(".icon").removeClass("icon-centered");
        $(".label").css("padding-top", "6%");
        
        if (isMobile() && window.innerWidth < window.innerHeight) {
            $(".icon").addClass("icon-centered-70");
            $(".pane").css("width", "calc(100% - 40px)");
            $(".pane").css("height", $(".pane").css("width")/2);
            $(".label").css("padding-top", "2%");
            $(".label").css("font-size", "60px");     
        } else if (isMobile() && window.innerWidth > window.innerHeight){
            $(".label").css("font-size", "32px");
        }
    } else {
        $(".pane").css("width", "350px");
        $(".pane").css("height", "250px");
        $(".icon").addClass("icon-centered");
        $(".label").css("padding-top", "4%");
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
        $(this).find(".label").css("top", "-30%");
    }, function () {
        if (!isMobile()) {
            filterLess($(this).find(".image"), 4, 50);
        }
        $(this).find(".label").css("top", 0);
    }
);

$(".pane").click(function() {
    $(this).find(".label").css("top", "-80%");
});

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}