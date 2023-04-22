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
var img;
timer.setTime(2, frameSpeed);

function setup() {
  let displayCanvas = createCanvas(tvWidth, tvHeight);
  img = loadImage('https://i.ibb.co/QjF7Ssn/image-1.png');
  displayCanvas.parent("#canvas-container");
  frameRate(frameSpeed);
}

function draw() {
  switch (state) {
    case 0:
      setStartPage();
      timer.length = 850;
      timer.height = 70;
      timer.setCoords(180, 680);
      timer.draw();
      if(timer.finished()){
        state = 1;
      }
      break;
    case 1:
      setInstructions();
      break;
    case 2:
      setQuestion();
      break;
    case 3:
      setCorrect();
      break;
    case 4:
      setNoAnswer();
      break;
    case 5:
      setWrong();
      break;
    case 6:
      setResults();
      break;
    case 7:
      setRecommendations();
      break;
    case 8:
      setLeaderboard();
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
  let v_margin = 120;
  let h_margin = 100;

  // yellow
  drawCircle(800, "#FFD154", tvWidth - 325, -85);
  // pink
  drawCircle(800, "#FF8AA6", tvWidth + 40, 340);
  // orange
  drawCircle(800, "#ffa776", tvWidth - 50, 50);
  // blue
  drawCircle(650, "#74A9FF", tvWidth - 550, tvHeight + 100);

  // cpsc text
  writeText("CPSC 484", "bold", "#000000", "Montserrat", 60, tvWidth - 710, tvHeight - 70)

  // title text
  writeText("Want to test your", "bold", "#000000", "Montserrat", 120, 10 + h_margin, 70 + v_margin);
  writeText("CS knowledge?", "bold", "#000000", "Montserrat", 120, 60 + h_margin, 200 + v_margin);

  // subtext
  writeText("Raise your hand to begin.", "normal", "#000000", "Montserrat", 65, 120 + h_margin, 300 + v_margin);
  writeText("Keep it raised until the bar is full!", "normal", "#000000", "Montserrat", 40, 200 + h_margin, 700 + v_margin);

  let imgSize = 70;
  image(img, 350 + h_margin, 350 + v_margin, 4*imgSize, 3*imgSize);
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