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

    const State = {
        STOPPED: 0,
        RUNNING: 1,
        PAUSED: 2
    }
  
    buttonStart.onclick = function() {
        if (state == State.STOPPED) {
            clearInterval(Interval);
            Interval = setInterval(updateTimer, 1000);
            buttonStart.innerHTML = "Pause";
            state = State.RUNNING;
            totalSeconds = 0;
        } else if (state == State.RUNNING) {
            clearInterval(Interval);
            buttonStart.innerHTML = "Resume";
            state = State.PAUSED;
        } else if (state == State.PAUSED) {
            Interval = setInterval(updateTimer, 1000);
            buttonStart.innerHTML = "Pause";
            state = State.RUNNING;
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
        var seconds = totalSeconds % 60;
        var minutes = Math.floor(totalSeconds / 60) % 60;
        var hours = Math.floor(totalSeconds / 3600);

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