heatmap = function() {
    var heatmapParent = document.getElementById('project-data');
    var heatmapCanvas = document.getElementById('canvas');
    var heatmapDataDiv = document.getElementById('heatmap-data');
    var heatmapData = parseHeatmap();

    var heatmapCtx = heatmapCanvas.getContext('2d');
    window.addEventListener('resize', resizeHeatmap, false);

    var day = 24 * 60 * 60 * 1000;
    var year = 365 * day;
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var gap = 2;

    var color1 = "#DEF9F3"; // Red
    var color2 = "#0F5244"; // Green

    var dayNum = 0;
    var startDate = getStartDate();
    var endDate = new Date();

    var numDays = Math.ceil((endDate - startDate) / day);
    var numCols = Math.ceil(numDays / 7);
    var squareSize = (heatmapCanvas.width - (numCols - 1) * (gap)) / numCols;


    function getStartDate(num_months = 12) {
        var startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - Math.floor(num_months / 12));
        startDate.setMonth(startDate.getMonth() - num_months % 12);
        startDate = startDate - (new Date(startDate)).getDay() * day;
        return new Date(startDate);
    }

    function formatDateToYYYYMMDD(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        var day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }

    function drawHeatmap() {
        heatmapCtx.clearRect(0, 0, heatmapCanvas.width, heatmapCanvas.height);
        
        while (startDate <= endDate) {

            if (heatmapData.has(formatDateToYYYYMMDD(startDate))) {
                heatmapCtx.fillStyle = interpolateColor(color1, color2, .8);
            } else {
                heatmapCtx.fillStyle = interpolateColor(color1, color2, 0);
            }
            heatmapCtx.fillRect(Math.floor(dayNum / 7) * (squareSize + gap), 30 + dayNum % 7 * (squareSize + gap), squareSize, squareSize);
            if (startDate.getDay() == 0 && startDate.getDate() <= 7 && Math.floor(dayNum / 7) < numCols - 1) {
                heatmapCtx.font = "bold " + squareSize + "px serif";;
                heatmapCtx.fillText(monthNames[startDate.getMonth()], Math.floor(dayNum / 7) * (squareSize + gap), 20);
            } 
            startDate = new Date(startDate.getTime() + day);
            dayNum++;
        }

        console.log(formatDateToYYYYMMDD(startDate));
    }

    function resizeHeatmap() {
        heatmapCanvas.width = heatmapParent.offsetWidth - 24;

        num_months = 12;
        if (heatmapCanvas.width < 700) {
            num_months = 6;
        }

        dayNum = 0;
        startDate = getStartDate(num_months);
        endDate = new Date();

        numDays = Math.ceil((endDate - startDate) / day);
        numCols = Math.ceil(numDays / 7);
        squareSize = (heatmapCanvas.width - (numCols - 1) * (gap)) / numCols;

        heatmapCanvas.height = 30 + 7 * (squareSize + gap);
        drawHeatmap();
    }

    function parseHeatmap() {
        var data = heatmapDataDiv.attributes["data-data"].nodeValue;
        return new Map(JSON.parse(data).map(tuple => [tuple[0], tuple[1]]));
    }

    function interpolateColor(color1, color2, value) {
        // Convert color strings to RGB arrays
        var rgb1 = hexToRgb(color1);
        var rgb2 = hexToRgb(color2);
    
        // Interpolate between the RGB values
        var r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * value);
        var g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * value);
        var b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * value);
    
        // Convert the interpolated RGB values back to a hex color
        return rgbToHex(r, g, b);
    }
    
    function hexToRgb(hex) {
        // Remove the '#' if it exists
        hex = hex.replace(/^#/, '');
    
        // Parse the hex color components
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
    
        return { r, g, b };
    }
    
    function rgbToHex(r, g, b) {
        // Convert RGB components to hex values and concatenate them
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    }

    resizeHeatmap();
}

heatmap();
