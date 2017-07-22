var cameraIndex = 0;
var cameraTimer = 0;
var cam_x_orig = 0;
var cam_y_orig = 0;
var cam_x_target = 0;
var cam_y_target = 0;
var cam_zoom_target = 0;
var cam_zoom_orig = 0;
var cam_zoom_in = false;

var hoverIndex = 0;
var obj_x_orig = [];
var obj_y_orig = [];
var obj_x_curr = [];
var obj_y_curr = [];
var obj_x_target = [];
var obj_y_target = [];
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
var sub_titles = [];
var sub_subtitles = [];
var sub_dates = [];

var target_text = -1;
var title_target = 0;
var text_speed = 1;

$(document).ready(function() {
    addEvent(150, 100, 1, true);
    addEvent(350, 1200, 2, false);
    addSubEvent(0, 10, 1, false);
    addSubEvent(0, 160, 2, false);
    addSubEvent(1, 10, 1, false);
    addSubEvent(1, 160, 2, false);
    addSubEvent(1, 210, 2, false);
    addEvent(1350, 600, 3, false);
    addEvent(2350, 900, 2, false);
    addEvent(4200, 50, 3, true);
    addEvent(3700, 1600, 1, false);
    addEvent(1200, 1600, 2, true);
    addEvent(500, 2500, 1, false);
    addEvents();

    setTimeout(moveCamera, cameraTimer, 0);
    //setTimeout(moveCamera, cameraTimer+=5000, 1);
    //setTimeout(moveCamera, cameraTimer+=5000, 2);
    //setTimeout(zoomOut, cameraTimer+=2500);
    
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
    
    makeTextInvisible(-1, 10000000);
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
    subevents.push([]);
    sublines.push([]);
    sub_titles.push([]);
    sub_subtitles.push([]);
    sub_dates.push([]);

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
    
    var x = parent_x + (Math.cos(toRadians(angle)) * 500);
    var y = parent_y + (Math.sin(toRadians(angle)) * 500);
    
    max_x = Math.max(x + (subsize/2), max_x);
    max_y = Math.max(y + (subsize/2), max_y);
    
    var line = two.makeLine(parent_x, parent_y, x, y);
    line.stroke = "rgba(0, 0, 0, 1)";
    line.linewidth = 5;
    line.scale = 0;
    sublines[parent_index].push(line);
    camera.add(line);
    
    var shape = two.interpret($(".images svg")[index]).center();
    shape.visible = true;
    shape.scale = 0;
    shape.translation.set(x, y);
    subevents[parent_index].push(shape);
    
    var text_offset = 0;
    
    if (top_text == true) {
        text_offset = -1.75 * subsize;
    }
    
    var title = new Two.Text("TITLE GOES HERE", x, y + subsize/2 + 35 + text_offset);
    title.size = 22.5;
    title.alignment = 'center';
    sub_titles[parent_index].push(title);
    /**var subtitle = new Two.Text("Subtitle goes here", x - subsize/2, y + subsize/2 + 65 + text_offset);
    subtitle.size = 20;
    subtitle.alignment = 'left';
    subtitle.fill = 'rgba(0, 0, 0, 0.5)';
    sub_subtitles[parent_index].push(subtitle);**/
    var date = new Two.Text("Junior Year // College", x, y + subsize/2 + 15 + text_offset);
    date.size = 12;
    date.alignment = 'center';
    date.fill = 'rgba(0, 0, 0, 0.5)';
    sub_dates[parent_index].push(date);

    camera.add(title);
    //camera.add(subtitle);
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

    two.unbind('update', hoveringEvent);
    
    obj_x_orig = [];
    obj_y_orig = [];
    obj_x_curr = [];
    obj_y_curr = [];
    obj_x_target = [];
    obj_y_target = [];
    
    for (var i = 0; i < subevents[hoverIndex].length; i++) {
        obj_x_orig.push(subevents[hoverIndex][i].translation.x);
        obj_y_orig.push(subevents[hoverIndex][i].translation.y);    
        obj_x_target.push(0);
        obj_y_target.push(0);
        obj_x_curr.push(0);
        obj_y_curr.push(0);
    }
    
    stop_hovering = false;
    
    two.bind('update', hoveringEvent);
}

function hoveringEvent() {
    var stop_hovering_counter = 0;
    
    for (var i = 0; i < subevents[hoverIndex].length; i++) {
        var selected_element = subevents[hoverIndex][i];
        var selected_title = sub_titles[hoverIndex][i];
        var selected_subtitle = sub_subtitles[hoverIndex][i];
        var selected_line_before = sublines[hoverIndex][i];

        var d = new Date();
        var time = d.getTime();

        if (Math.abs(obj_x_curr[i] - obj_x_target[i]) < 0.5 && stop_hovering == false) {
            obj_x_target[i] = (Math.random() * 80) - 40;
        }

        if (Math.abs(obj_y_curr[i] - obj_y_target[i]) < 0.5 && stop_hovering == false) {
            obj_y_target[i] = (Math.random() * 80) - 40;
        }

        if (stop_hovering == true && Math.abs(obj_x_curr[i] - obj_x_target[i]) < 0.05 && Math.abs(obj_y_curr[i] - obj_y_target[i]) < 0.05) {
            stop_hovering_counter++;
        }

        if (obj_x_curr[i] < obj_x_target[i]) {
            obj_x_curr[i] += 0.1;
        } else {
            obj_x_curr[i] -= 0.1;
        }

        if (obj_y_curr[i] < obj_y_target[i]) {
            obj_y_curr[i] += 0.1;
        } else {
            obj_y_curr[i] -= 0.1;
        }

        selected_element.translation.x = obj_x_orig[i] + (obj_x_curr[i] * Math.cos(time/2500));
        selected_element.translation.y = obj_y_orig[i] + (obj_y_curr[i] * Math.sin(time/2500));

        selected_line_before.vertices[1].x = selected_element.translation.x - selected_line_before.translation.x;
        selected_line_before.vertices[1].y = selected_element.translation.y - selected_line_before.translation.y;
    }
    
    if (stop_hovering_counter == subevents[hoverIndex].length) {
        stop_hovering = false;
        
        two.unbind('update', hoveringEvent);
    }
}

function stopHovering() {
    for (var i = 0; i < subevents[hoverIndex].length; i++) {
        obj_x_target[i] = 0;
        obj_y_target[i] = 0;
    }
    stop_hovering = true;
}

// Camera functions

function moveCamera(index) {
    two.unbind('update', movingCamera);
    //stopHovering();
    
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
    if (cameraIndex > 0) {
        makeTextInvisible(cameraIndex - 1, 1);
    }

    var selected_element = events[cameraIndex];
    var selected_line = lines[cameraIndex];  
    var selected_subevents = subevents[cameraIndex];
    var selected_sublines = sublines[cameraIndex];
    
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

        if (percentage < 0.1) {
            percentage = percentage * 10;
            for (var i = 0; i < selected_sublines.length; i++) {
                var subline = selected_sublines[i];
                var subevent = selected_subevents[i];
                var x_translation = ((selected_element.translation.x * (percentage + 1)) + (subevent.translation.x * (1 - percentage)))/2;
                var y_translation = ((selected_element.translation.y * (percentage + 1)) + (subevent.translation.y * (1 - percentage)))/2;

                subline.translation.set(x_translation, y_translation);
                subline.scale = Math.max(0, (1 - percentage));
            };
            
            selected_subevents.forEach(function(sub){
                sub.scale = (1 - percentage) * subsize_factor;
            });
        }        
    }
        
    if(closeIn(camera, cam_x_target, cam_y_target, cam_x_orig, cam_y_orig)) {
        two.unbind('update', movingCamera);
        two.unbind('update', zoomingOut);
        
        cam_x_target = camera.translation.x;
        cam_y_target = camera.translation.y;
        
        drawn_lines[cameraIndex] = true;
        //hoverEvent();
        
        makeTextVisible(cameraIndex, 1);
    }
}

