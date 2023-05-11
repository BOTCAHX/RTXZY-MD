function startTimer(duration, display) {
    var timer = duration, days, hours, minutes, seconds;
    setInterval(function () {
        days = parseInt(timer / 86400, 10);
        hours = parseInt((timer % 86400) / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        days = days < 10 ? "0" + days : days;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        display.textContent = days + " days " + hours + ":" + minutes + ":" + seconds;
        
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var thirtyDays = 2592000, // 30 days in seconds
        display = document.querySelector('#time');
    startTimer(thirtyDays, display);
};
