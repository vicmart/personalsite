$('img').hover(
	function(){
    	$(".ironman").css("max-width", "15%");
    	$(".hulk").css("max-width", "15%");
    	$(".avengers").css("max-width", "15%");
    	$(".captain").css("max-width", "15%");
    	$(".thor").css("max-width", "15%");
    	$("#" + $(this).parent().attr('id')).css("max-width","40%");
    	$("#" + $(this).parent().attr('id')).css("max-width","40%");
    	$("#" + $(this).parent().attr('id') + "-clock").removeClass("animated fadeOut").addClass("animated fadeIn");
		$("#" + $(this).parent().attr('id') + "-movies").removeClass("animated fadeOut").addClass("animated fadeIn");
		$("#" + $(this).parent().attr('id') + "-next").removeClass("animated fadeIn").addClass("animated fadeOut");
	} , 
	function(){
		$(".ironman").css("max-width", "20%");
		$(".hulk").css("max-width", "20%");
    	$(".avengers").css("max-width", "20%");
    	$(".captain").css("max-width", "20%");
    	$(".thor").css("max-width", "20%");
    	$("#" + $(this).parent().attr('id') + "-clock").removeClass("animated fadeIn").addClass("animated fadeOut");
		$("#" + $(this).parent().attr('id') + "-movies").removeClass("animated fadeIn").addClass("animated fadeOut");
		$("#" + $(this).parent().attr('id') + "-next").removeClass("animated fadeOut").addClass("animated fadeIn");
	}
);

$( document ).ready(function() {

});