function movingCameraHome() {            
    if(closeIn(camera, cam_x_target, cam_y_target, cam_x_orig, cam_y_orig)) {
        two.unbind('update', movingCameraHome);
    }
}

// Text functions

function makeTextVisible(index, speed) {
    two.unbind('update', makingText);
    target_text = index;
    title_target = 1;
    text_speed = speed;
    two.bind('update', makingText);
}

function makeTextInvisible(index, speed) {
    two.unbind('update', makingText);

    target_text = index;
    title_target = 0;
    text_speed = speed;
    two.bind('update', makingText);
}

function makingText() {
    var diff = 0.025;
    
    if (title_target == 0) {
        diff = -0.025;
    }

    diff = diff * text_speed;
    var small_diff = diff * 0.75;
            
    var text_target_count = 0;
    console.log(target_text);

    if (target_text == -1) {
        for (var i = 0; i < titles.length; i++) {
            titles[i].opacity = Math.max(0, Math.min(1, titles[i].opacity + diff));
            subtitles[i].opacity = Math.max(0, Math.min(1, subtitles[i].opacity + small_diff));
            dates[i].opacity = Math.max(0, Math.min(1, dates[i].opacity + small_diff));
            for (var j = 0; j < sub_titles[i].length; j++) {
                sub_titles[i][j].opacity = Math.max(0, Math.min(1, sub_titles[i][j].opacity + diff));
                //sub_subtitles[i][j].opacity = Math.max(0, Math.min(1, sub_subtitles[i][j].opacity + diff));
                sub_dates[i][j].opacity = Math.max(0, Math.min(1, sub_dates[i][j].opacity + small_diff));
            }
            
            if (titles[i].opacity == title_target) {
                text_target_count++;
            }
        }
    } else {
        titles[target_text].opacity = Math.max(0, Math.min(1, titles[target_text].opacity + diff));
        subtitles[target_text].opacity = Math.max(0, Math.min(1, subtitles[target_text].opacity + small_diff));
        dates[target_text].opacity = Math.max(0, Math.min(1, dates[target_text].opacity + small_diff));
        for (var j = 0; j < sub_titles[target_text].length; j++) {
            sub_titles[target_text][j].opacity = Math.max(0, Math.min(1, sub_titles[target_text][j].opacity + diff));
            //sub_subtitles[target_text][j].opacity = Math.max(0, Math.min(1, sub_subtitles[target_text][j].opacity + small_diff));
            sub_dates[target_text][j].opacity = Math.max(0, Math.min(1, sub_dates[target_text][j].opacity + small_diff));
        }
    }
    
    if ((target_text > -1 && titles[target_text].opacity == title_target) || (target_text == -1 && text_target_count == titles.length)) {
        two.unbind('update', makingText);
    }
}

// Zoom functions

function zoomIn(index) {
    two.unbind('update', movingCameraHome);
    two.unbind('update', movingCamera);
    two.unbind('update', zoomingOut);
    //stopHovering();

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
    //stopHovering();
    
    makeTextInvisible(-1, 1);
    
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