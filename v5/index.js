var cameraInterval;
var zoomInterval;
var cameraIndex;
var cameraTimer = 0;

var max_x = 0;
var max_y = 0;

var curr_max_x = 0;
var curr_max_y = 0;

var percent = 0;

var prev_x = 0;
var prev_y = 0;

var size = 200;

var elem = document.getElementById('draw-shapes');
var two = new Two({ width: window.innerWidth, height: window.innerHeight }).appendTo(elem);
var camera = two.makeGroup();
camera.translation.set(0, 0);

var events = [];

$(document).ready(function() {
    addEvent(150, 100);
    addEvent(350, 1200);
    addEvent(1350, 600);
    addEvent(2350, 900);
    addEvent(4200, 50);
    addEvent(3700, 1600);
    addEvent(1200, 1600);
    addEvent(500, 2500);


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
    
    var event = two.makeRectangle(x, y, size, size);
    event.fill = 'rgba(0, 200, 255, 0.75)';
    
    events.push(event);
    
    camera.add(event);

    var line = two.makeLine(x, y, prev_x, prev_y);
    camera.add(line);
    two.update();
        
    prev_x = x;
    prev_y = y;
}

// Camera functions

function moveCamera(index) {
    cameraIndex = index;
    clearInterval(cameraInterval);
    cameraInterval = setInterval(movingCamera, 16, false);
}

function movingCamera(strong_pull) {
    var selected_element = events[cameraIndex];
    var x_target = (window.innerWidth/2) - selected_element.translation.x;
    var y_target = (window.innerHeight/2) - selected_element.translation.y;
    
    var factor = 16.0;
    
    if (strong_pull) {
        factor = 8.0;
    }
    
    if(closeIn(camera, x_target, y_target, factor)) {
        clearInterval(cameraInterval);
    }
}

function movingCameraHome() {
    var x_target = (window.innerWidth - (percent * max_x))/2;
    var y_target = (window.innerHeight - (percent * max_y))/2;
    
    if(closeIn(camera, x_target, y_target, 8.0)) {
        clearInterval(cameraInterval);
    }
}

// Zoom functions

function zoomIn(index) {
    percent = 1;
    cameraIndex = index;
    
    clearInterval(zoomInterval);
    clearInterval(cameraInterval);
    zoomInterval = setInterval(zoomingOut, 16);
    cameraInterval = setInterval(movingCamera, 16, true);
}

function zoomOut() {
    var x_per = window.innerWidth/max_x;
    var y_per = window.innerHeight/max_y;
    
    percent = Math.min(x_per, y_per) - 0.05;
    
    clearInterval(zoomInterval);
    clearInterval(cameraInterval);
    zoomInterval = setInterval(zoomingOut, 16);
    cameraInterval = setInterval(movingCameraHome, 16);
}

function zoomingOut() {
    var all_done = 0;
    
    curr_max_x = 0;
    curr_max_y = 0;

    camera.scale += (percent - camera.scale)/8.0;
    
    two.update();
    
    if (Math.abs(camera.scale - percent) < 0.005) {
        clearInterval(zoomInterval);
    }
}

// General math functions

function closeIn(element, x_target, y_target, factor) {
    var x_curr = element.translation.x;
    var y_curr = element.translation.y;

    element.translation.x = x_curr + ((x_target - x_curr)/factor);
    element.translation.y = y_curr + ((y_target - y_curr)/factor);

    two.update();
    
    if (Math.abs(x_target - x_curr) < 1 && Math.abs(y_target - y_curr) < 1) {
        return true;
    }
    return false;
}