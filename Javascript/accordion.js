function getRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

$('.panel').hover(
	function(){
    	$(".ironman").css("max-width", "15%");
    	$(".hulk").css("max-width", "15%");
    	$(".avengers").css("max-width", "15%");
    	$(".captain").css("max-width", "15%");
    	$(".thor").css("max-width", "15%");
    	$("#" + $(this).attr('id')).css("max-width","40%");
    	$("#" + $(this).attr('id') + "-img").css("top", "75%");
		
		if($(window).width() < 1250 || $(window).height() < 750) {
            if ($(this).attr('id') == "avengers") {
                $("#" + $(this).attr('id') + "-img").css("opacity", "0.4");
            } else {
                $("#" + $(this).attr('id') + "-img").css("opacity", "0.2");                
            }
		}
		
		$("#" + $(this).attr('id') + "-movies").css("-webkit-animation-duration", "0.25s");
		$("#" + $(this).attr('id') + "-movies").css("-moz-animation-duration", "0.25s");
		$("#" + $(this).attr('id') + "-movies").css("-o-animation-duration", "0.25s");
		$("#" + $(this).attr('id') + "-movies").css("-ms-animation-duration", "0.25s");
		$("#" + $(this).attr('id') + "-movies").css("animation-duration", "0.25s");

		$("#" + $(this).attr('id') + "-movies").css("-webkit-animation-delay", "0.4s");
		$("#" + $(this).attr('id') + "-movies").css("-moz-animation-delay", "0.4s");
		$("#" + $(this).attr('id') + "-movies").css("-o-animation-delay", "0.4s");
		$("#" + $(this).attr('id') + "-movies").css("-ms-animation-delay", "0.4s");
		$("#" + $(this).attr('id') + "-movies").css("animation-delay", "0.4s");

		$("#" + $(this).attr('id') + "-movies").removeClass("animated fadeOut").addClass("animated fadeIn");
	
		
	
		var color = [getRandom(60, 125), getRandom(60, 125), getRandom(60, 125)];
		$('.ironman').css("background", "rgb(" + (color[0] - 60) + "," + (color[1] - 60) + "," + (color[2] - 60) + ")");
		$('.hulk').css("background", "rgb(" + (color[0] - 30) + "," + (color[1] - 30) + "," + (color[2] - 30) + ")");
		$('.avengers').css("background", "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
		$('.captain').css("background", "rgb(" + (color[0] + 30) + "," + (color[1] + 30) + "," + (color[2] + 30) + ")");
		$('.thor').css("background", "rgb(" + (color[0] + 60) + "," + (color[1] + 60) + "," + (color[2] + 60) + ")");
		
	} , 
	function(){
		$(".ironman").css("max-width", "20%");
		$(".hulk").css("max-width", "20%");
    	$(".avengers").css("max-width", "20%");
    	$(".captain").css("max-width", "20%");
    	$(".thor").css("max-width", "20%");
    	$("#" + $(this).attr('id') + "-img").css("top", "50%");
		$("#" + $(this).attr('id') + "-img").css("opacity", "1.0");

		if(parseInt($("#" + $(this).attr('id')).css("max-width")) >= 35) {

			$("#" + $(this).attr('id') + "-movies").css("-webkit-animation-duration", "0.15s");
			$("#" + $(this).attr('id') + "-movies").css("-moz-animation-duration", "0.15s");
			$("#" + $(this).attr('id') + "-movies").css("-o-animation-duration", "0.15s");
			$("#" + $(this).attr('id') + "-movies").css("-ms-animation-duration", "0.15s");
			$("#" + $(this).attr('id') + "-movies").css("animation-duration", "0.15s");

			$("#" + $(this).attr('id') + "-movies").css("-webkit-animation-delay", "0s");
			$("#" + $(this).attr('id') + "-movies").css("-moz-animation-delay", "0s");
			$("#" + $(this).attr('id') + "-movies").css("-o-animation-delay", "0s");
			$("#" + $(this).attr('id') + "-movies").css("-ms-animation-delay", "0s");
			$("#" + $(this).attr('id') + "-movies").css("animation-delay", "0s");
			
			$("#" + $(this).attr('id') + "-movies").removeClass("animated fadeIn").addClass("animated fadeOut");
		} else {
			$("#" + $(this).attr('id') + "-movies").removeClass("animated fadeIn");
		}
	}
);

$( document ).ready(function() {
	var color = [getRandom(60, 125), getRandom(60, 125), getRandom(60, 125)];
	$('.ironman').css("background", "rgb(" + (color[0] - 60) + "," + (color[1] - 60) + "," + (color[2] - 60) + ")");
	$('.hulk').css("background", "rgb(" + (color[0] - 30) + "," + (color[1] - 30) + "," + (color[2] - 30) + ")");
	$('.avengers').css("background", "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")");
	$('.captain').css("background", "rgb(" + (color[0] + 30) + "," + (color[1] + 30) + "," + (color[2] + 30) + ")");
	$('.thor').css("background", "rgb(" + (color[0] + 60) + "," + (color[1] + 60) + "," + (color[2] + 60) + ")");
	
});
