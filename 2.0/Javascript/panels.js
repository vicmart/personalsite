var timeout = -1;
var lastScroll = 1;
var diffScroll = -1;
var intervalHandle = null;
var paused;
var active = 1;
var panels = ["", "Panel number two", "I've been to many places and seen many things and that has inspired me to do good.", "Panel number four", "Panel number five", "Panel number six"]
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

$( document ).ready(function() {
	active = $(".circle").get(0);
	$(".info_text").text(panels[$(".circle").index(active)]);
  // Handler for .ready() called.
});