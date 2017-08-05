var cameraIndex = -1;
var cameraTimer = 0;
var cam_x_orig = 0;
var cam_y_orig = 0;
var cam_x_target = 0;
var cam_y_target = 0;
var cam_zoom_target = 0;
var cam_zoom_orig = 0;
var cam_zoom_in = false;
var fake_cam_x_curr = 0;
var fake_cam_y_curr = 0;

var hoverIndex = 0;
var obj_x_orig = [];
var obj_y_orig = [];
var obj_x_curr = [];
var obj_y_curr = [];
var obj_x_target = [];
var obj_y_target = [];
var stop_hovering = false;

var exps = [];
var exp_x_orig = [];
var exp_y_orig = [];
var exp_x_target = [];
var exp_y_target = [];

var max_x = 0;
var max_y = 0;
var submin_x = [];
var submin_y = [];
var submax_x = [];
var submax_y = [];

var prev_x = 0;
var prev_y = 0;

var size = 200;
var subsize = 100;
var speed = 8.0;
var zooming = false;
var zoom_max = 1;
var size_factor = size/400;
var subsize_factor = subsize/400;

var scoreboard_width = 435;
var scoreboard_height = 225;

var elem = document.getElementById('draw-shapes');
var two = new Two({type: Two.Types["svg"], width: window.innerWidth, height: window.innerHeight }).appendTo(elem);
var camera = two.makeGroup();
var scoreboard = two.makeGroup();
var controls = two.makeGroup();
var zui = new ZUI(two);
camera.translation.set(0, 0);
scoreboard.translation.set(0, 0);
controls.translation.set(scoreboard_width, 0);

var events = [];
var event_orientations = [];
var subevents = [];
var subevent_types = [];
var score_counts = [];
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

var event_titles = ["COMPUTER PROGRAM", "RESEARCH PAPER", "PROGRAMMING CLUB", "JOHNS HOPKINS UNIVERSITY",  "DESIGN TEAM", "ANDROID APPLICATION", "COURSE ASSISTANT", "DESIGN TEAM LEADER", "WEBMASTER", "iOS APPLICATION", "SUMMER SCHOLAR"];

var subevent_titles = ["7th Grade", "11th Grade", "11th Grade", "Biomedical Engineering & Computer Science",  "Freshman Year", "Freshman Year", "Sophomore Year", "Sophomore Year", "Sophomore Year", "Junior Year", "Junior Year"];

var preevent_titles = ["(First)", "(First)", "(First)", "(First Enrolled at)", "(First Experience on a)", "(First)", "(First Job as a)", "(First Experience as a)", "(First Position as a)", "(First)", "(First Experience as a)"]

