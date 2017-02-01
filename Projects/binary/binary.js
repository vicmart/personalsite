String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function randomChar(mix) {
	var num = parseInt(Math.random() * 36);
    
    if (parseInt(Math.random() * 10) < mix){
        num = parseInt(Math.random() * 10);
	}
    
    if (num >= 10) {
        num += 7;
    }

    return String.fromCharCode(num + 48);
}

var redraw = function() {
    $(".land").each(function( index ) {
        if(!$(this).hasClass("location")) {
    	   var text = $(this).text();
    	
    	   for(i = 0; i < text.length; i++) {
    		  if(parseInt(Math.random() * 3) < 1) {
    		      text = text.replaceAt(i, randomChar(7));
    		  }
    	   }

    	   $(this).html(text);
        }
	});
};

setInterval(redraw, 75);

var height = $(window).height();
var width = $(window).width();
$('.world-container').css('font-size', parseInt(height)/48.0 + 'px');
$('.world').css('margin-left', $('.world').width()/-2.0);
$('.world').css('margin-top', $('.world').height()/-2.0);
/**for(i = 0; i < parseInt(height)/(parseInt(height)/49.0); i++) {
	for(j = 0; j < 30; j++) {
		$('.left-sea').append("<span class='water'>0</span>");
		$('.right-sea').append("<span class='water'>0</span>");
	}
	$('.left-sea').append('</br>');
	$('.right-sea').append('</br>');
}**/

if (width < $('.world').width()) {
    $('.world-container').css('font-size', parseInt(width)/110.0 + 'px');
    $('.world').css('margin-left', $('.world').width()/-2.0);
    $('.world').css('margin-top', $('.world').height()/-2.0);
}

$('.left-sea').css('left', (($(window).width() - $('.world').width())/2.0) - $('.left-sea').width());
$('.right-sea').css('left', ($(window).width()/2.0) + ($('.world').width()/2.0));


$( window ).resize(function() {
	var height = $(window).height();
	var width = $(window).width();
	$('.world-container').css('font-size', parseInt(height)/48.0 + 'px');
  	$('.world').css('margin-left', $('.world').width()/-2.0);
    $('.world').css('margin-top', $('.world').height()/-2.0);

	$('.left-sea').css('left', (($(window).width() - $('.world').width())/2.0) - $('.left-sea').width());
	$('.right-sea').css('left', ($(window).width()/2.0) + ($('.world').width()/2.0));

    if (width < $('.world').width()) {
        $('.world-container').css('font-size', parseInt(width)/110.0 + 'px');
        $('.world').css('margin-left', $('.world').width()/-2.0);
        $('.world').css('margin-top', $('.world').height()/-2.0);
    }
});