var timeout = -1;
var lastScroll = 1;
var diffScroll = -1;
var intervalHandle = null;
var paused;

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