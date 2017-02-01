var current_size = [];
var target_size = [];
var original_size = [];
var tar_size = Math.min((window.innerHeight/2)  - 50, (window.innerWidth/2)  - 50);

var titles = ["Liquid Physics", "Jeometry Wars", "Reflections", "Floating Islands", "Endless Space", "Paradox Shell", "Lost", "Mirrors", "Lonely Snowmen"];

var subtitles = ["2D Fluid Simulation", "Geometry Wars Clone", "Ray Casting", "Minecraft Clone", "Perspective Projection", "Perspective Projection", "Ray Tracing", "Ray Tracing", "Ray Tracing"];
var paused;

function expand(x) {
	tar_size = Math.min((window.innerHeight/2)  - 50, (window.innerWidth/2)  - 50);
	var idx = parseInt(($(x).parent().attr("id")).slice(-1));
	if(Math.abs(current_size[idx]*4 - original_size[idx]) > Math.abs(current_size[idx]*4 - target_size[idx])) {
		target_size[idx] = original_size[idx];
		$(x).removeClass("large");
	}else{
		target_size[idx] = tar_size;
		$(x).addClass("large");
	}
		
	$(".bubble").each(function(index){
		if(idx != index) {
			target_size[index] = original_size[index];
			$("#img" + index).removeClass("large");
		}
	});
}

$( document ).ready(function() {
	$(".bubble").last().remove();
	$(".bubble").last().remove();
	$("canvas").first().remove();
	
	$(".bubble").each(function(index){
		//$(this).css("-moz-border-radius", "50%");
		//$(this).css("-webkit-border-radius",  "50%");
		//$(this).css("border-radius", "50%");
		$(this).append("<p class='title'>" + titles[index] + "<span class='subtitle'>  " + subtitles[index] + "</span></p><img id='img" + index + "' src='Images/" + (index+1) + ".jpg' onmousedown='expand(this)'>");
	});
	
});