$(document).ready(function() {
    console.log("v5");
    
    var cursor = 0;
    addEvent(500, 100, 1, 2, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(0, 0, 1, false, 0);
    addSubEvent(0, 157.5, 2, false, 0);
    addSubEvent(0, 180, 2, false, 1);

    addEvent(2500, 5100, 2, 0, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(1, -22.5, 2, false, 2);
    addSubEvent(1, 22.5, 2, false, 2);
    addSubEvent(1, 157.5, 2, false, 2);
    addSubEvent(1, 180, 2, false, 2);
    addSubEvent(1, 0, 2, false, 2);

    addEvent(4500, 100, 2, 2, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(2, 180, 2, false, 4);
    addSubEvent(2, 157.5, 2, false, 4);

    addEvent(6000, 200, 3, 2, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);

    addEvent(7500, 1100, 3, 1, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(4, -22.5, 2, false, 3);
    addSubEvent(4, 0, 1, false, 3);
    addSubEvent(4, 22.5, 2, false, 3);
    addSubEvent(4,-45, 2, false, 3);
    
    addEvent(8000, 2600, 2, 1, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(5, 22.5, 2, false, 0);
    
    addEvent(7500, 4100, 2, 0, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(6, -22.5, 2, false, 4);
    addSubEvent(6, 22.5, 2, false, 4);
    addSubEvent(6, 0, 2, false, 4);
    
    addEvent(6000, 4800, 2, 2, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(7, 22.5, 2, false, 4);
    addSubEvent(7, 0, 2, false, 4);

    addEvent(4500, 5100, 2, 0, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(8, 180, 2, false, 1);
    addSubEvent(8, 0, 2, false, 1);
    addSubEvent(8, 157.5, 2, false, 1);
    addSubEvent(8, -22.5, 2, true, 1);
    addSubEvent(8, 22.5, 2, false, 1);
    
    addEvent(4500, 3434, 0, 1, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(9, 0, 2, false, 0);
    addSubEvent(9, -22.5, 2, false, 0);
    addSubEvent(9, 22.5, 2, false, 0);
    
    addEvent(4500, 1768, 3, 3, event_titles[cursor], subevent_titles[cursor], preevent_titles[cursor++]);
    addSubEvent(10, 180, 2, false, 3);
    
    addEvents();
    
    addTally();
    addControls();

    setTimeout(moveCamera, cameraTimer, 0);
    //setTimeout(moveCamera, cameraTimer+=5000, 1);
    //setTimeout(moveCamera, cameraTimer+=5000, 2);
    //setTimeout(zoomOut, cameraTimer+=0);
    
    for (var i = 1; i < 11; i++) {
        if (i % 3 == 0) {
            setTimeout(zoomOut, cameraTimer+=3000);
            setTimeout(zoomIn, cameraTimer+=3000, i);
        } else {
            setTimeout(moveCamera, cameraTimer+=3000, i);
        }
    }
    
    for (var i = 1; i < 11; i++) {
        setTimeout(moveCamera, cameraTimer+=3000, i);
    }
        
    setTimeout(zoomOut, cameraTimer+=3000);
    //setTimeout(zoomIn, cameraTimer+=3000, 1);

    //setTimeout(moveCamera, cameraTimer+=5000, 2);

    two.play();
    
    makeTextInvisible(-1, 10000000);
});

// Add event functions

function addEvent(x, y, index, location, title, subtitle, pretitle) {  
    submin_x.push(Math.min(x, 100000000));
    submin_y.push(Math.min(y, 100000000));
    submax_x.push(Math.max(x + size, 0));
    submax_y.push(Math.max(y + size, 0));
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
    shape.visible = true;
    shape.scale = 0;
    shape.translation.set(x, y);
    events.push(shape);
    event_orientations.push(location);
    subevents.push([]);
    subevent_types.push([]);
    sublines.push([]);
    sub_titles.push([]);
    sub_subtitles.push([]);
    sub_dates.push([]);

    var text_offset_y = 0;
    var text_offset_x = 0;
    var alignment = 'center';
    
    if (location == 1) {
        text_offset_x = -0.575 * size;
        text_offset_y = -0.78 * size;
        alignment = "right";
    } else if (location == 2) {
        text_offset_y = -1.575 * size;
    } else if (location == 3) {
        text_offset_x = 0.575 * size;
        text_offset_y = -0.78 * size;
        alignment = "left";
    }
    
    var title = new Two.Text(title, x + text_offset_x, y + size/2 + 55 + text_offset_y);
    title.size = 45;
    title.family = 'Avenir';
    title.alignment = alignment;
    titles.push(title);
    var subtitle = new Two.Text(subtitle, x + text_offset_x, y + size/2 + 90 + text_offset_y);
    subtitle.size = 25;
    subtitle.family = 'Avenir';
    subtitle.alignment = alignment;
    subtitle.fill = 'rgba(0, 0, 0, 0.5)';
    subtitles.push(subtitle);
    var date = new Two.Text(pretitle, x + text_offset_x, y + size/2 + 20 + text_offset_y);
    date.size = 20;
    date.family = 'Avenir';
    date.alignment = alignment;
    date.fill = 'rgba(0, 0, 0, 0.5)';
    dates.push(date);
    camera.add(title);
    camera.add(subtitle);
    camera.add(date);
    
    two.update();
    
    prev_x = x;
    prev_y = y;
}

function addSubEvent(parent_index, angle, index, top_text, type) {  
    var parent = events[parent_index];
    
    var parent_x = parent.translation.x;
    var parent_y = parent.translation.y;
    
    var x = parent_x + (Math.cos(toRadians(angle)) * 500);
    var y = parent_y + (Math.sin(toRadians(angle)) * 500);
    
    submin_x[parent_index] = Math.min(x, submin_x[parent_index]);
    submin_y[parent_index] = Math.min(y, submin_y[parent_index]);
    submax_x[parent_index] = Math.max(x + size, submax_x[parent_index]);
    submax_y[parent_index] = Math.max(y + size, submax_y[parent_index]);
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
    subevent_types[parent_index].push(type);
    
    var text_offset = 0;
    
    if (top_text == true) {
        text_offset = -1.5 * subsize;
    }
    
    var title = new Two.Text("TITLE GOES HERE", x, y + subsize/2 + 35 + text_offset);
    title.size = 22.5;
    title.family = 'Avenir';
    title.alignment = 'center';
    sub_titles[parent_index].push(title);
    /**var subtitle = new Two.Text("Subtitle goes here", x - subsize/2, y + subsize/2 + 65 + text_offset);
    subtitle.size = 20;
    subtitle.alignment = 'left';
    subtitle.fill = 'rgba(0, 0, 0, 0.5)';
    sub_subtitles[parent_index].push(subtitle);**/
    var date = new Two.Text("Junior Year // College", x, y + subsize/2 + 15 + text_offset);
    date.size = 12;
    date.family = 'Avenir';
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

function addControls() {
    var roundedRect = new Two.RoundedRectangle(200, 0, 450, 120, 20);
    roundedRect.stroke = "black";
    roundedRect.linewidth = 5;
    roundedRect.fill = "rgba(255, 255, 255, 0.75)";
    controls.add(roundedRect);
}

function addTally() {
    var roundedRect = new Two.RoundedRectangle(scoreboard_width/2 - 50, scoreboard_height/2 - 50, scoreboard_width + 50, scoreboard_height + 50, 20);
    roundedRect.stroke = "black";
    roundedRect.linewidth = 0;
    roundedRect.fill = "rgba(255, 255, 255, 0.75)";
    scoreboard.add(roundedRect);

    var title = new Two.Text("VICTOR DADFAR", 10, 30);
    title.family = 'Avenir';
    title.size = 40;
    title.alignment = 'left';
    scoreboard.add(title);

    title = new Two.Text("An Interactive List of (Firsts)", 20, 55);
    title.size = 18;
    title.fill = 'rgba(0, 0, 0, 0.35)';
    title.alignment = 'left';
    title.family = 'Avenir';
    scoreboard.add(title);

    title = new Two.Text("APPLICATION DEVELOPMENT", 10, 90);
    title.alignment = 'left';
    title.family = 'Avenir';
    scoreboard.add(title);
    score_counts.push(0);

    title = new Two.Text("WEB DESIGN & DEVELOPMENT", 10, 115);
    title.alignment = 'left';
    title.family = 'Avenir';
    scoreboard.add(title);
    score_counts.push(0);
        
    title = new Two.Text("RESEARCH", 10, 140);
    title.alignment = 'left';
    title.family = 'Avenir';
    scoreboard.add(title);
    score_counts.push(0);

    title = new Two.Text("TEAM SKILLS", 10, 165);
    title.alignment = 'left';
    title.family = 'Avenir';
    scoreboard.add(title);
    score_counts.push(0);

    title = new Two.Text("LEADERSHIP", 10, 190);
    title.alignment = 'left';
    title.family = 'Avenir';
    scoreboard.add(title);
    score_counts.push(0);
    
    var line = two.makeLine(10, 70, 410, 70);
    line.stroke = "rgba(0, 0, 0, 0.25)";
    line.linewidth = 2;
    scoreboard.add(line);
    
    line = two.makeLine(230, 80, 230, 200);
    line.stroke = "rgba(0, 0, 0, 0.25)";
    line.linewidth = 2;
    scoreboard.add(line);
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
    
    for (var i = 0; i < events.length; i++) {
        for (var j = 0; j < subevents[i].length; j++) {
            subevents[i][j].opacity = 1;
            sublines[i][j].opacity = 1;
        }
    }

    scoreboard.opacity = 1;
    
    checkAllVisited();
    cameraIndex = index;
    
    cam_x_orig = camera.translation.x;
    cam_y_orig = camera.translation.y;
    
    var orientation = event_orientations[cameraIndex];
    
    var x_diff = 0;
    var y_diff = 0;
    
    switch(orientation) {
        case 0:
            y_diff = 50;
            break;
        case 1:
            x_diff = -50;
            break;
        case 2:
            y_diff = -50;
            break;
        case 3:
            x_diff = 50;
            break;
    }
    
    cam_zoom_orig = camera.scale;
    cam_zoom_target = camera.scale;
    
    cam_x_target = (window.innerWidth/2) - (events[cameraIndex].translation.x);
    cam_y_target = (window.innerHeight/2) - (events[cameraIndex].translation.y);
    if (cameraIndex > 0) {
        drawn_lines[cameraIndex - 1] = true;
    }
    
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
    } else {
        selected_element.scale = size_factor;
        for (var j = 0; j < selected_subevents.length; j++) {
            selected_subevents[j].scale = subsize_factor;
            selected_sublines[j].scale = 1;
        }
    }
        
    var results = closeIn(camera, cam_x_target, cam_y_target, cam_x_orig, cam_y_orig);
    if(results == 2) {
        two.unbind('update', movingCamera);
        two.unbind('update', zoomingOut);
        zooming = false;
        
        cam_x_target = camera.translation.x;
        cam_y_target = camera.translation.y;

        if (drawn_lines[cameraIndex] == false) {
            addExp();
        }

        drawn_lines[cameraIndex] = true;
        
        //hoverEvent();
        makeTextVisible(cameraIndex, 1);
        updateAllExp();
    } else if (results == 1) {
        makeAllElseInvisible();
    }
}

function movingCameraHome() {            
    if(closeIn(camera, cam_x_target, cam_y_target, cam_x_orig, cam_y_orig) == 2) {
        two.unbind('update', movingCameraHome);
        two.unbind('update', zoomingOut);
        zooming = false;
    }
}

function checkAllVisited() {
    for (var i = 0; i <= cameraIndex; i++) {
        if (i > 0) {
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
        
        for (var j = 0; j < subevents[i].length; j++) {
            var selected_line = sublines[i][j];
            
            var x_translation = (events[i].translation.x + subevents[i][j].translation.x)/2;
            var y_translation = (events[i].translation.y + subevents[i][j].translation.y)/2;

            selected_line.translation.set(x_translation, y_translation);
            selected_line.scale = 1;
        }
    }
}

// Optimizing functions

function makeAllElseInvisible() {
    for (var i = 0; i < events.length; i++) {
        if (i != cameraIndex) {
            events[i].scale = 0;
            for (var j = 0; j < subevents[i].length; j++) {
                subevents[i][j].scale = 0;
                sublines[i][j].scale = 0;
            }
        }
    }
}

function makeAllElseVisible() {
    for (var i = 0; i <= cameraIndex; i++) {
        events[i].scale = size_factor;
        for (var j = 0; j < subevents[i].length; j++) {
            subevents[i][j].scale = subsize_factor;
            sublines[i][j].scale = 1;
        }
    }
}

// EXP functions

function updateAllExp() {
    var temp_score_counts = [];

    for (var i = 0; i < score_counts.length; i++) {
        temp_score_counts.push(0);
    }
    
    for (var i = 0; i <= cameraIndex; i++) {
        for (var j = 0; j < subevents[i].length; j++) {
            temp_score_counts[subevent_types[i][j]]++;
        }
    }
    
    for (var i = 0; i < score_counts.length; i++) {
        while (score_counts[i] < temp_score_counts[i]) {
            var exp = new Two.Ellipse(250 + (25 * score_counts[i]++), 88 + (25 * i), 7.5, 7.5);
            exp.fill = 'rgba(0, 0, 0, 1)';
            exp.scale = 1;
            scoreboard.add(exp);            
        }
    }
}

function addExp() {
    while (exps.length > 0) {
        exps.pop();
        exp_x_orig.pop();
        exp_y_orig.pop();
        exp_x_target.pop();
        exp_y_target.pop();
    }
    
    for (var j = 0; j < subevent_types[cameraIndex].length; j++) {
        var type = subevent_types[cameraIndex][j];        
        var subevent = subevents[cameraIndex][j];

        if (type <= 4) {
            var exp = new Two.Ellipse(subevent.translation.x + camera.translation.x, subevent.translation.y + camera.translation.y, 7.5, 7.5);
            exp.fill = 'rgba(0, 0, 0, 1)';
            exp.scale = 0;
            scoreboard.add(exp);
            exps.push(exp);

            exp_x_orig.push(exp.translation.x);
            exp_y_orig.push(exp.translation.y);
            exp_x_target.push(250 + (25 * score_counts[type]++));
            exp_y_target.push(88 + (25 * type));   
        }
    }
    
    two.unbind('update', updateExp);
    two.bind('update', updateExp);
}

function updateExp() {
    var count = 0;
    for (var j = 0; j < exps.length; j++) {
        if (closeIn2(exps[j], exp_x_target[j], exp_y_target[j], exp_x_orig[j], exp_y_orig[j]) == 2) {
            count++;
        }
    }
    
    if (count == exps.length) {
        two.unbind('update', updateExp);
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
        
    zooming = true;
    
    two.bind('update', zoomingOut);
    two.bind('update', movingCamera);
}

function zoomOut() {
    two.unbind('update', movingCameraHome);
    two.unbind('update', movingCamera);
    two.unbind('update', zoomingOut);
    //stopHovering();

    checkAllVisited();
    makeAllElseVisible();
    updateAllExp();
    
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
    
    cam_zoom_target = Math.min(x_per, y_per) - 0.02;
    
    cam_x_orig = camera.translation.x;
    cam_y_orig = camera.translation.y;
    cam_x_target = (window.innerWidth - (cam_zoom_target * max_x))/2;
    cam_y_target = (window.innerHeight - (cam_zoom_target * max_y))/2;
    cam_zoom_orig = camera.scale;
    cam_zoom_in = false;
    
    zooming = true;
    
    two.bind('update', zoomingOut);
    //two.bind('update', movingCameraHome);    
}

function zoomingOut() {    
    var x_curr = camera.translation.x;
    var y_curr = camera.translation.y;

    var progress = Math.sqrt(Math.pow(fake_cam_x_curr - cam_x_orig, 2) + Math.pow(fake_cam_y_curr - cam_y_orig, 2)) / Math.sqrt(Math.pow(cam_x_target - cam_x_orig, 2) + Math.pow(cam_y_target - cam_y_orig, 2));

    if (progress < 0.5) {
        var unit_x = (x_target - fake_cam_x_curr) / Math.sqrt(Math.pow(x_target - fake_cam_x_curr, 2) + Math.pow(y_target - fake_cam_y_curr, 2));
        var unit_y = (y_target - fake_cam_y_curr) / Math.sqrt(Math.pow(x_target - fake_cam_x_curr, 2) + Math.pow(y_target - fake_cam_y_curr, 2));

        fake_cam_x_curr += ((fake_cam_x_curr - x_original + (fake_cam_x_curr * temp_speed))/temp_speed);
        fake_cam_y_curr += ((fake_cam_y_curr - y_original + (fake_cam_y_curr * temp_speed))/temp_speed);
    } else {
        fake_cam_x_curr += ((x_target - fake_cam_x_curr)/temp_speed);
        fake_cam_y_curr += ((y_target - fake_cam_y_curr)/temp_speed);   
    }
    
    var new_scale = (cam_zoom_orig * (1 - progress)) + (cam_zoom_target * progress);
    zui.zoomSet(new_scale, window.innerWidth/2, window.innerHeight/2);

    var change = 1 - progress;

    if (cam_x_target < cam_x_orig) {
        change = progress;
    }

    for (var i = 0; i < events.length; i++) {
        for (var j = 0; j < subevents[i].length; j++) {
            subevents[i][j].opacity = change;
            sublines[i][j].opacity = change;
        }
    }

    scoreboard.opacity = change;
}

// General math functions

function closeIn(element, x_target, y_target, x_original, y_original) {
    var x_curr = element.translation.x;
    var y_curr = element.translation.y;

    var progress = Math.sqrt(Math.pow(x_curr - x_original, 2) + Math.pow(y_curr - y_original, 2)) / Math.sqrt(Math.pow(x_target - x_original, 2) + Math.pow(y_target - y_original, 2));
    
    if (isNaN(progress)) {
        progress = 1;
    }
    
    var temp_speed = speed;
    
    /**if (zooming == true) {
        temp_speed = speed * 1.5
    }**/
    
    if (progress < 0.5) {
        var unit_x = (x_target - x_curr) / Math.sqrt(Math.pow(x_target - x_curr, 2) + Math.pow(y_target - y_curr, 2));
        var unit_y = (y_target - y_curr) / Math.sqrt(Math.pow(x_target - x_curr, 2) + Math.pow(y_target - y_curr, 2));

        element.translation.x += ((x_curr - x_original + (unit_x * temp_speed))/temp_speed);
        element.translation.y += ((y_curr - y_original + (unit_y * temp_speed))/temp_speed);
    } else {
        element.translation.x += ((x_target - x_curr)/temp_speed);
        element.translation.y += ((y_target - y_curr)/temp_speed);   
    }
        
    if (progress > 0.995) {
        return 2;
    } else if (progress > 0.5) {
        return 1;
    }
    return 0;
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

//Necessary for a stupid safari bug

function closeIn2(element, x_target, y_target, x_original, y_original) {
    var x_curr = element.translation.x;
    var y_curr = element.translation.y;

    var progress = Math.sqrt(Math.pow(x_curr - x_original, 2) + Math.pow(y_curr - y_original, 2)) / Math.sqrt(Math.pow(x_target - x_original, 2) + Math.pow(y_target - y_original, 2));
    
    element.scale = Math.min(1, progress * 5);
    
    if (isNaN(progress)) {
        progress = 1;
    }
    
    if (progress < 0.5) {
        var unit_x = (x_target - x_curr) / Math.sqrt(Math.pow(x_target - x_curr, 2) + Math.pow(y_target - y_curr, 2));
        var unit_y = (y_target - y_curr) / Math.sqrt(Math.pow(x_target - x_curr, 2) + Math.pow(y_target - y_curr, 2));

        element.translation.x += (x_curr - x_original + (unit_x * speed))/speed;
        element.translation.y += (y_curr - y_original + (unit_y * speed))/speed;
    } else {
        element.translation.x += (x_target - x_curr)/speed;
        element.translation.y += (y_target - y_curr)/speed;   
    }

    if (progress > 0.9999999) {
        return 2;
    }
    return 0;
}