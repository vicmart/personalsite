

$('img').hover(
	function(){
    	$(".ironman").css("max-width", "15%");
    	$(".hulk").css("max-width", "15%");
    	$(".avengers").css("max-width", "15%");
    	$(".captain").css("max-width", "15%");
    	$(".thor").css("max-width", "15%");
    	$("#" + $(this).parent().attr('id')).css("max-width","40%");
	} , 
	function(){
		$(".ironman").css("max-width", "20%");
		$(".hulk").css("max-width", "20%");
    	$(".avengers").css("max-width", "20%");
    	$(".captain").css("max-width", "20%");
    	$(".thor").css("max-width", "20%");
	}
);

var clock = $('.clock').FlipClock({
		clockFace: 'DailyCounter',
		countdown: true,
		
});

$( document ).ready(function() {
	var t1 = new Date(2016, 04, 06, 0, 0, 0, 0);
	var t2 = new Date();
	var dif = t1.getTime() - t2.getTime();

	var Seconds_from_T1_to_T2 = dif / 1000;
	var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

	clock.setTime(Seconds_Between_Dates);
	clock.start();
    console.log( "ready!" );
});