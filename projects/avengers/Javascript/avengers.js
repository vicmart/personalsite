$('.movies').hover(
	function(){
    	$(".ironman").css("max-width", "15%");
    	$(".hulk").css("max-width", "15%");
    	$(".avengers").css("max-width", "15%");
    	$(".captain").css("max-width", "15%");
    	$(".thor").css("max-width", "15%");
    	$("#" + $(this).parent().attr('id')).css("max-width","40%");
    	$("#" + $(this).parent().attr('id') + "-clock").removeClass("animated fadeOut").addClass("animated fadeIn");
		$("#" + $(this).parent().attr('id') + "-movies").removeClass("animated fadeOut").addClass("animated fadeIn");
		$("#" + $(this).parent().attr('id') + "-next").removeClass("animated fadeOut").addClass("animated fadeIn");
	} , 
	function(){
		$(".ironman").css("max-width", "20%");
		$(".hulk").css("max-width", "20%");
    	$(".avengers").css("max-width", "20%");
    	$(".captain").css("max-width", "20%");
    	$(".thor").css("max-width", "20%");
    	$("#" + $(this).parent().attr('id') + "-clock").removeClass("animated fadeIn").addClass("animated fadeOut");
		$("#" + $(this).parent().attr('id') + "-movies").removeClass("animated fadeIn").addClass("animated fadeOut");
		$("#" + $(this).parent().attr('id') + "-next").removeClass("animated fadeIn").addClass("animated fadeOut");
	}
);

$( document ).ready(function() {
	$("#ironman-clock").countdown("2016/05/06", function(event) {
		$(this).text(
			event.strftime('%w weeks %-d days %-H:%M:%S')
		);
	});

	$("#hulk-clock").countdown("2018/05/04", function(event) {
		$(this).text(
			event.strftime('%w weeks %-d days %-H:%M:%S')
		);
	});

	$("#avengers-clock").countdown("2018/05/04", function(event) {
		$(this).text(
			event.strftime('%-w weeks %-d days %-H:%M:%S')
		);
	});
	
	$("#captain-clock").countdown("2016/05/06", function(event) {
		$(this).text(
			event.strftime('%w weeks %-d days %-H:%M:%S')
		);
	});
	
	$("#thor-clock").countdown("2017/11/03", function(event) {
		$(this).text(
			event.strftime('%w weeks %-d days %-H:%M:%S')
		);
	});
	
	var audio = document.getElementById("bg-music");
	audio.controls = false;
	audio.autoplay = true;
	audio.loop = true;
});
