var timeout = -1;
var lastScroll = -1;
var diffScroll = -1;

function iframeLoaded(iframe) {
	/**$(".frame").each(function(){
		$(this).css("height", parseInt($(this).css("height")) + "px");	
	});	
	$(".metro-page").css("height", iframe.contentWindow.document.body.scrollHeight + "px");
	$(".all-frames").css("height", (((5.0*parseInt($(".all-frames").css("height")))/6) + iframe.contentWindow.document.body.scrollHeight) + "px");	**/
}

$(document).on( 'scroll', function(){
	var seconds = new Date().getTime() / 1000;
	
	diffScroll = $(document).scrollTop() - lastScroll;
	var offset = $(window).height();
	if(seconds > timeout + 1.10) {
		if($(document).scrollTop() < 0){
			offset = offset * -1;
		}
		if(parseInt($(".all-frames").css('top')) - offset <= 0 && parseInt($(".all-frames").css('top')) - offset > -1 * parseInt($(".all-frames").css("height")) ) {
				$(".all-frames").css('top', (parseInt($(".all-frames").css('top')) - offset) + 'px');
		}
		timeout = seconds;
	}
	//console.log($(document).scrollTop());
});


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