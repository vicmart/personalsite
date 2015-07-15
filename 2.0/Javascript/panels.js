var timeout = -1;
var lastScroll = 1;
var diffScroll = -1;
var intervalHandle = null;
var paused;
var active = 1;
var panels = ["", "My ambition to do great things has driven me to be increasingly prolific through my high school and college years. Pictured here: a recent timeline of my life.", "Visiting many destinations (pictured above) throughout my life has expanded my understanding of the world around me ", "In the past, I spent my time creating whatever idea popped up in my head, and the results are inductive of that randomness. Each bubble is a screenshot of past project I thought was significant in some way", "My motivation to contribute to advancements in healthcare has led me to undertake many more biomed-orientated projects. Pictured above: my current projects", "So what's up with the design of this site? "]
$(".bot").click(function() {
	var offset = -1 * $(this).index() * $(".frame").height();
	
	$(".all-frames").css('top', offset + 'px');
	$(".bot").each(function(){
		$(this).children().css("top", "0px");
	});
	
	$(this).children().css("top", "-15px");	
	active = $(this).children().get(0);
	if($(".circle").index(active) != 0) {
		$(active).css("top", "calc(-80% - 15px)");
		$(".info_text").text(panels[$(".circle").index(active)]);
		$(".info").css("height", "80%");
		$(".info").css("top", "-80%");
	} else {
		$(active).css("top", "-15px");
		$(".info").css("height", "0%");
		$(".info").css("top", "0%");
	}
	console.log(document.getElementById('caption').offsetHeight);
});

$(".bot").hover(function() {
	if($(".circle").index(active) != 0) {
		$(".info").css("height", "80%");
		$(".info").css("top", "-80%");
		$(active).css("top", "calc(-80% - 15px)");
	}
}, function() {
	$(".info").css("height", "0%");
	$(".info").css("top", "0%");
	$(active).css("top", "-15px");
});

$(".info").hover(function() {
	if($(".circle").index(active) != 0) {
		$(".info").css("height", "80%");
		$(".info").css("top", "-80%");
		$(active).css("top", "calc(-80% - 15px)");
	}
}, function() {
	$(".info").css("height", "0%");
	$(".info").css("top", "0%");
	$(active).css("top", "-15px");
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
		window.location.replace("Mobile/index.html");	
	}
	active = $(".circle").get(0);
	$(".info_text").text(panels[$(".circle").index(active)]);
  // Handler for .ready() called.
});