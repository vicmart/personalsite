var timeout = -1;
var lastScroll = 1;
var diffScroll = -1;
var intervalHandle = null;
var paused;
var active = 0;
var hoverIndex = 0;
var hoverActive = 0;
var max_active = 0;
var overview = 0;
var isDragging = false;
var dragOrigin = 0;
var newDrag = 0;
var currentDrag = 0;
var smallDrag = 0;
var shadow_timer = 0;
var shadow_interval = 60;
var momentum = 0;
var momentumTimer = null;
var shadowTimer = null;
var target = -1;

var index;
var wait;

$(document).scroll(function() {

});

$(document).mousedown(function(event) {
    if (overview == 1) {
        isDragging = true;
        dragOrigin = event.pageX;
        newDrag = currentDrag;
        smallDrag = false;
        momentum = 0;
        clearInterval(momentumTimer);
    }
});

$(document).mousemove(function(event) {
    /**if (isDragging == true && overview == 1) {
        var oldDrag = newDrag;
        
        newDrag = event.pageX - dragOrigin + currentDrag;        
        
        momentum = newDrag - oldDrag;
        
        var window_width = window.innerWidth;
        var offset = -1 * active * (window_width * 0.75);
        $(".all-frames").css('left', ((offset - (50 * active)) + (window_width/8) + newDrag) + "px");
    }**/
});

$(document).mouseup(function() {
    if (overview == 1) {
        if (Math.abs(currentDrag - newDrag) < 1) {
            smallDrag = true;
        }
        isDragging = false;    
        currentDrag = newDrag;
        momentumTimer = setInterval(slide, 16);
    }
});

function slide() {
    var window_width = window.innerWidth;
    var offset = (window_width * -0.14) + (-1 * active * ($(".fake-frame").eq(0).width() + 52.5));
        
    var curr = parseInt($(".all-frames").css("left"));
    var target_pos = (window_width * -0.12) + (1.05 * (target * $(".fake-frame").eq(0).outerWidth()));

    if(Math.abs(curr + target_pos) < 50) {
        hoverActive = target;
    } else if(Math.abs(curr + target_pos) < 10) {
        clearInterval(momentumTimer);
    }
    
    $(".all-frames").css('left', (curr - (curr + target_pos)/8) + "px");
}

function shadow() {
    if (parseInt($(".all-frames").css("left")) > 100) {
        var diff_min = parseInt($(".all-frames").css("left")) - 100;
        var size = parseInt(diff_min/5);
        $("body").css("box-shadow", "inset " + size + "px 0px " + size + "px -" + size + "px #000000");
    } else if (parseInt($(".all-frames").css("left")) < -0.67 * parseInt($(".all-frames").css("width"))) {
        var diff_max = parseInt($(".all-frames").css("left")) - (-0.67 * parseInt($(".all-frames").css("width")));
        var size = Math.abs(parseInt(diff_max/5));
        $("body").css("box-shadow", "inset -" + size + "px 0px " + size + "px -" + size + "px #000000");
    } else {
        $("body").css("box-shadow", "none");
    }
}

$(".menu").hover(function() {
    $(".menu-box").addClass("menu-box-small");
    $(".hr").addClass("hrhover");
}, function() {
    $(".menu-box").removeClass("menu-box-small");
    $(".hr").removeClass("hrhover");
});

$(".menu").click(function() {
    if (overview == 0) {
        zoomOut();
    } else {
        //zoomIn();
    }
});

function zoomOut() {
    $(".all-frames").addClass("all-frames-zoom");
    setTimeout(function() {
        $(".all-frames").addClass("all-frames-no-animation");
    }, 250);
    $(".fake-all-frames").addClass("fake-all-frames-zoom");
    $(".frame").addClass("frame-zoom");
    $(".fake-frame").addClass("fake-frame-zoom");
    $(".menu").addClass("menu-gone");
    overview = 1;
    currentDrag = 0;
    //shadowTimer = setInterval(shadow, 60);
    $(".frame-zoom").eq(hoverActive).addClass("frame-zoom-active");
    $(".frame-title").eq(hoverActive).addClass("frame-title-active");


    //clearInterval(document.getElementById("opening-frame").contentWindow.intervalHandler);
    
    var window_width = window.innerWidth;
    var offset = -1 * active * (window_width * 0.75);
    $(".all-frames").css('left', -0.76 * (active * $(".fake-frame").eq(0).width()) + (window_width * 0.14) + "px");
}

function zoomIn() {
    $(".all-frames").removeClass("all-frames-zoom");
    $(".all-frames").removeClass("all-frames-no-animation");
    $(".fake-all-frames").removeClass("fake-all-frames-zoom");
    $(".frame").removeClass("frame-zoom");
    $(".fake-frame").removeClass("fake-frame-zoom");
    $(".menu").removeClass("menu-gone");
    overview = 0;
    clearInterval(shadowTimer);
    
    var window_width = window.innerWidth;
    var offset = -1 * active * window_width;
    $(".all-frames").css('left', offset + 'px');
}

$(".fake-frame").click(function() {
    hoverIndex = $(".fake-frame").index($(this)); 
    //target = hoverIndex;
    
    if (hoverActive == hoverIndex) {
        clearInterval(momentumTimer);
        active = hoverIndex;
        zoomIn();
        smallDrag = false;
    } else {
        target = hoverIndex;
    }
    
    /**if (overview == 1) {
        if (index != active) {
            switchPanel(index);
        } else {
            zoomIn();
        }
    }**/
});

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function isMobile2() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

$( document ).ready(function() {
	if(isMobile.any() || isMobile2()){
		window.location.replace("m/index.html");	
	}
    
    $(".universe").height($(".universe").width() * 6);

    active = 0;    
    
  // Handler for .ready() called.
});

$( window ).resize(function() {
	var offset = -1 * index * $(".frame").width();
	$(".all-frames").css('left', offset + 'px');
});