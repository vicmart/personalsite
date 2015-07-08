var timeout = -1;
var lastScroll = 1;
var diffScroll = -1;
var intervalHandle = null;

/**$(window).scroll(function(e) {
    clearTimeout($.data(this, 'scrollTimer'));
	e.preventDefault();
    $.data(this, 'scrollTimer', setTimeout(function() {
		var reduced_scroll = $(document).scrollTop()/($(".all-frames").height()/6);
		var target;
		if(reduced_scroll % 1 < 0.5) {
			target = parseInt(reduced_scroll) * ($(".all-frames").height()/6);
        } else {
			target = parseInt(reduced_scroll + 1) * ($(".all-frames").height()/6);
        }
		$('html, body').stop().animate({
			scrollTop: target
		    }, 1000);
		/**clearInterval(intervalHandle);
  		intervalHandle = setInterval(function(){
	  		$(document).scrollTop($(document).scrollTop() + ((target - $(document).scrollTop()) / 2.0));
	  	},10);
    }, 250));
});
/**
$(document).on( 'scroll', function(){
	/**var seconds = new Date().getTime() / 1000;
	
	
	diffScroll = $(document).scrollTop() - lastScroll;
	console.log(diffScroll);
	$(document).scrollTop(1);
	lastScroll = $(document).scrollTop();
	
	var offset = $(window).height();
	if(seconds > timeout + 1.0 && diffScroll != 0) {
		if(diffScroll < 0){
			offset = offset * -1;
		}
		//console.log(diffScroll);
		if(parseInt($(".all-frames").css('top')) - offset <= 0 && parseInt($(".all-frames").css('top')) - offset > -1 * parseInt($(".all-frames").css("height")) ) {
				$(".all-frames").css('top', (parseInt($(".all-frames").css('top')) - offset) + 'px');
		}
		timeout = seconds;
	}
});**/


$(".bot").click(function() {
	var offset = -1 * $(this).index() * $(".frame").height();
	$(".all-frames").css('top', offset + 'px');
	$(".bot").each(function(){
		$(this).children().css("top", "0px");
	});
	$(this).children().css("top", "-15px");	
});

$( document ).ready(function() {
  // Handler for .ready() called.
	
});