var timelineParent = document.getElementById('project-data');
var timelineCanvas = document.getElementById('timeline-canvas');
var timelineDataDiv = document.getElementById('timeline-data');
var timelineData = parseTimeline();

var timelineCtx = timelineCanvas.getContext('2d');
window.addEventListener('resize', resizeTimeline, false);

const eventGap = 120;

timelineCanvas.addEventListener('click', function(e) {
    let canvasUrl = timelineCanvas.toDataURL();
    const tempLink = document.createElement('a');
    tempLink.href = canvasUrl;
    tempLink.download = "timeline";
    tempLink.click();
    tempLink.remove();
})

function drawTimeline() {
    timelineCtx.strokeStyle = "#2ed8b6";
    timelineCtx.fillStyle = "#2ed8b6";
    timelineCtx.clearRect(0, 0, timelineCanvas.width, timelineCanvas.height);
    timelineCtx.lineWidth = 5;

    
    for (var i = 0; i < timelineData.length; i++) {
        var centerY = 50 + i * eventGap;
        timelineCtx.beginPath();
        timelineCtx.moveTo(timelineCanvas.width / 2, centerY);
        timelineCtx.arc(timelineCanvas.width / 2, centerY, 20, 0, 2 * Math.PI);
        timelineCtx.moveTo(timelineCanvas.width / 2, centerY);
        timelineCtx.lineTo(timelineCanvas.width / 2, centerY + eventGap);
        timelineCtx.fill();
        timelineCtx.stroke();
        timelineCtx.font = "bold 20px serif";
        timelineCtx.fillText(timelineData[i][0], timelineCanvas.width / 2 + 30, centerY + 5);
        timelineCtx.font = "20px serif";
        timelineCtx.fillText(timelineData[i][1].substring(0, 10), timelineCanvas.width / 2 + 30, centerY + 30);
        if (timelineData[i][2]) {
            timelineCtx.fillText(timelineData[i][2], timelineCanvas.width / 2 + 30, centerY + 55);
        }
    }

}

function resizeTimeline() {
    timelineCanvas.width = timelineParent.offsetWidth - 24;
    timelineCanvas.height = timelineData.length * 120 + 200;
    drawTimeline();
}

function parseTimeline() {
    var data = timelineDataDiv.attributes["data-data"].nodeValue;
    return JSON.parse(data);
}


resizeTimeline();
