var current_command = new String("");
var command_history = new String("");
var cursor_state = true;

var events = [];
var subevents = [];

var current_folder = "";
var current_event;
var home_folder = "Personal Site";

var code_active = false;

var guide_active = 0;

$(document).keypress(function(e) {
    if (code_active == true) {
        addToCommand(String.fromCharCode(e.which));
        if (e.which == 32) {
            return false;
        }

        if (e.which == 8) {
            backspace();
        }

        if (e.which == 13) {
            enterCommand();
        }
    }
});

function addToCommand(letter) {
    current_command = current_command + letter;
    updateText();
}

function backspace() {
    if (current_command.length > 0) {
        current_command = current_command.substring(0, current_command.length - 2);
        updateText();
    }
}

function updateText() {
    if (cursor_state == true) {
        $(".code").html(command_history + current_command + "_"); 
    } else {
        $(".code").html(command_history + current_command + "&nbsp;"); 
    }
    
    while (document.getElementsByClassName("code")[0].scrollHeight > $(".code").eq(0).outerHeight()) {
        var cut_index = command_history.split("</br>")[0].length + 5;
        
        command_history = command_history.substring(cut_index, command_history.length);
        $(".code").html(command_history + current_command + "&nbsp;"); 
    }
}

function enterCommand() {
    command_history = command_history + current_command;
    current_command = current_command.substring(0, current_command.length - 1);

    switch(current_command.split(" ")[0]) {
        case "ls":
            var list = new String("");
            $(".event").each(function() {
                list = list + "</br>" + $(this).children(".text").eq(0).children(".big-title").eq(0).text().toLocaleLowerCase();
            });
            
            command_history = command_history + list;            
            break;
        case "cd":
            var folder = current_command.substring(current_command.split(" ")[0].length + 1, current_command.length);
            var found = false;
            
            $(".event").each(function() {
                if (found == false && $(this).children(".text").eq(0).children(".big-title").eq(0).text().substring(0, folder.length).localeCompare(folder.toUpperCase()) == 0) {
                    current_folder = $(this).children(".text").eq(0).children(".big-title").eq(0).text().toLowerCase();
                    current_event = $(this);
                    found = true;
                    if (current_event) {
                        $('html, body').animate({
                            scrollTop: $(current_event).children(".icon-wrapper").eq(0).offset().top - parseInt($(current_event).children(".icon-wrapper").eq(0).css("margin-top"))
                        }, 2000);
                    } else {
                        command_history = command_history + "</br> Must first select an event. </br>";     
                    }
                }
            });
            
            if (found == false && folder.localeCompare("..") == 0) {
                current_folder = home_folder;
                current_event = null;
                found = true;
            }
            
            if (found == false) {
                command_history = command_history + "</br> '" + folder + "' is not a valid folder. ";
            }
            
            command_history = command_history + "</br>";
            
            break;
        case "info":
            var folder = current_command.substring(current_command.split(" ")[0].length + 1, current_command.length);
            
            if (current_event) {
                if (folder.length == 0) {
                    command_history = command_history + "</br>" + $(current_event).data("info") + "</br>";
                } else {
                    
                }
            } else {
                command_history = command_history + "</br> Must first select an event.";                
            }
            break;
        case "color":
            var color = current_command.substring(current_command.split(" ")[0].length + 1, current_command.length);
            if (current_event) {
                $(current_event).children(".big-text").eq(0).css("background-color", color);
                $(current_event).children(".big-text").eq(0).children(".subevent").each(function() {
                    $(this).children(".text").eq(0).css("background-color", color);
                });
                $(current_event).children(".icon-wrapper").eq(0).children(".icon").eq(0).css("fill", color);
            } else {
                command_history = command_history + "</br> Must first select an event.";                
            }
            
            command_history = command_history + "</br>";
            break;
        case "email":
            window.location.href = "mailto:vdadfar1@gmail.com";
            command_history = command_history + "</br>";
            break;
        case "resume":
            window.open("resume.pdf", "_blank");
            command_history = command_history + "</br>";
            break;
        case "linkedin":
            window.open("http://www.linkedin.com/pub/victor-dadfar/94/287/3a1", "_blank");
            command_history = command_history + "</br>";
            break;
        case "github":
            window.open("http://github.com/Vicmart1", "_blank");
            command_history = command_history + "</br>";
            break;
        case "browser":
            var url = current_command.substring(current_command.split(" ")[0].length + 1, current_command.length);
            window.open("http://" + url, "_blank");
            command_history = command_history + "</br>";
            break;
        case "clear":
            command_history = "History cleared.</br>";
            break;
        case "refresh":
            location.reload();
            break;
        case "tourguide":
            $(".switcher").eq(0).click();
            guide_active = 0;
            guide();
            break;
        case "exit":
            $(".switcher").eq(0).click();
            command_history = "";
            break;
        case "help":
            command_history = command_history + "</br> ls: list all events </br> cd [event]: enter an event (type the first couple of letters and hit enter to autocomplete)</br> info: display further information about the selected event or subevent </br> color: change the color of the selected event </br> email: open a window to send an email to Victor </br> resume: open Victor's resume </br> linkedin: open Victor's LinkedIn profile </br> github: open Victor's Github profile </br> browser [site url]: open the selected site </br> clear: clear the current screen </br> refresh: refresh the page </br> tourguide: activate this site's auto touring function </br> exit: exit this terminal </br>"
            break;
        default:
            command_history = command_history + "</br> '" + current_command + "' is not a valid command. </br>";
            break;
    }
    
    current_command = "";
    printDialogue();
}

function guide() {
    if (guide_active != -1) {
        $('html, body').animate({
            scrollTop: $(events[guide_active]).children(".icon-wrapper").eq(0).offset().top - parseInt($(events[guide_active]).children(".icon-wrapper").eq(0).css("margin-top"))
        }, 2000);

        if (++guide_active < events.length) {
            setTimeout(guide, 3000);
        }
    }
}

function printDialogue() {
    command_history = command_history + "vickyd:" + current_folder + " vickyd$ ";
    updateText();
}

function parsePage() {
    $(".event").each(function() {
        events.push(this);
    });
}