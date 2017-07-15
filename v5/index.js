var cameraIndex;
var cameraTimer = 0;
var cam_x_orig = 0;
var cam_y_orig = 0;
var cam_x_target = 0;
var cam_y_target = 0;
var cam_zoom_target = 0;
var cam_zoom_orig = 0;
var cam_zoom_in = false;
var speed = 24.0;

var max_x = 0;
var max_y = 0;

var prev_x = 0;
var prev_y = 0;

var size = 200;

var elem = document.getElementById('draw-shapes');
var two = new Two({type: Two.Types["svg"], width: window.innerWidth, height: window.innerHeight }).appendTo(elem);
var camera = two.makeGroup();
camera.translation.set(0, 0);

var events = [];
var shapes = [];
var lines = [];
var drawn_lines = [];

$(document).ready(function() {
    addEvent(150, 100, 1);
    addEvent(350, 1200, 2);
    addEvent(1350, 600, 3);
    addEvent(2350, 900, 2);
    addEvent(4200, 50, 3);
    addEvent(3700, 1600, 1);
    addEvent(1200, 1600, 2);
    addEvent(500, 2500, 1);
    addEvents();

    setTimeout(moveCamera, cameraTimer, 0);
    for (var i = 1; i < 8; i++) {
        if (i % 3 == 0) {
            setTimeout(zoomOut, cameraTimer+=3000);
            setTimeout(zoomIn, cameraTimer+=3000, i);
        } else {
            setTimeout(moveCamera, cameraTimer+=3000, i);
        }
    }

    setTimeout(moveCamera, cameraTimer+=3000, 2);

    two.play();
});

function addEvent(x, y, index) {  
    max_x = Math.max(x + (size/2), max_x);
    max_y = Math.max(y + (size/2), max_y);
    
    var line = two.makeLine(x, y, prev_x, prev_y);
    line.stroke = "rgba(0, 0, 0, 1)";
    line.linewidth = 10;
    line.scale = 0;
    lines.push(line);
    drawn_lines.push(false);
    camera.add(line);
    
    var shape = two.interpret($(".images svg")[index]).center();
    //shape.fill = 'green';
    shape.visible = true;
    //shape.noStroke();
    shape.scale = 0.5;
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

    $(".images").empty();
    
    two.update();
}

// Camera functions

function moveCamera(index) {
    cameraIndex = index;
    
    cam_x_orig = camera.translation.x;
    cam_y_orig = camera.translation.y;
    
    cam_x_target = (window.innerWidth/2) - events[cameraIndex].translation.x;
    cam_y_target = (window.innerHeight/2) - events[cameraIndex].translation.y;
    
    if (cameraIndex > 0 && !drawn_lines[cameraIndex]) {
        lines[cameraIndex].translation.set(events[cameraIndex - 1].translation.x, events[cameraIndex - 1].translation.y);
    }
    
    two.unbind('update', movingCamera);
    two.bind('update', movingCamera);
}

function movingCamera() {
    var selected_element = events[cameraIndex];
    var selected_line = lines[cameraIndex];
    
    if (!drawn_lines[cameraIndex]) {
        var curr_diff = Math.sqrt(Math.pow(camera.translation.x - cam_x_target, 2) + Math.pow(camera.translation.y - cam_y_target, 2));
        var orig_diff = Math.sqrt(Math.pow(cam_x_orig - cam_x_target, 2) + Math.pow(cam_y_orig - cam_y_target, 2));

        var percentage = (curr_diff/(2 * orig_diff)) + 0.5;

        if (cameraIndex > 0 && cameraIndex < events.length) {
            x_translation = (events[cameraIndex - 1].translation.x * percentage) + (events[cameraIndex].translation.x * (1 - percentage));
            y_translation = (events[cameraIndex - 1].translation.y * percentage) + (events[cameraIndex].translation.y * (1 - percentage));

            selected_line.translation.set(x_translation, y_translation);
            selected_line.scale = Math.max(0, 1 - ((percentage - 0.5) * 2));
        }
    }
        
    if(closeIn(camera, cam_x_target, cam_y_target)) {
        two.unbind('update', movingCamera);
        two.unbind('update', zoomingOut);
        drawn_lines[cameraIndex] = true;
    }
}

function movingCameraHome() {            
    if(closeIn(camera, cam_x_target, cam_y_target)) {
        two.unbind('update', movingCameraHome);
    }
}

// Zoom functions

function zoomIn(index) {
    two.unbind('update', movingCameraHome);
    two.unbind('update', movingCamera);
    two.unbind('update', zoomingOut);

    cam_zoom_target = 1;
    cameraIndex = index;
        
    cam_x_orig = camera.translation.x;
    cam_y_orig = camera.translation.y;
    cam_x_target = (window.innerWidth/2) - events[cameraIndex].translation.x;
    cam_y_target = (window.innerHeight/2) - events[cameraIndex].translation.y;
    cam_zoom_orig = camera.scale;
    cam_zoom_in = true;
        
    two.bind('update', zoomingOut);
    two.bind('update', movingCamera);
}

function zoomOut() {
    two.unbind('update', movingCameraHome);
    two.unbind('update', movingCamera);
    two.unbind('update', zoomingOut);

    var x_per = window.innerWidth/max_x;
    var y_per = window.innerHeight/max_y;
    
    cam_zoom_target = Math.min(x_per, y_per) - 0.05;
    
    cam_x_orig = camera.translation.x;
    cam_y_orig = camera.translation.y;
    cam_x_target = (window.innerWidth - (cam_zoom_target * max_x))/2;
    cam_y_target = (window.innerHeight - (cam_zoom_target * max_y))/2;
    cam_zoom_orig = camera.scale;
    cam_zoom_in = false;
    
    two.bind('update', zoomingOut);
    two.bind('update', movingCameraHome);    
}

function zoomingOut() {    
    var x_curr = camera.translation.x;
    var y_curr = camera.translation.y;

    var progress = Math.sqrt(Math.pow(x_curr - cam_x_orig, 2) + Math.pow(y_curr - cam_y_orig, 2)) / Math.sqrt(Math.pow(cam_x_target - cam_x_orig, 2) + Math.pow(cam_y_target - cam_y_orig, 2));

    camera.scale = (cam_zoom_orig * (1 - progress)) + (cam_zoom_target * progress);
}

// General math functions

function closeIn(element, x_target, y_target) {
    var x_curr = element.translation.x;
    var y_curr = element.translation.y;

    var progress = Math.sqrt(Math.pow(x_curr - cam_x_orig, 2) + Math.pow(y_curr - cam_y_orig, 2)) / Math.sqrt(Math.pow(x_target - cam_x_orig, 2) + Math.pow(y_target - cam_y_orig, 2));
    
    if (progress < 0.5) {
        var unit_x = (x_target - x_curr) / Math.sqrt(Math.pow(x_target - x_curr, 2) + Math.pow(y_target - y_curr, 2));
        var unit_y = (y_target - y_curr) / Math.sqrt(Math.pow(x_target - x_curr, 2) + Math.pow(y_target - y_curr, 2));

        element.translation.x += ((x_curr - cam_x_orig + (unit_x * speed))/speed);
        element.translation.y += ((y_curr - cam_y_orig + (unit_y * speed))/speed);
    } else {
        element.translation.x += ((x_target - x_curr)/speed);
        element.translation.y += ((y_target - y_curr)/speed);   
    }

    if (progress > 0.985) {
        return true;
    }
    return false;
}