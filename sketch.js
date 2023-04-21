/*
States:
0 -> start page
1 -> instructions
2 -> question page
3 -> correct
4 -> no answer
5 -> wrong
6 -> review
7 -> recommendations
8 -> leaderboard
 */

var state = 0

function setup() {
  let displayCanvas = createCanvas(windowWidth, windowHeight);
  displayCanvas.parent("#canvas-container");
  frameRate(3);
}

function draw() {
  switch (state) {
    case 0:
      setStartPage();
      break;
    case 1:
      background(0);
      break;
    case 2:
      background(0);
      break;
    case 3:
      background(0);
      break;
    case 4:
      background(0);
      break;
    case 5:
      background(0);
      break;
    case 6:
      background(0);
      break;
    case 7:
      background(0);
      break;
    case 9:
      background(0);
      break;
    default:
      break;
  }
}

function writeText(str = "Placeholder", style = "normal", color = "#000000", font = "Montserrat", size = 25, x = 20, y = 40){
  if(style == "normal"){
    textStyle(NORMAL);
  }
  else if(style == "bold"){
    textStyle(BOLD);
  }
  fill(color);
  textFont(font);
  textSize(size);
  text(str, x, y);
}

function drawCircle(size = 30, color = "#a8a8a8", x = 0, y = 0){
  noStroke();
  fill(color);
  circle(x, y, size);
}

function setStartPage() {
  state = 0;
  background("#fffff");
  textFont("Helvetica");
  let v_margin = 60;
  let h_margin = 60;

  // yellow
  drawCircle(400, "#FFD154", windowWidth - 200, -30);
  // pink
  drawCircle(400, "#FF8AA6", windowWidth + 40, 180);
  // orange
  drawCircle(400, "#ffa776", windowWidth - 50, 0);

  writeText("Want to test your", "bold", "#000000", "Montserrat", 75, 10 + h_margin, 70 + v_margin);
  writeText("CS Knowledge?", "bold", "#000000", "Montserrat", 75, 40 + h_margin, 140 + v_margin);
}

function setInstructions(){
  background(0);
}
function setQuestion(){
  background(0);
}
function setCorrect(){
  background(0);
}
function setNoAnswer(){
  background(0);
}
function setWrong(){
  background(0);
}
function setResults(){
  background(0);
}
function setRecommendations(){
  background(0);
}
function setLeaderboard(){
  background(0);
}