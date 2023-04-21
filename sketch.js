/*
States:
0 -> start page
1 -> instructions
2 -> question page
3 -> correct
4 -> no answer
5 -> wrong
6 -> results
7 -> recommendations
8 -> leaderboard
 */


var state = 0
var frameSpeed = 20;
var timer = new BarTimer();
var tvHeight = 1080;
var tvWidth = 1920;
timer.setTime(5, frameSpeed)

function setup() {
  let displayCanvas = createCanvas(tvWidth, tvHeight);
  displayCanvas.parent("#canvas-container");
  frameRate(frameSpeed);
}

function draw() {
  switch (state) {
    case 0:
      setStartPage();
      timer.draw(x=400);
      // if(newTimer.finished()){
      //   state = 1;
      // }
      break;
    case 1:
      setInstructions(0);
      break;
    case 2:
      setQuestion(0);
      break;
    case 3:
      setCorrect(0);
      break;
    case 4:
      setNoAnswer(0);
      break;
    case 5:
      setWrong(0);
      break;
    case 6:
      setResults(0);
      break;
    case 7:
      setRecommendations(0);
      break;
    case 8:
      setLeaderboard(0);
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

function writeTextCenter(str = "Placeholder", style = "normal", color = "#000000", font = "Montserrat", size = 25, x = tvWidth/2, y = 40){
  if(style == "normal"){
    textStyle(NORMAL);
  }
  else if(style == "bold"){
    textStyle(BOLD);
  }
  fill(color);
  textFont(font);
  textSize(size);
  textAlign(CENTER);
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
  drawCircle(600, "#FFD154", tvWidth - 600, 0);
  // pink
  drawCircle(600, "#FF8AA6", tvWidth - 600, 0);
  // orange
  drawCircle(600, "#ffa776", tvWidth - 600, 0);

}

function setInstructions(){
  state = 1;
  background("#fffff");
  textFont("Helvetica");
  let v_margin = 60;
  let h_margin = 60;

  // blue
  drawCircle(400, "#74A9FF", tvWidth - 225, -30);
  // yellow
  drawCircle(400, "#FFD154", tvWidth - 1400, -30);
  // pink
  drawCircle(400, "#FF8AA6", tvWidth - 1600, 180);
  // purple
  drawCircle(400, "#A873F2", tvWidth - 100, 900);

  writeTextCenter("Instructions", "bold", "#000000", "Montserrat", 80, tvWidth/2, 70 + v_margin);

  writeTextCenter("You will complete a short quiz on a variety of computer", "normal", "#000000", "Montserrat", 30, tvWidth/2, 200 + v_margin);
  writeTextCenter("science topics, using your arms to select responses.", "normal", "#000000", "Montserrat", 30, tvWidth/2, 250 + v_margin);

  writeTextCenter("The correctness of your response and the time it", "normal", "#000000", "Montserrat", 30, tvWidth/2, 350 + v_margin);
  writeTextCenter("takes you to respond will contribute to your score.", "normal", "#000000", "Montserrat", 30, tvWidth/2, 400 + v_margin);

  writeTextCenter("At the end, your performance will be ranked, and you", "normal", "#000000", "Montserrat", 30, tvWidth/2, 500 + v_margin);
  writeTextCenter("will be provided with a list of resources to learn more.", "normal", "#000000", "Montserrat", 30, tvWidth/2, 550 + v_margin);
}

function setQuestion(){
  state = 2;
  background("#fffff");
  textFont("Helvetica");
  let v_margin = 60;
  let h_margin = 60;

  // purple
  drawCircle(400, "#A873F2", tvWidth - 250, -70);
  // blue
  drawCircle(400, "#74A9FF", tvWidth - 1400, 750);
  // yellow
  drawCircle(400, "#FFD154", tvWidth - 1100, 900);

  writeText("Question 1/5", "bold", "#000000", "Montserrat", 80, 10 + h_margin, 70 + v_margin);
  writeText("Lorem ipsum dolor blah blah blah", "normal", "#000000", "Montserrat", 30, 10 + h_margin, 150 + v_margin);

  // Option A
  writeText("Option A", "bold", "#000000", "Montserrat", 40, 800 + h_margin, 70 + v_margin);
  writeText("Hold right arm up", "normal", "#000000", "Montserrat", 40, 800 + h_margin, 70 + v_margin);

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