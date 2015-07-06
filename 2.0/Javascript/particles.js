var current_size = [];
var target_size = [];
var original_size = [];
var tar_size = Math.min(($(window).height()/2)  - 50, ($(window).width()/2)  - 50);

var titles = ["2D Fluid Simulation", "Jeometry Wars", "Jeometry Wars", "Collision Detection Through Ray Tracing", "Minecraft Clone", "Projection Matricies Scene Viewer", "Projection Matricies Scene Viewer", "Ray Tracing Lighting", "Ray Tracing Scene Viewer", "Ray Tracing Scene Viewer"];

var subtitles = ["Java <a href='projects/fluiddemo.zip'>demo</a>", "Java <a href='projects/jometrywars.zip'>demo</a>", "Java <a href='projects/jometrywars.zip'>demo</a>", "Java <a href='projects/Lighting.zip'>demo</a>", "C", "Java <a href='projects/Projection.zip'>demo</a>", "Java <a href='projects/Projection.zip'>demo</a>", "Java <a href='projects/Projection.zip'>demo</a>", "Java", "Java"];

function expand(x){
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
		}
		if(!$(this).hasClass("large")){
			console.log("yes");
		}
		$(this).removeClass("large");
	});
}

$( document ).ready(function() {
	$("span").last().remove();
	$("canvas").first().remove();
	$("span").each(function(index){
		$(this).append("<p class='title'>" + titles[index] + "</p><img src='Images/" + (index+1) + ".png' onmousedown='expand(this)'><p class='subtitle'>" + subtitles[index] + "</p>");
	});
	
});