const parent = document.getElementById('project-data');
const canvas = document.getElementById('canvas');
const dataDiv = document.getElementById('heatmap-data');
const data = parseData();

const ctx = canvas.getContext('2d');
window.addEventListener('resize', resizeCanvas, false);

const day = 24 * 60 * 60 * 1000;
const year = 365 * day;
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let squareSize = 15;
let gap = 2;

const color1 = "#DEF9F3"; // Red
const color2 = "#0F5244"; // Green


function getStartDate() {
    let today = new Date();
    let startDate = today - (1 * year);
    startDate = startDate - (new Date(startDate)).getDay() * day;
    return new Date(startDate);
}

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

function draw() {
    let dayNum = 0;
    let startDate = getStartDate();
    let endDate = new Date();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let numDays = Math.ceil((endDate - startDate) / day);
    let numCols = Math.ceil(numDays / 7);
    squareSize = (canvas.width - (numCols - 1) * (gap)) / numCols;
    
    while (startDate <= endDate) {

        if (data.has(formatDateToYYYYMMDD(startDate))) {
            ctx.fillStyle = interpolateColor(color1, color2, .8);
        } else {
            ctx.fillStyle = interpolateColor(color1, color2, 0);
        }
        ctx.fillRect(Math.floor(dayNum / 7) * (squareSize + gap), 30 + dayNum % 7 * (squareSize + gap), squareSize, squareSize);
        if (startDate.getDay() == 0 && startDate.getDate() <= 7 && Math.floor(dayNum / 7) < numCols - 1) {
            ctx.font = "bold " + squareSize + "px serif";;
            ctx.fillText(monthNames[startDate.getMonth()], Math.floor(dayNum / 7) * (squareSize + gap), 20);
        } 
        startDate = new Date(startDate.getTime() + day);
        dayNum++;
    }

    console.log(formatDateToYYYYMMDD(startDate));
}

function resizeCanvas() {
    canvas.width = parent.offsetWidth - 24;
    canvas.height = 500;
    draw();
}

function parseData() {
    let data = dataDiv.attributes["data-data"].nodeValue;
    return new Map(JSON.parse(data).map(tuple => [tuple[0], tuple[1]]));
}

function interpolateColor(color1, color2, value) {
    // Convert color strings to RGB arrays
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
  
    // Interpolate between the RGB values
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * value);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * value);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * value);
  
    // Convert the interpolated RGB values back to a hex color
    return rgbToHex(r, g, b);
  }
  
  function hexToRgb(hex) {
    // Remove the '#' if it exists
    hex = hex.replace(/^#/, '');
  
    // Parse the hex color components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
  
    return { r, g, b };
  }
  
  function rgbToHex(r, g, b) {
    // Convert RGB components to hex values and concatenate them
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }

resizeCanvas();
