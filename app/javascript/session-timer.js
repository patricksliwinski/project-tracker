window.onload = function () {
    
    var totalSeconds = 0;
    var displayHours = document.getElementById("hours");
    var displayMinutes = document.getElementById("minutes")
    var displaySeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonEnd = document.getElementById('button-end');
    var buttonReset = document.getElementById('button-reset');
    var session_form = document.getElementById('session-form');
    var session_time_input = document.getElementById('new-session-time');
    var Interval;
    var state = 0;
    var startDate = null;
  
    buttonStart.onclick = function() {
        if (state == 0) {
            clearInterval(Interval);
            Interval = setInterval(updateTimer, 1000);
            buttonStart.innerHTML = "Pause";
            state = 1;
            startDate = new Date();
        } else if (state == 1) {
            clearInterval(Interval);
            buttonStart.innerHTML = "Resume";
            state = 2;
        } else if (state == 2) {
            Interval = setInterval(updateTimer, 1000);
            buttonStart.innerHTML = "Pause";
            state = 1;
        }
    }
    
    buttonEnd.onclick = function() {
        session_time_input.value = totalSeconds;    
        session_form.submit();

        clearInterval(Interval);
        totalSeconds = 0
        displayHours.innerHTML = "00";
        displayMinutes.innerHTML = "00";
        displaySeconds.innerHTML = "00";
    }
    
    buttonReset.onclick = function() {
        clearInterval(Interval);
        totalSeconds = 0
        displayHours.innerHTML = "00";
        displayMinutes.innerHTML = "00";
        displaySeconds.innerHTML = "00";
    }
    
    function updateTimer () {
        totalSeconds++;
        seconds = totalSeconds % 60;
        minutes = Math.floor(totalSeconds / 60) % 60;
        hours = Math.floor(totalSeconds / 3600);

        if(seconds <= 9) {
            displaySeconds.innerHTML = "0" + seconds;
        } else {
            displaySeconds.innerHTML = seconds;
        }

        if (minutes <= 9) {
            displayMinutes.innerHTML = "0" + minutes;
        } else {
            displayMinutes.innerHTML = minutes;
        }

        if (hours <= 9) {
            displayHours.innerHTML = "0" + hours;
        } else {
            displayHours.innerHTML = hours;
        }
    }
}