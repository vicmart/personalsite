var cameraIndex;
var cameraTimer = 0;
var cam_x_orig = 0;
var cam_y_orig = 0;
var cam_x_target = 0;
var cam_y_target = 0;
var cam_zoom_target = 0;
var cam_zoom_orig = 0;
var cam_zoom_in = false;

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
var subsize = 100;
var speed = 12.0;
var size_factor = size/400;
var subsize_factor = subsize/400;

var elem = document.getElementById('draw-shapes');
var two = new Two({type: Two.Types["svg"], width: window.innerWidth, height: window.innerHeight }).appendTo(elem);
var camera = two.makeGroup();
camera.translation.set(0, 0);

var events = [];
var subevents = [];
var lines = [];
var sublines = [];
var drawn_lines = [];
var titles = [];
var subtitles = [];
var dates = [];

var title_target = 0;

$(document).ready(function() {
    addEvent(150, 100, 1, true);
    addEvent(350, 1200, 2, false);
    addSubEvent(0, 10, 1, false);
    addSubEvent(0, 160, 2, false);
    addEvent(1350, 600, 3, false);
    addEvent(2350, 900, 2, true);
    addEvent(4200, 50, 3, false);
    addEvent(3700, 1600, 1, true);
    addEvent(1200, 1600, 2, false);
    addEvent(500, 2500, 1, true);
    addEvents();

    setTimeout(moveCamera, cameraTimer, 0);
    
    /**for (var i = 1; i < 8; i++) {
        if (i % 3 == 0) {
            setTimeout(zoomOut, cameraTimer+=5000);
            setTimeout(zoomIn, cameraTimer+=5000, i);
        } else {
            setTimeout(moveCamera, cameraTimer+=5000, i);
        }
    }

    setTimeout(moveCamera, cameraTimer+=5000, 2);**/

    two.play();
});

function addEvent(x, y, index, top_text) {  
    max_x = Math.max(x + (size/2), max_x);
    max_y = Math.max(y + (size/2), max_y);
    
    var line = two.makeLine(prev_x, prev_y, x, y);
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
    shape.scale = 0;
    shape.translation.set(x, y);
    events.push(shape);
    
    var text_offset = 0;
    
    if (top_text == true) {
        text_offset = -1.575 * size;
    }
    
    var title = new Two.Text("TITLE GOES HERE", x - size/2, y + size/2 + 55 + text_offset);
    title.size = 45;
    title.alignment = 'left';
    titles.push(title);
    var subtitle = new Two.Text("Subtitle goes here", x - size/2, y + size/2 + 90 + text_offset);
    subtitle.size = 25;
    subtitle.alignment = 'left';
    subtitle.fill = 'rgba(0, 0, 0, 0.5)';
    subtitles.push(subtitle);
    var date = new Two.Text("Junior Year // College", x - size/2, y + size/2 + 20 + text_offset);
    date.size = 15;
    date.alignment = 'left';
    date.fill = 'rgba(0, 0, 0, 0.5)';
    dates.push(date);
    camera.add(title);
    camera.add(subtitle);
    camera.add(date);
    
    two.update();
    
    prev_x = x;
    prev_y = y;
}

function addSubEvent(parent_index, angle, index, top_text) {  
    var parent = events[parent_index];
    
    var parent_x = parent.translation.x;
    var parent_y = parent.translation.y;
    
    var x = parent_x + (Math.cos(toRadians(angle)) * 300);
    var y = parent_y + (Math.sin(toRadians(angle)) * 300);
    
    max_x = Math.max(x + (subsize/2), max_x);
    max_y = Math.max(y + (subsize/2), max_y);
    
    var line = two.makeLine(parent_x, parent_y, x, y);
    line.stroke = "rgba(0, 0, 0, 1)";
    line.linewidth = 5;
    line.scale = 1;
    sublines.push(line);
    camera.add(line);
    
    var shape = two.interpret($(".images svg")[index]).center();
    shape.visible = true;
    shape.scale = subsize_factor;
    shape.translation.set(x, y);
    subevents.push(shape);
    
    var text_offset = 0;
    
    if (top_text == true) {
        text_offset = -1.75 * subsize;
    }
    
    var title = new Two.Text("TITLE GOES HERE", x - subsize/2, y + subsize/2 + 40 + text_offset);
    title.size = 30;
    title.alignment = 'left';
    titles.push(title);
    var subtitle = new Two.Text("Subtitle goes here", x - subsize/2, y + subsize/2 + 65 + text_offset);
    subtitle.size = 20;
    subtitle.alignment = 'left';
    subtitle.fill = 'rgba(0, 0, 0, 0.5)';
    subtitles.push(subtitle);
    var date = new Two.Text("Junior Year // College", x - subsize/2, y + subsize/2 + 15 + text_offset);
    date.size = 12;
    date.alignment = 'left';
    date.fill = 'rgba(0, 0, 0, 0.5)';
    dates.push(date);

    camera.add(title);
    camera.add(subtitle);
    camera.add(date);
    
    two.update();
}

