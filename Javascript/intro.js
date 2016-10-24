var subtitle = "I am a student";
var intervalHandle = null;
var chars = "                         ^^^^^^^p r o g r a m m e r          ^^^^^^^^^r e s e ^^^^^r e s e a r c h e r          ^^^^^^^^^^^^a w e s o m e .";
var char_index = 0;
var center_x = -1;
var center_y = -1;

$(window).mousemove(function( event ) {
	if(center_x == -1) {
		center_x = event.pageX;
		center_y = event.pageY;
	}
	
	var diff_x = event.pageX - center_x;
	var diff_y = event.pageY - center_y;
	var current_x = parseInt($('.bg-img').css("left"));
	var current_y = parseInt($('.bg-img').css("top"));
	
	$('.bg-img').css("left", "calc(-10% + " + (diff_x/-10) + "px)");
	$('.bg-img').css("top", "calc(50% + " + (diff_y/-10) + "px)");
});

$(document).ready(function(){
	var height = window.innerHeight;
	$(".foreground").css("opacity", 1);
	$(".foreground").css("top", (parseInt($(".foreground").css("top")) - (height/25.0)) + "px");
	
  	intervalHandle = setInterval(function(){
		if(chars.charAt(char_index) == '^') {
			subtitle = subtitle.substring(0, subtitle.length - 1);
		} else if(chars.charAt(char_index) != ' ') {
			subtitle = subtitle + chars.charAt(char_index);
		}
		
		$(".subtitle").html(subtitle);
		
		if(char_index%6 == 3) {
			$(".cursor").css("opacity", "0");
		} else if(char_index%6 == 0){
			$(".cursor").css("opacity", "1.0");
		}
		char_index++;
		if(char_index == chars.length) {
			clearInterval(intervalHandle);
			$(".subtitle").html(subtitle);
			$(".cursor").css("opacity", "0");
		}
	},100);
});