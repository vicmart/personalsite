var timeout = -1;
var lastScroll = 1;
var diffScroll = -1;
var intervalHandle = null;
var paused;
var active = 1;
var panels = ["", 
	"My ambition to do great things has driven me to be increasingly prolific through my high school and college years. Oh, and I really like metro maps.", 
	"I have two goals for the future: Visit everywhere, and create something that will be used globally. I'm still working on both.", 
	"I spend my free time creating whatever idea pops up in my head. Some ideas I consider personal accomplishments, such as this interactive piece. -- powered by the Coffee Physics Library", 
	"Going to a very medicine-oriented school has allowed me to undertake a wide variety of biotech projects that I could not have found elsewhere.", 
	"So what's the future look like for Victor Dadfar? Programming, engineering and medicine will all certainly play a large role, but what I do with that knowledge will be most important. In the meantime, thank you for reading this :)"]

var index;
$(".bot").click(function() {
	index = $(this).index();
	var offset = -1 * index * $(".frame").width();
	
	$(".all-frames").css('left', offset + 'px');
	$(".bot").each(function(){
		$(this).children().css("top", "0px");
	});
	
	$(this).children().css("top", "-15px");	
	active = $(this).children().get(0);
	if(index != 0) {
		var old_height = parseInt($(".info").css("height"));
		$(".info_text").text(panels[index]);
		//$(active).css("top", "calc(-0% - " + (parseInt($(".info").css("height")) + 13) + "px)");
		var new_top = old_height - parseInt($(".info").css("height"));
		$(".filling").css("top", "calc(-0% - " + new_top + "px)");
		$(".info").css("top", "calc(-100% - " + (parseInt($(".info").css("height")) - 2) + "px)");
	} else {
		//$(active).css("top", "-15px");
		$(".info").css("top", "-100%");
	}
	$(".progress").css("width", ((16.7) * index + ((index + 1) * 2.8)) + "%");
});

$(".bot").hover(function() {
	if($(".circle").index(active) != 0) {
		$(".info").css("top", "calc(-100% - " + (parseInt($(".info").css("height")) - 2) + "px)");
		$(active).css("top", "calc(-0% - " + (parseInt($(".info").css("height")) + 13) + "px)");
	}
}, function() {
	$(".info").css("top", "-100%");
	$(active).css("top", "-15px");
	$(".filling").css("top", "0px");
});

$(".info").hover(function() {
	if($(".circle").index(active) != 0) {
		$(".info").css("top", "calc(-100% - " + (parseInt($(".info").css("height")) - 2) + "px)");
		$(active).css("top", "calc(-0% - " + (parseInt($(".info").css("height")) + 13) + "px)");
	}
}, function() {
	$(".info").css("top", "-100%");
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

$( document ).ready(function() {
	if(isMobile.any()){
		window.location.replace("m/index.html");	
	}
	active = $(".circle").get(0);
	$(".info_text").text(panels[$(".circle").index(active)]);
  // Handler for .ready() called.
});

$( window ).resize(function() {
	var offset = -1 * index * $(".frame").width();
	$(".all-frames").css('left', offset + 'px');
});