var lights = 1;

function switchLights() {
    lights *= -1;
    if (lights == -1) {
        $('body').css('background-color', 'black');
        $('.side_bar').css('color', 'white');
        $('.c_title').css('color', 'white');
        $('.c_date').css('color', '#CCC');
        $('hr').css('border-color', 'black');
    } else {
        $('body').css('background-color', 'white');
        $('.side_bar').css('color', 'black');
        $('.c_title').css('color', 'black');
        $('.c_date').css('color', '#777');
        $('hr').css('border-color', 'white');
    }
}

function windowResize() {
    windowWidth = $(window).width();
	if (windowWidth < 400) {
        $('.body').css('margin', '0%').css('width', '100%');
		$('.side_bar').width('100%');
		$('.side_bar').height('auto');
		$('.side_bar').css('position', 'relative').css('border', 'none');
		$('.main_content').width('100%');
		$('.col').width('100%').css('margin-top', '0px');
	} else if (windowWidth < 600) { 
		$('.side_bar').width('100%');
		$('.side_bar').height('auto');
		$('.side_bar').css('position', 'relative').css('border', 'none');
		$('.main_content').width('100%');
		$('.body').css('margin', '10%').css('width', '80%');
		$('.body').css('margin-top', '5%').css('margin-bottom', '5%');
		$('.col').width('100%').css('margin-top', '0px');
	} else if (windowWidth < 800) { 
		$('.side_bar').width('33%');
		$('.side_bar').height('100%');
		$('.side_bar').css('position', 'fixed').css('border-right', 'solid 1px gray');
		$('.main_content').width('66%');
		$('.body').css('margin', '0%').css('width', '100%');
		$('.col').width('calc(50% - 2px)');
        $('#col2').css('margin-top', '40px');
        $('#col3').css('margin-top', '0px');
	} else if (windowWidth < 1000) {
		$('.side_bar').width('25%');
		$('.side_bar').height('100%');
		$('.side_bar').css('position', 'fixed').css('border-right', 'solid 1px gray');
		$('.main_content').width('calc(75% - 4px)');
		$('.body').css('margin', '0%').css('width', '100%');
		$('.col').width('33%');
        $('#col2').css('margin-top', '0px');
        $('#col3').css('margin-top', '40px');
	} else {
		$('.side_bar').width('25%');
		$('.side_bar').height('auto');
		$('.side_bar').css('position', 'relative').css('border-right', 'solid 1px gray');
		$('.main_content').width('calc(75% - 4px)');
		$('.body').css('margin', '10%').css('width', '80%');
		$('.body').css('margin-top', '5%').css('margin-bottom', '5%');
		$('.col').width('33%');
        $('.col').css('margin-top', '0px');
	}
}

$(window).resize(function() {
    windowResize()
});

$(document).ready(function() {
    windowResize();
	var text = "Lorem ipsum dolor sit amet, consec tetur adipis cing elit, sed do eiusmod tempor incid idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerci tation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehen derit in volup tate velit esse cillum dolore eu fugiat nulla pariatur. Except eur sint occaecat cupid atat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

	var div, title, loc, date, ctext, line;
	for (var i = 0; i < 10; i++) {
 		$(".col").each(function(index) {
            div = $("<div class='content'></div>"); 
	   		title = "<p class='c_title'>TITLE</p>";
   			loc = "<p class='c_loc'>Baltimore, MD</p>";
   			date = "<p class='c_date'></p>";
	   		date.innerHTML = parseInt(Math.random() * 31) + "March 2016";
	   		ctext = "<p class='c_text'></p>";
	   		ctext.innerHTML = text.substring(0, 175 + (Math.random() * 250));
	   		line = "<hr noshade>";
	   		$(div).append(title, line, loc, date, ctext);
		   	$(this).append(div);
	   	});
	}

    $(".c_text").each(function(index) {
	    $(this).html(text.substring(0, 175 + (Math.random() * 250)));
   	});
   	$(".c_date").each(function(index) {
   		$(this).html(parseInt(Math.random() * 31) + " March 2016");
   	});

   	$(".bio").html(text);
});