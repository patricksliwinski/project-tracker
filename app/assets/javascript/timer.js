timer = function () {
    
    var displayHours = document.getElementById("hours");
    var displayMinutes = document.getElementById("minutes")
    var displaySeconds = document.getElementById("seconds")
    var button = document.getElementById("timer")
    var session_form = document.getElementById('session-form');
    var session_time_input = document.getElementById('new-session-time');
    var Interval;
    var startTime = Date.now()
    var state = 0;
    var totalSeconds = 0

    const State = {
        STOPPED: 0,
        RUNNING: 1,
    }
  
    button.onclick = function() {
        if (state == State.STOPPED) {
            clearInterval(Interval);
            Interval = setInterval(updateTimer, 1000);
            state = State.RUNNING;
            totalSeconds = 0;
        } else if (state == State.RUNNING) {
            session_time_input.value = totalSeconds;    
            session_form.submit();
            
            state = State.STOPPED;
            clearInterval(Interval);
            totalSeconds = 0
            displayHours.innerHTML = "00";
            displayMinutes.innerHTML = "00";
            displaySeconds.innerHTML = "00";
        }
    }
    
    function updateTimer () {
        totalSeconds = Math.floor((Date.now() - startTime) / 1000);
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

timer();