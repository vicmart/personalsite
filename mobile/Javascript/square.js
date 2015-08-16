var window_width = window.innerWidth;
var window_height = window.innerHeight;
var target;
var scroll = 0;
var active = false;

$(".container").mousedown(
function() {
	if(!active) {
		scroll = $(window).scrollTop();
	
		$(this).data("width", $(this).css("width"));
		$(this).data("height", $(this).css("height"));
		$(this).data("left", $(this).css("left"));
		$(this).data("top", $(this).css("top"));
		$(this).data("margin", $(this).css("margin"));
		$(this).data("padding", $(this).css("padding"));
		$(this).css("width", "calc(100%)");
		$(this).css("height", "100vh");
		$(this).css("left", "0px");
		$(this).css("top", $(window).scrollTop() + "px");
		$(this).css("margin", "0px");
		$(this).css("padding", "0px");
		$(this).css("z-index", 1);
		$(this).css("transition-duration", "0.25s");
		$($(this).children().find("div")[3]).css("opacity", 1);
		$($(this).children().children().find("div")[0]).css("opacity", 0);
		$($(this).children()[0]).css("overflow", "scroll");
		target = $(this);
	
		$(".exit").css("transition-delay", "0.25s");
		$(".exit").css("opacity", 1);
		$(".exit").css("width", "20%");
		$(".exit").css("padding-bottom", "20%");

		$("body").addClass("lock-position");
		$("body").css("top", (-1 * scroll) + "px");
		
		active = true;
	}
});

$(".exit").mousedown(
function() {
	$(target).css("width", $(target).data("width"));
	$(target).css("height", $(target).data("height"));
	$(target).css("left", $(target).data("left"));
	$(target).css("top", $(target).data("top"));
	$(target).css("margin", $(target).data("margin"));
	$(target).css("padding", $(target).data("padding"));
	$(target).css("z-index", 0);
	$($(target).children().find("div")[3]).css("opacity", 0);
	$($(target).children().children().find("div")[0]).css("opacity", 1);
	$($(target).children()[0]).scrollTop(0);
	$($(target).children()[0]).css("overflow", "hidden");
	target = null;
	
	$(".exit").css("opacity", 0);
	$(".exit").css("width", "0px");
	$(".exit").css("padding-bottom", "0px");
	$(".exit").css("transition-delay", "0s");
	
	$("body").removeClass("lock-position");
	$(window).scrollTop(scroll);
	active = false;
});

/**$(window).scroll(function(){
    scroll = $(this).scrollTop();
	$(target).css("top", scroll + "px");
});**/

$( document ).ready(function() {
	var i = 0;
	$(".container").each(function(index) {
		$(this).css("left", (50 * (i%2)) + "%");
		$(this).css("top", ((window_width * 0.02) + (window_width * 0.48) * parseInt(i/2)) + "px");
		
		if(i % 2 == 0) {
			$(this).css("margin-left", "4%");
		}
		
		if(i % 2 == 1) {
			$(this).css("margin-right", "4%");
		}
		
		if(i == 2 || i == 7) {
			i++;
		} 
		
		i++;
	});
	
	i++;

	$(".footer-filler").css("top", ((window_width * 0.02) + (window_width * 0.48) * parseInt(i/2)) + "px");
	
	$("iframe").css("height", window_width);
	$("iframe").css("width", window_height);
	
});