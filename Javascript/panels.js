var timeout = -1;
var lastScroll = 1;
var diffScroll = -1;
var intervalHandle = null;
var paused;
var active = 0;
var panels = ["", 
	"My ambition to do great things has driven me to be increasingly prolific through my high school and college years. Oh, and I really like metro <a href='https://github.com/Vicmart1/metro.css'>maps</a>.", 
	"I spend my free time creating whatever idea pops up in my head. Some ideas I consider personal accomplishments, such as this interactive piece.", 
	"Working right next to a globally-renown hospital has allowed me to undertake a wide variety of biotech projects that I could not have found elsewhere.", 
	"So what's the future look like for me? Programming, engineering and medicine will all play a large role, but what I do with that knowledge will be most important. In the meantime, thank you for reading this :)"]

var index;

function switchPanel(newIndex) {
    active = newIndex;
	var offset = -1 * newIndex * $(".frame").width();
	
	$(".all-frames").css('left', offset + 'px');
	$(".bot").each(function(){
		$(this).children().css("top", "0px");
        $(this).removeClass("bot-click");
	});
	
    $(".bot").eq(newIndex).addClass("bot-click");
	//$(this).children().css("top", "-15px");	
	if(active != 0) {
		var old_height = parseInt($(".info").css("height"));
		$(".info_text").html(panels[newIndex]);
		var new_top = old_height - parseInt($(".info").css("height"));
		$(".info").css("top",  (parseInt($(".info_text").css("height")) * -1.2) + "px");
	} else {
		//$(active).css("top", "-15px");
		$(".info").css("top", "0%");
	}
	$(".progress").css("width", ((20) * newIndex + ((newIndex + 1) * 4)) + "%");
}

$(".bot").click(function() {
	index = $(this).index();
	
    switchPanel(index);
});

$(".side-right").click(function() {
    if (active < $(".bot").length - 1) {
        switchPanel(active + 1); 
        if (active == $(".bot").length - 1) {
            $(this).css("opacity", "0");
        }
    }
});


$(".side-right").hover(function() {
    if (active < $(".bot").length - 1) {
        $(this).css("opacity", "0.9");
    }
}, function() {
    $(this).css("opacity", "0");
});


$(".side-left").click(function() {
    if (active > 0) {
        switchPanel(active - 1); 
        if (active == 0) {
            $(this).css("opacity", "0");
        }
    }
});

$(".side-left").hover(function() {
    if (active > 0) {
        $(this).css("opacity", "0.9");
    }
}, function() {
    $(this).css("opacity", "0");
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: 
            if (active != 0) {
                switchPanel(active - 1);
            }
            break;
        case 39: 
            if (active != $(".bot").length - 1) {
                switchPanel(active + 1);
            }
            break;
        default: 
            return;
    }
    e.preventDefault();
});

$(".bot").hover(function() {
	if(active != 0) {
		$(".info").css("top",  (parseInt($(".info_text").css("height")) * -1.2) + "px");
		$(active).css("top", "calc(-0% - " + (parseInt($(".info").css("height")) + 13) + "px)");
	}
}, function() {
	$(".info").css("top", "0%");
	$(active).css("top", "-15px");
	$(".filling").css("top", "0px");
});

$(".info").hover(function() {
	if($(".circle").index(active) != 0) {
		$(".info").css("top",  (parseInt($(".info_text").css("height")) * -1.2) + "px");
		$(active).css("top", "calc(-0% - " + (parseInt($(".info").css("height")) + 13) + "px)");
	}
}, function() {
	$(".info").css("top", "0%");
	$(active).css("top", "-15px");
	$(".filling").css("top", "0px");
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

    $(".info_text").text(panels[$(".circle").index(active)]);
    active = 0;
  // Handler for .ready() called.
});

$( window ).resize(function() {
	var offset = -1 * index * $(".frame").width();
	$(".all-frames").css('left', offset + 'px');
});