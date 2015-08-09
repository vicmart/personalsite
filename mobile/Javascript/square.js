var window_width = window.innerWidth;
var window_height = window.innerHeight;
var target;
var scroll = 0;

$(".container").hover(
function() {
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
	target = $(this);
},
function() {
	$(this).css("width", $(this).data("width"));
	$(this).css("height", $(this).data("height"));
	$(this).css("left", $(this).data("left"));
	$(this).css("top", $(this).data("top"));
	$(this).css("margin", $(this).data("margin"));
	$(this).css("padding", $(this).data("padding"));

	$(target).css("z-index", 0);
	target = null;
});

$(window).scroll(function(){
    scroll = $(this).scrollTop();
	$(target).css("top", scroll + "px");
});

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
});