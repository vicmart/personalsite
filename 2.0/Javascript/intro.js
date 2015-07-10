var subtitle = "I am a student";
var intervalHandle = null;
var chars = "                    ^^^.          ^^^^^p r o g r a m m e r          ^^^^^^^^^r e s e ^^^^^r e s e a r c h e r          ^^^^^^^^^^^^a w e s o m e .";
var char_index = 0;

$(document).ready(function(){
	
	
  	intervalHandle = setInterval(function(){
		if(chars.charAt(char_index) == '^') {
			subtitle = subtitle.substring(0, subtitle.length - 1);
		} else if(chars.charAt(char_index) != ' ') {
			subtitle = subtitle + chars.charAt(char_index);
		}
		
		$(".subtitle").html(subtitle + "_");
		
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