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

var hoverIndex;
var obj_x_orig = 0;
var obj_y_orig = 0;
var obj_x_curr = 0;
var obj_y_curr = 0;
var obj_x_target = 0;
var obj_y_target = 0;
var stop_hovering = false;

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
    //setTimeout(moveCamera, cameraTimer+=3000, 2);
    //setTimeout(moveCamera, cameraTimer+=3000, 1);
    for (var i = 1; i < 8; i++) {
        if (i % 3 == 0) {
            setTimeout(zoomOut, cameraTimer+=5000);
            setTimeout(zoomIn, cameraTimer+=5000, i);
        } else {
            setTimeout(moveCamera, cameraTimer+=5000, i);
        }
    }

    setTimeout(moveCamera, cameraTimer+=5000, 2);

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

// Event functions

function hoverEvent() {
    hoverIndex = cameraIndex;
    obj_x_orig = events[cameraIndex].translation.x;
    obj_y_orig = events[cameraIndex].translation.y;    
    obj_x_target = 0;
    obj_y_target = 0;
    obj_x_curr = 0;
    obj_y_curr = 0;
    
    stop_hovering = false;
    
    two.unbind('update', hoveringEvent);
    two.bind('update', hoveringEvent);
}

function hoveringEvent() {
    var selected_element = events[hoverIndex];
    var selected_line_before = lines[hoverIndex];
    var selected_line_after;
    if (hoverIndex < lines.length - 1) {
        selected_line_after = lines[hoverIndex + 1];
    }
    
    var d = new Date();
    var time = d.getTime();
    
    if (Math.abs(obj_x_curr - obj_x_target) < 0.5 && stop_hovering == false) {
        obj_x_target = (Math.random() * 80) - 40;
    }

    if (Math.abs(obj_y_curr - obj_y_target) < 0.5 && stop_hovering == false) {
        obj_y_target = (Math.random() * 80) - 40;
    }
    
    if (stop_hovering == true && Math.abs(obj_x_curr - obj_x_target) < 0.1 && Math.abs(obj_y_curr - obj_y_target) < 0.1) {
        two.unbind('update', hoveringEvent);
        stop_hovering = false;
    }

    if (obj_x_curr < obj_x_target) {
        obj_x_curr += 0.15;
    } else {
        obj_x_curr -= 0.15;
    }

    if (obj_y_curr < obj_y_target) {
        obj_y_curr += 0.15;
    } else {
        obj_y_curr -= 0.15;
    }

    selected_element.translation.x = obj_x_orig + (obj_x_curr * Math.cos(time/1000));
    selected_element.translation.y = obj_y_orig + (obj_y_curr * Math.sin(time/1000));

    selected_line_before.vertices[0].x = selected_element.translation.x - selected_line_before.translation.x;
    selected_line_before.vertices[0].y = selected_element.translation.y - selected_line_before.translation.y;

    if (hoverIndex < lines.length - 1) {
        selected_line_after.vertices[1].x = selected_element.translation.x - selected_line_after.translation.x;
        selected_line_after.vertices[1].y = selected_element.translation.y - selected_line_after.translation.y;
    }
    //selected_line_before.vertices[0].y = obj_y_orig + (obj_y_curr * Math.sin(time/1000));
}

function moveBack() {
    obj_x_target = 0;
    obj_y_target = 0;
    
    stop_hovering = true;
}

// Camera functions

function moveCamera(index) {
    two.unbind('update', movingCamera);
    moveBack();
    
    cameraIndex = index;
    
    cam_x_orig = camera.translation.x;
    cam_y_orig = camera.translation.y;
    
    cam_x_target = (window.innerWidth/2) - events[cameraIndex].translation.x;
    cam_y_target = (window.innerHeight/2) - events[cameraIndex].translation.y;
    
    if (cameraIndex > 0 && !drawn_lines[cameraIndex]) {
        lines[cameraIndex].translation.set(events[cameraIndex - 1].translation.x, events[cameraIndex - 1].translation.y);
    }
    
    two.bind('update', movingCamera);
}

function movingCamera() {
    var selected_element = events[cameraIndex];
    var selected_line = lines[cameraIndex];
    
    if (!drawn_lines[cameraIndex]) {
        var curr_diff = Math.sqrt(Math.pow(camera.translation.x - cam_x_target, 2) + Math.pow(camera.translation.y - cam_y_target, 2));
        var orig_diff = Math.sqrt(Math.pow(cam_x_orig - cam_x_target, 2) + Math.pow(cam_y_orig - cam_y_target, 2));

        var percentage = Math.min(1, curr_diff/orig_diff - 0.1);
        
        if (cameraIndex > 0 && cameraIndex < events.length) {
            x_translation = ((events[cameraIndex - 1].translation.x * (percentage + 1)) + (events[cameraIndex].translation.x * (1 - percentage)))/2;
            y_translation = ((events[cameraIndex - 1].translation.y * (percentage + 1)) + (events[cameraIndex].translation.y * (1 - percentage)))/2;

            selected_line.translation.set(x_translation, y_translation);
            selected_line.scale = Math.max(0, (1 - percentage) * 1);
        }
    }
        
    if(closeIn(camera, cam_x_target, cam_y_target, cam_x_orig, cam_y_orig)) {
        two.unbind('update', movingCamera);
        two.unbind('update', zoomingOut);
        drawn_lines[cameraIndex] = true;
        hoverEvent();
    }
}

function movingCameraHome() {            
    if(closeIn(camera, cam_x_target, cam_y_target, cam_x_orig, cam_y_orig)) {
        two.unbind('update', movingCameraHome);
    }
}

// Zoom functions

function zoomIn(index) {
    two.unbind('update', movingCameraHome);
    two.unbind('update', movingCamera);
    two.unbind('update', zoomingOut);
    moveBack();

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
    moveBack();

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

function closeIn(element, x_target, y_target, x_original, y_original) {
    var x_curr = element.translation.x;
    var y_curr = element.translation.y;

    var progress = Math.sqrt(Math.pow(x_curr - x_original, 2) + Math.pow(y_curr - y_original, 2)) / Math.sqrt(Math.pow(x_target - x_original, 2) + Math.pow(y_target - y_original, 2));
    
    if (isNaN(progress)) {
        progress = 1;
    }
    
    if (progress < 0.5) {
        var unit_x = (x_target - x_curr) / Math.sqrt(Math.pow(x_target - x_curr, 2) + Math.pow(y_target - y_curr, 2));
        var unit_y = (y_target - y_curr) / Math.sqrt(Math.pow(x_target - x_curr, 2) + Math.pow(y_target - y_curr, 2));

        element.translation.x += ((x_curr - x_original + (unit_x * speed))/speed);
        element.translation.y += ((y_curr - y_original + (unit_y * speed))/speed);
    } else {
        element.translation.x += ((x_target - x_curr)/speed);
        element.translation.y += ((y_target - y_curr)/speed);   
    }

    if (progress > 0.985) {
        return true;
    }
    return false;
}