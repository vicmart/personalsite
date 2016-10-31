var current_size = [];
var target_size = [];
var original_size = [];
var tar_size = Math.min((window.innerHeight/2)  - 50, (window.innerWidth/2)  - 50);

var titles = ["Title: Liquid Physics", "Title: Jeometry Wars", "Title: Reflections", "Title: Floating Islands", "Title: Endless Space", "Title: Paradox Shell", "Title: Lost", "Title: Mirrors", "Title: Lonely Snowmen"];

var subtitles = ["2D Fluid Simulation - Java <a href='projects/fluiddemo.zip'>demo</a>", "Geometry Wars Clone - Java <a href='projects/jometrywars.zip'>demo</a>", "Ray Casting - Java <a href='projects/Lighting.zip'>demo</a>", "Minecraft Clone - C", "Perspective Projection - Java <a href='projects/Projection.zip'>demo</a>", "Perspective Projection - Java <a href='projects/Projection.zip'>demo</a>", "Ray Tracing - Java", "Ray Tracing - Java", "Ray Tracing - Java"];
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
		$(this).append("<p class='title'>" + titles[index] + "</p><img id='img" + index + "' src='Images/" + (index+1) + ".jpg' onmousedown='expand(this)'><p class='subtitle'>" + subtitles[index] + "</p>");
	});
	
});