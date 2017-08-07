var current_command = new String("");
var command_history = new String("");
var cursor_state = true;

var events = [];
var subevents = [];

var current_folder = "";
var home_folder = "Personal Site";

$(document).keypress(function(e) {
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
        $(".code").html(command_history + current_command); 
    }
    
    $(".code").scrollTop(document.getElementsByClassName("code")[0].scrollHeight);
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
                    found = true;
                }
            });
            
            if (found == false && folder.localeCompare("..") == 0) {
                current_folder = home_folder;
                found = true;
            }
            
            if (found == false) {
                command_history = command_history + "</br> '" + folder + "' is not a valid folder. ";
            }
            
            command_history = command_history + "</br>";
            
            break;
        default:
            command_history = command_history + "</br> '" + current_command + "' is not a valid command. </br> ";
            break;
    }
    
    current_command = "";
    printDialogue();
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