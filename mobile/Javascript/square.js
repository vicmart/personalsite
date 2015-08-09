var window_width = window.innerWidth;
var window_height = window.innerHeight;

$(".bsox").hover(
function() {
	$(this).data("width", $(this).css("width"));
	$(this).data("height", $(this).css("height"));
	$(this).css("width", (window_width * 2.0) + "px");
	$(this).css("height", (window_height * 3.0) + "px");
	$(this).css("left", (window_width * -0.54) + "px");
	$(this).css("top", (window_height * -1.0) + "px");
	$(this).css("z-index", 1);
	console.log($(this).parent().css("left"));
},
function() {
	$(this).css("width", $(this).data("width"));
	$(this).css("height", $(this).data("height"));
	$(this).css("left", "0px");
	$(this).css("top", "0px");
	$(this).css("z-index", 0);
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