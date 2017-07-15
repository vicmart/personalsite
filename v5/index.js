var cameraIndex;
var cameraTimer = 0;
var cam_x_orig = 0;
var cam_y_orig = 0;

var max_x = 0;
var max_y = 0;

var curr_max_x = 0;
var curr_max_y = 0;

var percent = 0;
var fast_transition = false;

var prev_x = 0;
var prev_y = 0;

var size = 200;

var elem = document.getElementById('draw-shapes');
var two = new Two({ width: window.innerWidth, height: window.innerHeight }).appendTo(elem);
var camera = two.makeGroup();
camera.translation.set(0, 0);

var events = [];
var shapes = [];
var lines = [];

$(document).ready(function() {
    addEvent(150, 100);
    addEvent(350, 1200);
    addEvent(1350, 600);
    addEvent(2350, 900);
    addEvent(4200, 50);
    addEvent(3700, 1600);
    addEvent(1200, 1600);
    addEvent(500, 2500);
    addEvents();

    setTimeout(moveCamera, cameraTimer, 0);
    for (var i = 1; i < 8; i++) {
        if (i % 3 == 0) {
            setTimeout(zoomOut, cameraTimer+=1500);
            setTimeout(zoomIn, cameraTimer+=1500, i);
        } else {
            setTimeout(moveCamera, cameraTimer+=1500, i);
        }
    }
});

function addEvent(x, y) {  
    max_x = Math.max(x + (size/2), max_x);
    max_y = Math.max(y + (size/2), max_y);
    
    var line = two.makeLine(x, y, prev_x, prev_y);
    line.stroke = "rgba(0, 0, 0, 1)";
    line.linewidth = 2;
    lines.push(line);
    camera.add(line);
    
    var shape = two.interpret($(".images svg")[0]).center();
    shape.fill = 'green';
    shape.visible = true;
    shape.noStroke();
    shape.translation.set(x, y);
    events.push(shape);
    
    var title = new Two.Text("TITLE GOES HERE", x - size/2, y + size/2 + 30);
    title.size = 45;
    title.alignment = 'left';
    var subtitle = new Two.Text("Subtitle goes here", x - size/2, y + size/2 + 60);
    subtitle.size = 25;
    subtitle.alignment = 'left';
    subtitle.fill = 'rgba(0, 0, 0, 0.5)';
    camera.add(title);
    camera.add(subtitle);
    two.update();
    
    prev_x = x;
    prev_y = y;
}

function addEvents() {
    events.forEach(function(event){
        camera.add(event);
    });

    shapes.forEach(function(shape){
        camera.add(shape);
    });

    two.update();
}

// Camera functions

function moveCamera(index) {
    cameraIndex = index;
    
    cam_x_orig = camera.translation.x;
    cam_y_orig = camera.translation.y;
    
    if (cameraIndex > 0) {
        lines[cameraIndex].translation.set(events[cameraIndex - 1].translation.x, events[cameraIndex - 1].translation.y);
    }
    
    two.bind('update', movingCamera).play();
}

function movingCamera() {
    var selected_element = events[cameraIndex];
    var selected_line = lines[cameraIndex];
    
    var x_target = (window.innerWidth/2) - selected_element.translation.x;
    var y_target = (window.innerHeight/2) - selected_element.translation.y;
    
    var curr_diff = Math.sqrt(Math.pow(camera.translation.x - x_target, 2) + Math.pow(camera.translation.y - y_target, 2));
    var orig_diff = Math.sqrt(Math.pow(cam_x_orig - x_target, 2) + Math.pow(cam_y_orig - y_target, 2));
    
    var percentage = (curr_diff/(2 * orig_diff)) + 0.5;
    
    console.log(percentage);
    
    if (cameraIndex > 0 && cameraIndex < events.length) {
        x_translation = ((events[cameraIndex - 1].translation.x * percentage) + (events[cameraIndex].translation.x * (1 - percentage)))/1;
        y_translation = ((events[cameraIndex - 1].translation.y * percentage) + (events[cameraIndex].translation.y * (1 - percentage)))/1;
        
        selected_line.translation.set(x_translation, y_translation);
        selected_line.scale = Math.max(0, 1 - (4 * curr_diff)/orig_diff);
    }
    
    var factor = 16.0;
    
    if (fast_transition) {
        factor = 8.0;
    }
    
    if(closeIn(camera, x_target, y_target, factor)) {
        two.unbind('update', movingCamera);
        fast_transition = false;
    }
}

function movingCameraHome() {
    var x_target = (window.innerWidth - (percent * max_x))/2;
    var y_target = (window.innerHeight - (percent * max_y))/2;
    
    if(closeIn(camera, x_target, y_target, 8.0)) {
        two.unbind('update', movingCameraHome);
    }
}

// Zoom functions

function zoomIn(index) {
    percent = 1;
    cameraIndex = index;
        
    fast_transition = true;

    two.unbind('update', movingCameraHome);
    two.unbind('update', movingCamera);
    two.unbind('update', zoomingOut);
    
    two.bind('update', zoomingOut).play();
    two.bind('update', movingCamera).play();
}

function zoomOut() {
    var x_per = window.innerWidth/max_x;
    var y_per = window.innerHeight/max_y;
    
    percent = Math.min(x_per, y_per) - 0.05;
    
    fast_transition = false;

    two.unbind('update', movingCameraHome);
    two.unbind('update', movingCamera);
    two.unbind('update', zoomingOut);

    two.bind('update', zoomingOut).play();
    two.bind('update', movingCameraHome).play();    
}

function zoomingOut() {
    var all_done = 0;
    
    curr_max_x = 0;
    curr_max_y = 0;

    camera.scale += (percent - camera.scale)/8.0;
    
    if (Math.abs(camera.scale - percent) < 0.005) {
        two.unbind('update', zoomingOut);
    }
}

// General math functions

function closeIn(element, x_target, y_target, factor) {
    var x_curr = element.translation.x;
    var y_curr = element.translation.y;

    element.translation.x = x_curr + ((x_target - x_curr)/factor);
    element.translation.y = y_curr + ((y_target - y_curr)/factor);
    
    if (Math.abs(x_target - x_curr) < 1 && Math.abs(y_target - y_curr) < 1) {
        return true;
    }
    return false;
}