function addEvents() {
    events.forEach(function(event){
        camera.add(event);
    });

    subevents.forEach(function(subevent){
        camera.add(subevent);
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
    
    var selected_element = events[hoverIndex];
    var selected_title = titles[hoverIndex];
    var selected_line_before = lines[hoverIndex];
    var selected_subtitle = subtitles[hoverIndex];
}

function hoveringEvent() {
    var selected_element = events[hoverIndex];
    var selected_title = titles[hoverIndex];
    var selected_subtitle = subtitles[hoverIndex];
    var selected_line_before = lines[hoverIndex];
    var selected_line_after;
    if (hoverIndex < lines.length - 1) {
        selected_line_after = lines[hoverIndex + 1];
    }
    
    var d = new Date();
    var time = d.getTime();
    
    if (Math.abs(obj_x_curr - obj_x_target) < 0.5 && stop_hovering == false) {
        obj_x_target = (Math.random() * 40) - 20;
    }

    if (Math.abs(obj_y_curr - obj_y_target) < 0.5 && stop_hovering == false) {
        obj_y_target = (Math.random() * 40) - 20;
    }
    
    if (stop_hovering == true && Math.abs(obj_x_curr - obj_x_target) < 0.05 && Math.abs(obj_y_curr - obj_y_target) < 0.05) {
        stop_hovering = false;
        
        selected_line_before.vertices[1].x = obj_x_orig - selected_line_before.translation.x;
        selected_line_before.vertices[1].y = obj_y_orig - selected_line_before.translation.y;

        if (hoverIndex < lines.length - 1) {
            selected_line_after.vertices[0].x = obj_x_orig - selected_line_after.translation.x;
            selected_line_after.vertices[0].y = obj_y_orig - selected_line_after.translation.y;
        }
        
        two.unbind('update', hoveringEvent);
    }

    if (obj_x_curr < obj_x_target) {
        obj_x_curr += 0.1;
    } else {
        obj_x_curr -= 0.1;
    }

    if (obj_y_curr < obj_y_target) {
        obj_y_curr += 0.1;
    } else {
        obj_y_curr -= 0.1;
    }

    selected_element.translation.x = obj_x_orig + (obj_x_curr * Math.cos(time/2500));
    selected_element.translation.y = obj_y_orig + (obj_y_curr * Math.sin(time/2500));

    selected_line_before.vertices[1].x = selected_element.translation.x - selected_line_before.translation.x;
    selected_line_before.vertices[1].y = selected_element.translation.y - selected_line_before.translation.y;

    if (hoverIndex < lines.length - 1) {
        selected_line_after.vertices[0].x = selected_element.translation.x - selected_line_after.translation.x;
        selected_line_after.vertices[0].y = selected_element.translation.y - selected_line_after.translation.y;
    }
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
    
    for (var i = 1; i <= cameraIndex; i++) {
        var selected_line = lines[i];
        
        var x_translation = (events[i - 1].translation.x + events[i].translation.x)/2;
        var y_translation = (events[i - 1].translation.y + events[i].translation.y)/2;

        selected_line.translation.set(x_translation, y_translation);
        selected_line.scale = 1;
        
        selected_line.vertices[0].x = events[i - 1].translation.x - selected_line.translation.x;
        selected_line.vertices[0].y = events[i - 1].translation.y - selected_line.translation.y;

        selected_line.vertices[1].x = events[i].translation.x - selected_line.translation.x;
        selected_line.vertices[1].y = events[i].translation.y - selected_line.translation.y;
    }
    
    cameraIndex = index;
    
    cam_x_orig = camera.translation.x;
    cam_y_orig = camera.translation.y;
    
    cam_x_target = (window.innerWidth/2) - events[cameraIndex].translation.x;
    cam_y_target = (window.innerHeight/2) - events[cameraIndex].translation.y;
    
    /**if (cameraIndex > 0 && !drawn_lines[cameraIndex]) {
        //lines[cameraIndex].translation.set(events[cameraIndex - 1].translation.x, events[cameraIndex - 1].translation.y);
    }**/
    
    two.bind('update', movingCamera);
}

function movingCamera() {
    var selected_element = events[cameraIndex];
    var selected_line = lines[cameraIndex];    
    
    if (!drawn_lines[cameraIndex]) {
        var curr_diff = Math.sqrt(Math.pow(camera.translation.x - cam_x_target, 2) + Math.pow(camera.translation.y - cam_y_target, 2));
        var orig_diff = Math.sqrt(Math.pow(cam_x_orig - cam_x_target, 2) + Math.pow(cam_y_orig - cam_y_target, 2));

        var percentage = Math.min(1, curr_diff/orig_diff);
        
        if (cameraIndex > 0 && cameraIndex < events.length) {
            var x_translation = ((events[cameraIndex - 1].translation.x * (percentage + 1)) + (events[cameraIndex].translation.x * (1 - percentage)))/2;
            var y_translation = ((events[cameraIndex - 1].translation.y * (percentage + 1)) + (events[cameraIndex].translation.y * (1 - percentage)))/2;

            selected_line.translation.set(x_translation, y_translation);
            selected_line.scale = Math.max(0, (1 - percentage));
        }
        
        selected_element.scale = (1 - percentage) * size_factor;
    }
        
    if(closeIn(camera, cam_x_target, cam_y_target, cam_x_orig, cam_y_orig)) {
        two.unbind('update', movingCamera);
        two.unbind('update', zoomingOut);
        
        cam_x_target = camera.translation.x;
        cam_y_target = camera.translation.y;
        
        drawn_lines[cameraIndex] = true;
        //hoverEvent();
        
        makeTextVisible();
    }
}

function movingCameraHome() {            
    if(closeIn(camera, cam_x_target, cam_y_target, cam_x_orig, cam_y_orig)) {
        two.unbind('update', movingCameraHome);
    }
}

// Text functions

function makeTextVisible() {
    two.unbind('update', makingText);
    
    title_target = 1;
    two.bind('update', makingText);
}

function makeTextInvisible() {
    two.unbind('update', makingText);

    title_target = 0;
    two.bind('update', makingText);
}

function makingText() {
    var diff = 0.05;
    
    if (title_target == 0) {
        diff = -0.05;
    }
    
    for (var i = 0; i < titles.length; i++) {
        titles[i].opacity = Math.max(0, Math.min(1, titles[i].opacity + diff));
        subtitles[i].opacity = Math.max(0, Math.min(1, subtitles[i].opacity + diff));
        dates[i].opacity = Math.max(0, Math.min(1, dates[i].opacity + diff));
    }
    
    if (titles[0].opacity == title_target) {
        two.unbind('update', makingText);
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
    
    makeTextInvisible();
    
    for (var i = 1; i <= cameraIndex; i++) {
        var selected_line = lines[i];
        
        var x_translation = (events[i - 1].translation.x + events[i].translation.x)/2;
        var y_translation = (events[i - 1].translation.y + events[i].translation.y)/2;

        selected_line.translation.set(x_translation, y_translation);
        selected_line.scale = 1;
        
        selected_line.vertices[0].x = events[i - 1].translation.x - selected_line.translation.x;
        selected_line.vertices[0].y = events[i - 1].translation.y - selected_line.translation.y;

        selected_line.vertices[1].x = events[i].translation.x - selected_line.translation.x;
        selected_line.vertices[1].y = events[i].translation.y - selected_line.translation.y;
    }
    
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

    if (progress > 0.995) {
        return true;
    }
    return false;
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}