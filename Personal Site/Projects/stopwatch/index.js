// ClickTime Software Development Intern Quiz
// Question 3
// Victor Dadfar
// 11/2/16

var interval = 15; //Refresh rate (ms)

var countTarget = 0; //Current target
var timer1;          //Timer 1 interval, pause state, pause progress, start value
var pause1 = 0;
var start1;
var paused1 = true;
var timer2;          //Timer 2 interval, pause state, pause progress, start value
var pause2 = 0;
var start2;
var paused2 = true;

var bgcolor = "#34495e"; //Background color
var color1 = "#4f6f8f"; //Timer 1 color
var color2 = "#4f6f8f"; //Timer 2 color

//Initial function to append event handlers
$(document).ready(function() {
    countTarget = 30;

    $(".reset").on("click", function() {
        var num = parseInt($(this).attr("id"));
        reset(num);
    });

    $(".start").on("click", function() {
        var num = parseInt($(this).attr("id"));
        startstop(num);
    });

    $(".inputfield").submit(function(e) {
        e.preventDefault();
        changeTarget();
    })
});

//Main logic loop for timer 1
function loop1() {
    var current = Date.now();
    var actual = (current - start1)/1000.0; //Gets current time and subtracts from when timer began

    actual *= (360/countTarget);            //Actual is always between 0 and 360, velocity depending on countTarget

    display = (actual/360) * countTarget;

    if (actual <= 360) {
        $("#time1").html(convertTo(display)); //Formatting text for days,hours,minutes,seconds
    }

    //Displays circular progress bar
    if (actual < 180) {                     //Due to nature of linear-gradient, require two seperate methods depending on value of actual
        $("#outer1").css("background-image", "linear-gradient(" + (90 + actual) + "deg, transparent 50%, " + bgcolor + " 50%), linear-gradient(90deg, " + bgcolor + " 50%, transparent 50%)");
    } else if (actual <= 360) {
        $("#outer1").css("background-image", "linear-gradient(" + (actual - 90) + "deg, transparent 50%, " + color1 + " 50%), linear-gradient(90deg, " + bgcolor + " 50%, transparent 50%)");
    } else {                                //If timer has reached end (actual > 360)
        clearInterval(timer1);

        //Update timer one last time
        display = countTarget;  
        $("#time1").html(convertTo(display));
        $("#outer1").css("background-image", "linear-gradient(270deg, transparent 50%, " + color1 + " 50%), linear-gradient(90deg, " + bgcolor + " 50%, transparent 50%)");

        $(".start1").addClass("inactive");
    }
}

//Main logic loop for timer 2, almost identical to 1 save for a couple arithmetic differences
function loop2() {
    var current = Date.now();
    var actual = (current - start2)/1000.0; //Gets current time and subtracts from when timer began

    actual *= (360/countTarget);            //Actual is always between 0 and 360, velocity depending on countTarget
    actual = 360 - actual;

    display = (actual/360) * countTarget;   

    if (actual >= 0) {
        $("#time2").html(convertTo(display)); //Formatting text for days,hours,minutes,seconds
    }

    //Displays circular progress bar
    if (actual > 180) {                     //Due to nature of linear-gradient, require two seperate methods depending on value of actual
        $("#outer2").css("background-image", "linear-gradient(" + (actual - 90) + "deg, transparent 50%, " + color2 + " 50%), linear-gradient(90deg, " + bgcolor + " 50%, transparent 50%)");
    } else if (actual >= 0) {
        $("#outer2").css("background-image", "linear-gradient(" + (90 + actual) + "deg, transparent 50%, " + bgcolor + " 50%), linear-gradient(90deg, " + bgcolor + " 50%, transparent 50%)");
    } else {                                //If timer has reached end (actual > 360)
        clearInterval(timer2);

        //Update timer one last time
        display = 0;
        $("#time2").html(convertTo(display));
        $("#outer2").css("background-image", "linear-gradient(90deg, transparent 50%, " + bgcolor + " 50%), linear-gradient(90deg, " + bgcolor + " 50%, transparent 50%)");

        $(".start2").addClass("inactive");
    }
}

//Resets either timer 1 or 2 and sets state to pause
function reset(num) {
    if (num == 1) {
        //Clears interval, sets pause to true, activates start/pause button 
        pause1 = 0;
        clearInterval(timer1);
        paused1 = true;
        $(".start1").removeClass("inactive");

        //Updates timer to display reset
        display = 0;
        $("#time1").html(convertTo(display));
        $("#outer1").css("background-image", "linear-gradient(90deg, transparent 50%, " + bgcolor + " 50%), linear-gradient(90deg, " + bgcolor + " 50%, transparent 50%)");
    } else {
        //Clears interval, sets pause to true, activates start/pause button 
        pause2 = 0;
        clearInterval(timer2);
        paused2 = true;
        $(".start2").removeClass("inactive");

        //Updates timer to display reset
        display = countTarget;
        $("#time2").html(convertTo(display));
        $("#outer2").css("background-image", "linear-gradient(270deg, transparent 50%, " + color1 + " 50%), linear-gradient(90deg, " + bgcolor + " 50%, transparent 50%)");
    }
    $("#sp" + num).text("Start"); //Changes text on start/pause button to start
}

//Either starts or pauses timer 1 or 2
function startstop(num) {
    if (!$(".start" + num).hasClass("inactive")) {  //If the start/pause button is active
        if (num == 1) {
            if (!paused1) {                         //If the timer is not paused
                pause1 = Date.now() - start1;       //Record progress
                clearInterval(timer1);              //Terminate logic loop
                paused1 = true;                     //Pause timer
                $("#sp" + num).text("Start");       //Change text
            } else {                                //If the timer is paused
                start1 = Date.now() - pause1;       //Adds back progress from earlier
                timer1 = setInterval(loop1, interval); //Activates logic loop
                paused1 = false;                    //Unpauses timer
                $("#sp" + num).text("Pause");       //Change text
            }
        } else {                                    //Same as above, now for timer 2
            if (!paused2) {
                pause2 = Date.now() - start2;
                clearInterval(timer2);
                paused2 = true;
                $("#sp" + num).text("Start");
            } else {
                start2 = Date.now() - pause2;
                timer2 = setInterval(loop2, interval);
                paused2 = false;
                $("#sp" + num).text("Pause");
            }
        }
    }
}

//Changes countTarger to the new inputted value
function changeTarget() {
    var newTarget = parseFloat($('.max').val()).toFixed(2); //Cuts off to two decimal points
    if (!isNaN(newTarget) && newTarget >= 0) {               //If the new target is not NaN and not negative
        countTarget = newTarget;
        reset(1);                                            //Resets both timers
        reset(2);
    }
}

//Converts time in seconds to time in days/hours/minutes/seconds
function convertTo(time) {
    var days = Math.floor(time / (60 * 60 * 24));
    var hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((time % (60 * 60)) / 60);
    var seconds = (time % 60);

    return days.toFixed(0) + "</br>" + hours.toFixed(0) + "</br>" + minutes.toFixed(0) + "</br>" + seconds.toFixed(1); 
}