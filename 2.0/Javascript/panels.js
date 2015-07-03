var timeout = -1;
var lastScroll = document.body.scrollTop;

$( ".button" ).click(function() {
	var seconds = new Date().getTime() / 1000;

	if(seconds > timeout + 0.55) {
		var offset = $(window).width();
		if($(this).hasClass('reverse')) {
			offset = offset * -1;
		}

		if(parseInt($(".all-frames").css('left')) - offset <= 0 && parseInt($(".all-frames").css('left')) - offset > -1 * parseInt($(".all-frames").css("width")) ) {
			$(".all-frames").css('left', (parseInt($(".all-frames").css('left')) - offset) + 'px');
			timeout = seconds;
			
			var index = $(".dot").index( $(".active") );
			$(".dot").eq(index).removeClass("active");
	
			if($(this).hasClass('reverse')) {
				$(".dot").eq(index - 1).addClass("active");
			}else{
				$(".dot").eq(index + 1).addClass("active");
			}
		}
	}
});

$( document ).ready(function() {
  // Handler for .ready() called.
});