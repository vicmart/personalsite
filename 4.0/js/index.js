/*jslint latedef:false*/
var regTime = 250;
var currentTab = 0;

$(document).ready(function() {
    $(window).resize();
    
    if (isMobile() && !isLandscape()) {
        $(".big-title").css("top", "calc(40vh - 50px)");
        $(".underline").css("top", "calc(40vh - 50px)");  
    }
    
    $(".underline").addClass("underline-slower");
    $(".tab-underline").data("click", 0);
    $(".tab-underline").eq(0).css("width", "20%");
    $(".tab-underline").eq(0).css("margin", "0px 0%"); 
    $(".tab-underline").eq(0).data("click", 1);
    $(".dropdown").addClass("no-dropdown");
    $(".description").text($(".small-title").eq(0).text());
    
    bringUpTitle(currentTab, regTime);
    
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
    
    if (true) {
        animateCircles();
    } else {
        $(".background").remove();
    }
    
    for (var t = 1; t < $(".tab-content").length; t++) {
        $(".tab-content").eq(t).css("opacity", 0);
        $(".tab-content").eq(t).addClass("tab-content-gone");
    }
});

function bringUpTitle(index, time) {
    $(".letter").eq(index).css("opacity", 1);
    
    if (index == 6) {
        $(".underline").css("width", "40%");
    } else if (index == 11) {
        $(".subtitle").css("opacity", 1);
        $(".subtitle").css("top","calc(50vh - 50px)");
        $(".subtitle").css("font-size", 30);
        
        if (isMobile() && !isLandscape()) {
            $(".subtitle").css("font-size", 50);
            $(".subtitle").css("top","calc(40vh - 50px)");
        }
    }
    
    if (index + 1 < $(".letter").length) {
        setTimeout(function() {
            if (index < 1 && $(window).scrollTop() != 0) {
                $(".letter").each(function() {
                    $(this).css("opacity", 1);
                });
                finishTitle(time, 1);
            } else {
                bringUpTitle(index + 1, time);
            }
        }, time);
    } else {
        $(".underline").removeClass("underline-slower");
        $(".underline").addClass("underline-faster");

        setTimeout(function() {
            finishTitle(time, 0);
        }, time * 7);
    }
}

function finishTitle(time, fast) {
    $(".big-title").css("top", 0);
    $(".underline").css("top", 0);
    $(".underline").css("width", "10%");
    $(".subtitle").css("opacity", 0);
    $(".subtitle").css("top", 0);

    setTimeout(function() {
        $(".subtitle").remove();
        bringUpBase(0, 0, time);

        $(".fake-header").css("height", parseInt($(".header").css("height")));
        $(".header").addClass("header-shadow");
        $(".tabs").css("opacity", 1);
        $(".description").css("opacity", 1);
        
        $(".hamburger").css("width", $(".hamburger").css("height"));
    }, time * 2);
    
    
    var newTime = time;
    
    if (fast == 0) {
        newTime = 0;
    } 
    
    setTimeout(function() {
        if (!(isMobile() && !isLandscape())) {
            $(".big-title").css("font-size", parseInt($(".big-title").css("font-size"))/2 + "px");
        } else {
            $(".big-title").css("font-size", parseInt($(".big-title").css("font-size")) * 0.4 + "px");        
        }
    }, newTime);
}

function bringUpBase(tab, index, time) {
    $(".tab-content").eq(tab).find(".base").eq(index).css("opacity", 1);
    $(".tab-content").eq(tab).find(".base").eq(index).css("top", 0);
    
    if (index + 1 < $(".tab-content").eq(tab).find(".base").length) {
        setTimeout(function() {
            bringUpBase(tab, index + 1, time);
        }, time);
    } else {
        setTimeout( function() {
            $(".tab-content").eq(tab).find(".fake-footer").css("height", 0);
        }, time * 2);
    }
}

