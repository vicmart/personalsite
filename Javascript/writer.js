var statement = "";
var intervalHandle = null;
var subtitle = "I am a student.____________________^_____^_____^_____^_____.______________________________^_____^_____^_____^_____^_____r_____e_____s_____e_____a_____r_____c_____h_____e_____r______________________________^_____^_____^_____^_____^_____^_____^_____^_____^_____p_____r_____o_____g_____r_____^_____^_____^_____^_____^_____^_____p_____r_____o_____g_____r_____a_____m_____m_____e_____r______________________________^_____^_____^_____^_____^_____^_____^_____^_____^_____^_____^_____^_____a_____w_____e_____s_____o_____m_____e_____.______________________________";
var body_text = "Hey, I'm Victor. I'm a freelance programmer with a healthcare background currently enrolled at Hopkins as a biomedical engineer who spends my free time helping others while also making video games and catching up on superhero movies when I can. That's a lot to take in, which is why I threw together this site to help you better understand my story.</br>And yes, this webpage is being written in real time (web dev is tough).";
var chars = "<div class='background'></div><div class='foreground shadow'><div class='propic pro-border shadow'><div class='propic'><img class='pro-img' src='Images/Profile.jpg'></div></div><div class='content'><h1 class='title'>Victor Dadfar</h1><div class='subtitle_container'><p class='subtitle_box'>" + subtitle + "</p></div><p class='body'>" + body_text + "</p><div class='subtitle_container'><a class='footer' href='mailto:gotovicmart@gmail.com'>Email</a><div class='dot'></div><a class='footer' href='https://www.linkedin.com/pub/victor-dadfar/94/287/3a1'>LinkedIn</a><div class='dot'></div><a class='footer' href='https://github.com/Vicmart1'>GitHub</a></div></div></div>";
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
var break_tag = false;
var indentation = "";
var no_indent = false;
var console_text = "vickyd:personalsite vickyd$ ";

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

$(window).resize(function(){
	$(".foreground").css("top", ((window.innerHeight/2) + 6) + "px");
	$("body").css("height", window.innerHeight + "px");	
	$(".console").css("top", ((window.innerHeight/2) - parseInt($(".console").css("height"))) + "px")
});

$(document).ready(function(){	
	$(".console").css("top", ((window.innerHeight/2) - parseInt($(".console").css("height"))) + "px")
  	intervalHandle = setInterval(function(){
		if(chars.charAt(char_index) == '^') {
			$(".console").html($(".console").html().substring(0, $(".console").html().length - 1));
		} else if(chars.charAt(char_index + 1) == "<") {
			if(chars.charAt(char_index + 2) != "/") {
				if(no_indent == false) {
					indentation = indentation + "-----";
				}
				no_indent = false;
			} else {
				if(chars.substring(char_index - 4, char_index - 1) != "dot") {
					indentation = indentation.substring(0, indentation.length - 5);
				}
				no_indent = true
			}
			$(".console").append(chars.charAt(char_index));
			$(".console").append("</br>");
			$(".console").append("<span>" + indentation + "<span>");
		} else if(chars.charAt(char_index) == ">" && chars.charAt(char_index + 1) != "<") {
			indentation = indentation + "-----";
			$(".console").append(chars.charAt(char_index));
			$(".console").append("</br>");
			$(".console").append("<span>" + indentation + "<span>");
			$(".background").css("height", "75%");
		} else if(chars.charAt(char_index) != '_') {
			$(".console").append(chars.charAt(char_index));
		}		
			
		if(parseInt($(".console").css("height")) + parseInt($(".console").css("top")) > window.innerHeight/2) {
			$(".console").css("top", ((window.innerHeight/2) - parseInt($(".console").css("height"))) + "px")
		}
				
		if(grabbing_text == true) {
			if(break_tag == true) {
				if(chars.charAt(char_index) == ">") {
					break_tag = false;
				}
			} else if(chars.charAt(char_index) == '^') {
				$(current_element).html($(current_element).html().substring(0, $(current_element).html().length - 1));
			} else if(chars.charAt(char_index) != '_') {
				$(current_element).append(chars.charAt(char_index));
			}
			if(chars.charAt(char_index + 1) == "<" && chars.substring(char_index + 1, char_index + 6) != "</br>") {
				grabbing_text = false;
				grabbed_text = true;
			} else if(chars.substring(char_index + 1, char_index + 6) == "</br>") {
				$(current_element).append("</br>");
				break_tag = true;
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
		
		$(".foreground").css("top", ((window.innerHeight/2) + 6) + "px");
		$("body").css("height", window.innerHeight + "px");
		
		char_index++;
		if(char_index > chars.length - 2) {
			//statement = statement + ">";
			$(".console").append(">");
			clearInterval(intervalHandle);
		}
	},20);
});