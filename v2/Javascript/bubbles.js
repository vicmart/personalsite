var current_size = [];
var target_size = [];
var original_size = [];
var tar_size = Math.min((window.innerHeight/2)  - 50, (window.innerWidth/2)  - 50);

var titles = ["Liquid Physics", "Jeometry Wars", "Jeometry Wars", "Reflections", "Floating Islands", "Endless Space", "Paradox Shell", "Lost", "Mirrors", "Lonely Snowmen"];

var subtitles = ["2D Fluid Simulation - Java <a href='projects/fluiddemo.zip'>demo</a>", "Geometry Wars Clone - Java <a href='projects/jometrywars.zip'>demo</a>", "Geometry Wars Clone - Java <a href='projects/jometrywars.zip'>demo</a>", "Ray-Based Lighting - Java <a href='projects/Lighting.zip'>demo</a>", "Minecraft Clone - C", "Matrix-Based Render - Java <a href='projects/Projection.zip'>demo</a>", "Matrix-Based Render - Java <a href='projects/Projection.zip'>demo</a>", "Ray-Based Psuedo 3D Render - Java", "Ray Trace-Based Render - Java", "Ray Trace-Based Render - Java"];
var paused;

function expand(x){
	tar_size = Math.min((window.innerHeight/2)  - 50, (window.innerWidth/2)  - 50);
	var idx = parseInt(($(x).parent().attr("id")).slice(-1));
	if(Math.abs(current_size[idx] - original_size[idx]) > Math.abs(current_size[idx] - target_size[idx])) {
		target_size[idx] = original_size[idx];
		$(x).removeClass("large");
	}else{
		target_size[idx] = tar_size;
		$(x).addClass("large");
	}
		
	$("span").each(function(index){
		if(idx != index) {
			target_size[index] = original_size[index];
			$("#img" + index).removeClass("large");
		}
	});
}

$( document ).ready(function() {
	$("span").last().remove();
	$("canvas").first().remove();
	
	$("span").each(function(index){
		//$(this).css("-moz-border-radius", "50%");
		//$(this).css("-webkit-border-radius",  "50%");
		//$(this).css("border-radius", "50%");
		if(window.innerWidth < 550 || window.innerHeight < 550) {
			$(this).append("<p class='title' style='top: calc(24% - 55px);'>" + titles[index] + "</p><img id='img" + index + "' src='Images/" + (index+1) + ".png' onmousedown='expand(this)'>");
		} else {
			$(this).append("<p class='title'>" + titles[index] + "</p><img id='img" + index + "' src='Images/" + (index+1) + ".png' onmousedown='expand(this)'><p class='subtitle'>" + subtitles[index] + "</p>");
		}
	});
	
});