function bringUpBaseInstantly(tab) {
    $(".tab-content").eq(tab).find(".base").each(function() {
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
    
    $("h1").removeClass("h1-normal");
    
    $(".tabs").removeClass("tabs-center");
    $(".tabs").removeClass("no-tabs");

    $(".hamburger").removeClass("no-div");
    $(".tabs").removeClass("no-div");
    $(".droptab").removeClass("droptab-large");
    $(".droptab").removeClass("droptab-medium");
    $(".description").removeClass("no-div");
    $(".description").removeClass("description-small");               

    $(".small-title").removeClass("no-div");

    $(".ribbon").removeClass("ribbon-mobile");
    if (isMobile() && !isLandscape()) {
        $(".pane").addClass("pane-1-fit"); 
        
        $(".icon").addClass("icon-centered-70");
        $(".no-center").removeClass("icon-centered-70");
        $(".no-center").addClass("flag-center-v");
        
        $(".label").addClass("label-portrait");
        
        $(".image").addClass("image-dyn-m");
        
        $(".tabs").addClass("no-tabs");
        $(".droptab").addClass("droptab-large");
            
        $(".small-title").addClass("no-div");
            
        $(".ribbon").addClass("ribbon-mobile");
    } else if ((isMobile() && isLandscape()) || $(window).width() < 780) {
        $(".pane").addClass("pane-2-fit");
        $(".icon").addClass("icon-centered");
        $(".no-center").removeClass("icon-centered");

        if (isMobile() && isLandscape()) {
            $(".label").addClass("label-landscape");
            
            $(".tabs").addClass("no-tabs");
            $(".droptab").addClass("droptab-medium");
            $(".small-title").addClass("no-div");
            $(".small-title").addClass("small-title-small");
                    
            $(".description").addClass("description-small");               
        } else {
            $(".label").addClass("label-dyn");
            
            $(".hamburger").addClass("no-div");
            $(".description").addClass("no-div");
        }
        
        $(".image").addClass("image-dyn");
        
        $("h1").addClass("h1-normal");

    } else {
        $(".pane").addClass("pane-n-fit");
        $(".icon").addClass("icon-centered");
        $(".no-center").removeClass("icon-centered");
        
        $(".tabs").addClass("tabs-center");
        $(".label").addClass("label-sta");

        $("h1").addClass("h1-normal");
        $(".image").addClass("image-sta");
        $(".hamburger").addClass("no-div");
        $(".description").addClass("no-div");    
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
    
    $(".dropdown").css("height", 0);
    $(".hamburger").css('background-color', '#FFF');
    $(".patty").css('background-color', '#888');
});

$(".tab").hover(function() {
    var index = $(".tab").index($(this));

    if ($(".tab-underline").eq(index).data("click") == 0) {
        $(".tab-underline").eq(index).css("width", "5%");
        $(".tab-underline").eq(index).css("margin", "0px 7.5%"); 

        $(".tab-underline").eq(currentTab).css("width", "15%");
        $(".tab-underline").eq(currentTab).css("margin", "0px 2.5%"); 
    }
}, function() {
    var index = $(".tab").index($(this));

    if ($(".tab-underline").eq(index).data("click") == 0) {
        for (var i = 0; i < 5; i++) {
            $(".tab-underline").eq(i).css("width", "0%");
            $(".tab-underline").eq(i).css("margin", "0px 10%");  
        }
        
        $(".tab-underline").eq(currentTab).css("width", "20%");
        $(".tab-underline").eq(currentTab).css("margin", "0px 0%"); 
    }
});

$(".hamburger").click(function() {
    if (parseInt($(".dropdown").css("height")) == 0) {
        var tabheight = parseInt($(".droptab").outerHeight());
        var length = $(".droptab").length;
        $(".dropdown").css("height", tabheight * length);
        $(".patty").css('background-color', '#FFF');
    } else {
        $(".dropdown").css("height", 0);
        $(".patty").css('background-color', '#888');
    }
});

$(".tab").click(function() {
    var index = $(".tab").index($(this));
    var size = parseInt($(this).css("font-size"));
    
    switchTab(index);
});

$(".droptab").click(function() {
    var index = $(".droptab").index($(this));
    switchTab(index);
    
    $(".dropdown").css("height", 0);
    $(".hamburger").css('background-color', '#FFF');
    $(".patty").css('background-color', '#888');
    
    $(".description").text($(".small-title").eq(index).text());
});

function switchTab(newIndex) {
    if (newIndex == currentTab) {
        return;
    }
    
    $(".tab-content").eq(currentTab).css("opacity", 0);
    
    $(".tab-underline").eq(currentTab).css("width", "0%");
    $(".tab-underline").eq(currentTab).css("margin", "0px 10%"); 
    $(".tab-underline").eq(currentTab).data("click", 0);
    
    $(".tab-underline").eq(newIndex).css("width", "20%");
    $(".tab-underline").eq(newIndex).css("margin", "0px 0%"); 
    $(".tab-underline").eq(newIndex).data("click", 1);
    
    setTimeout(function() {
        $(".tab-content").eq(currentTab).addClass("tab-content-gone");
        $(".tab-content").eq(currentTab).find(".base").css("top", 100);
        $(".tab-content").eq(currentTab).find(".base").css("opacity", 0);

        $(".tab-content").eq(newIndex).css("opacity", 1);
        $(".tab-content").eq(newIndex).removeClass("tab-content-gone");
        $(".tab-content").eq(newIndex).find(".fake-footer").css("height", 100);
        bringUpBase(newIndex, 0, regTime/2);
        currentTab = newIndex;
    }, 250);
}

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: 
            if (currentTab != 0) {
                switchTab(currentTab - 1);
            }
        break;

        case 39: 
            if (currentTab != $(".tab").length - 1) {
                switchTab(currentTab + 1);
            }
        break;

        default: return;
    }
    e.preventDefault();
});

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isLandscape() {
    return window.innerWidth > window.innerHeight;
}