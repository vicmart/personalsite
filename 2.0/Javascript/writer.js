var statement = "";
var intervalHandle = null;
var chars = "<div class='background'><div class='helper'><img class='bg-img' src='Images/Beach.jpg'></div></div><div class='foreground shadow'><div class='propic pro-border shadow'><div class='propic'><img class='pro-img' src='Images/Profile.jpg'></div></div><div class='content'><h1 class='title'>Victor Dadfar</h1><div class='subtitle_container'><p class='subtitle_box'>Student</p></div><p class='body'>As an avid programmer, I enjoy spending my time working on personal and group projects. I have extensive experience with leadership and management positions, and I am an active member of my community, dedicating hundreds of hours of service to various organizations. My technological skills are versatile - I work in a multitude of languages including Python, Java, C, HTML/JavaScript, and use a variety of software from Matlab to Xcode.</p><div class='subtitle_container'><a class='footer' href='mailto:gotovicmart@gmail.com'>Email</a><div class='dot'></div><a class='footer' href='https://www.linkedin.com/pub/victor-dadfar/94/287/3a1'>LinkedIn</a><div class='dot'></div><a class='footer' href='https://github.com/Vicmart1'>GitHub</a></div></div></div>";
var char_index = 0;
var center_x = -1;
var center_y = -1;
var current_element;
var current_class;
var current_src;
var current_href;
var parent_element = "";
var grabbing_text = false;
var grabbed_text = false;
var current_text = "";

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
	//$(".foreground").css("opacity", 1);
	//$(".foreground").css("top", (parseInt($(".foreground").css("top")) - (height/25.0)) + "px");
	
  	intervalHandle = setInterval(function(){
		statement = statement + chars.charAt(char_index);
		
		if(grabbing_text == true) {
			$(current_element).text($(current_element).text() + chars.charAt(char_index));
			if(chars.charAt(char_index + 1) == "<") {
				grabbing_text = false;
				grabbed_text = true;
			}
		} else if (chars.charAt(char_index) == "<") {
			switch(chars.charAt(char_index + 1)) {
				case 'd':
					current_element = document.createElement("div");
					break;
				case 'i':
					current_element = document.createElement("img");
					break;
				case 'a':
					current_element = document.createElement("a");
					break;
				case 'p':
					current_element = document.createElement("p");
					break;
				case 'h':
					current_element = document.createElement("h1");
					break;
				case '/':
					if(grabbed_text == false) {
						parent_element = parent_element.parentElement;
					}
					break;
			}
		} else if (chars.substring(char_index, char_index + 5) == "class" && grabbing_text == false) {
			var index = char_index + 7;
			while(chars.charAt(index) != "'") {
				index++;
			}
			current_element.className = current_element.className + chars.substring(char_index + 7, index);
		} else if (chars.substring(char_index, char_index + 3) == "src") {
			var index = char_index + 5;
			while(chars.charAt(index) != "'") {
				index++;
			}
			current_element.src = current_element.src + chars.substring(char_index + 5, index);
		} else if (chars.substring(char_index, char_index + 4) == "href") {
			var index = char_index + 6;
			while(chars.charAt(index) != "'") {
				index++;
			}
			current_element.href = current_element.href + chars.substring(char_index + 6, index);
		} else if (chars.charAt(char_index) == '>' && chars.charAt(char_index + 1) != '<') {
			grabbing_text = true;
			/**var index = char_index + 1;
			while(chars.charAt(index) != "<") {
				index++;
			}
			$(current_element).text($(current_element).text() + chars.substring(char_index + 1, index));**/
			if(parent_element == "") {
				$("body").append(current_element);
			} else {
				$(parent_element).append(current_element);
			}
		} else if (chars.charAt(char_index) == '>' && chars.substring(char_index - 5, char_index + 1) == "</div>") {
			
		} else if (chars.charAt(char_index) == '>' && chars.charAt(char_index + 1) == '<') {
			if(grabbed_text == false) {
				if(parent_element == "") {
					$("body").append(current_element);
				} else {
					$(parent_element).append(current_element);
				}
				
				if(!(current_element.nodeName === "IMG") && grabbing_text == false) {
					parent_element = current_element;
		    	}
			}	
			grabbed_text = false;
		}

		$(".console").text(statement);
		
		char_index++;
		if(char_index > chars.length - 2) {
			statement = statement + ">";
			$(".console").text(statement);
			clearInterval(intervalHandle);
		}
	},25);
});