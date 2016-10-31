var timeout = -1;
var lastScroll = 1;
var diffScroll = -1;
var intervalHandle = null;
var paused;
var active = 0;
var max_active = 0;
var panels = ["<h1></h1>", 
	"<h1>My Background</h1> My ambition to do great things has driven me to be increasingly efficient through my high school and college years. Oh, and I really like metro <a href='https://github.com/Vicmart1/metro.css'>maps</a>.", 
	"<h1>My Projects</h1> I spend my free time creating whatever idea pops up in my head. Some ideas I consider personal accomplishments, such as this interactive piece.", 
	"<h1>My Research</h1> Working near a globally-renown hospital has allowed me to undertake a wide variety of biotech projects that I could not have found elsewhere.", 
	"<h1>My Interests</h1> Of course, I have some downtime too."]

var index;
var wait 
$(".info").css("top", "-45px");
$(".info_text").html(panels[active]);
$("h1").css("margin-top", "-5px");

function switchPanel(newIndex) {
    active = newIndex;
    if (active > max_active) {
        max_active = active;
    }
	var offset = -1 * newIndex * $(".frame").width();
	   
    if (active == 4) {
        document.getElementById('interests').contentWindow.location.reload();
    }
	$(".all-frames").css('left', offset + 'px');
	$(".bot").each(function(){
		$(this).children().css("top", "0px");
        $(this).removeClass("bot-click");
	});
	$(".arrows").removeClass("arrows-move");
    $(".bot").eq(newIndex).addClass("bot-click");
	//$(this).children().css("top", "-15px");	
    $(".info_text").html(panels[newIndex]);
	if(active != 0) {
		var old_height = parseInt($(".info").css("height"));		
		var new_top = old_height - parseInt($(".info").css("height"));
		$(".info").css("top",  "-90px");
        $("h1").css("margin-top", "0px");
        clearTimeout(wait);
        wait = setTimeout(function() {
            if (active == max_active && active < 4) {
                $(".arrows").addClass("arrows-move");
            }
            $(".info").css("top", "-45px");
            $("h1").css("margin-top", "-5px");
        }, 2500);
	} else {
		//$(active).css("top", "-15px");
		$(".info").css("top", "-45px");
        $("h1").css("margin-top", "-5px");
	}
	$(".progress").css("width", ((25) * newIndex) + "%");
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

/**$(".bot").hover(function() {
	if(active != 0) {
		$(".info").css("top",  (parseInt($(".info_text").css("height")) * -1.2) + "px");
		$(active).css("top", "-100px");
	}
}, function() {
	$(".info").css("top", "-50px");
	$(active).css("top", "-15px");
	$(".filling").css("top", "0px");
});**/

$(".info").hover(function() {
	if($(".circle").index(active) != 0 && active != 0) {
		$(".info").css("top",  "-90px");
        $("h1").css("margin-top", "0px");
        //$(".arrows").removeClass("arrows-move");
	}
}, function() {
	$(".info").css("top", "-45px");
    $("h1").css("margin-top", "-5px");
    /**if (active == max_active && active < 4) {
        $(".arrows").addClass("arrows-move");
    }**/
});

$(".info").click(function() {
    if($(".arrows").hasClass("arrows-move")) {
        switchPanel(active + 1); 
        $(".side-right").css("opacity", "0");
    }
})

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
    
    setTimeout(function() {
        if (active == 0) {
            $(".arrows").addClass("arrows-move");
            $(".side-right").css("opacity", "0.9");
        }
    }, 25000);
  // Handler for .ready() called.
});

$( window ).resize(function() {
	var offset = -1 * index * $(".frame").width();
	$(".all-frames").css('left', offset + 'px');
});