const timelineParent = document.getElementById('project-data');
const timelineCanvas = document.getElementById('timeline-canvas');
const timelineDataDiv = document.getElementById('timeline-data');
const timelineData = parseTimeline();
console.log(timelineData);

const timelineCtx = timelineCanvas.getContext('2d');
window.addEventListener('resize', resizeTimeline, false);


function drawTimeline() {
    timelineCtx.strokeStyle = "#0F5244";
    timelineCtx.fillStyle = "#0F5244";
    timelineCtx.clearRect(0, 0, timelineCanvas.width, timelineCanvas.height);
    timelineCtx.lineWidth = 5;

    
    for (let i = 0; i < timelineData.length; i++) {
        let centerY = 50 + i * 100;
        timelineCtx.beginPath();
        timelineCtx.moveTo(timelineCanvas.width / 2, centerY);
        timelineCtx.arc(timelineCanvas.width / 2, centerY, 20, 0, 2 * Math.PI);
        timelineCtx.moveTo(timelineCanvas.width / 2, centerY);
        timelineCtx.lineTo(timelineCanvas.width / 2, centerY + 100);
        timelineCtx.fill();
        timelineCtx.stroke();
        timelineCtx.font = "bold 20px serif";
        timelineCtx.fillText(timelineData[i][0], timelineCanvas.width / 2 + 30, centerY + 5);
        timelineCtx.font = "20px serif";
        timelineCtx.fillText(timelineData[i][1].substring(0, 10), timelineCanvas.width / 2 + 30, centerY + 30);
    }

}

function resizeTimeline() {
    timelineCanvas.width = timelineParent.offsetWidth - 24;
    timelineCanvas.height = timelineData.length * 100 + 200;
    drawTimeline();
}

function parseTimeline() {
    let data = timelineDataDiv.attributes["data-data"].nodeValue;
    return JSON.parse(data);
}


resizeTimeline();
