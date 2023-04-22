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


var state = 3
var frameSpeed = 20;
var timer = new BarTimer();
var tvHeight = 1080;
var tvWidth = 1920;
var img;
timer.setTime(5, frameSpeed)

function setup() {
  let displayCanvas = createCanvas(tvWidth, tvHeight);
  img = createImg('https://i.ibb.co/QjF7Ssn/image-1.png');
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

function drawRectangle(x = 0, y = 0, height = 300, width = 50, color = '#a8a8a8'){
  noStroke();
  fill(color);
  rect(x, y, height, width, 20);
}

// Borrowed from https://p5js.jp/examples/form-star.html
function star(x, y, radius1, radius2, npoints, color) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  fill(color);
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawStars(num, color, start, y){
  x = start;
  for (let i = 0; i < num; i++){
    star(x, y, 12, 22, 5, color);
    x += 60;
  }
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

  writeText("Want to test your", "bold", "#000000", "Montserrat", 80, 10 + h_margin, 70 + v_margin);
  writeText("CS knowledge?", "bold", "#000000", "Montserrat", 80, 40 + h_margin, 140 + v_margin);

  writeText("Raise your hand to begin.", "normal", "#000000", "Montserrat", 50, 25 + h_margin, 225 + v_margin);
  writeText("Keep it raised until the bar is full!", "normal", "#000000", "Montserrat", 40, 75 + h_margin, 700 + v_margin);

  img.position(275 + h_margin, 300 + v_margin);

}

function setInstructions(){
  state = 1;
  background("#fffff");
  let v_margin = 60;
  let h_margin = 60;

  // blue
  drawCircle(600, "#74A9FF", tvWidth - 225, -30);
  // yellow
  drawCircle(600, "#FFD154", tvWidth - 1700, -30);
  // pink
  drawCircle(600, "#FF8AA6", tvWidth - 1900, 180);
  // purple
  drawCircle(600, "#A873F2", tvWidth - 100, 1200);

  writeTextCenter("Instructions", "bold", "#000000", "Montserrat", 120, tvWidth/2, 150 + v_margin);

  writeTextCenter("You will complete a short quiz on a variety of", "normal", "#000000", "Montserrat", 50, tvWidth/2, 300 + v_margin);
  writeTextCenter("computer science topics, using your arms to", "normal", "#000000", "Montserrat", 50, tvWidth/2, 350 + v_margin);
  writeTextCenter("select responses.", "normal", "#000000", "Montserrat", 50, tvWidth/2, 400 + v_margin);

  writeTextCenter("The correctness of your response and the time it", "normal", "#000000", "Montserrat", 50, tvWidth/2, 550 + v_margin);
  writeTextCenter("takes you to respond will contribute to your score.", "normal", "#000000", "Montserrat", 50, tvWidth/2, 600 + v_margin);

  writeTextCenter("At the end, your performance will be ranked, and you", "normal", "#000000", "Montserrat", 50, tvWidth/2, 750 + v_margin);
  writeTextCenter("will be provided with a list of resources to learn more.", "normal", "#000000", "Montserrat", 50, tvWidth/2, 800 + v_margin);
}

function setQuestion(){
  state = 2;
  background("#fffff");
  let v_margin = 60;
  let h_margin = 60;

  // purple
  drawCircle(500, "#A873F2", tvWidth - 200, -100);
  // blue
  drawCircle(600, "#74A9FF", tvWidth - 1800, 1050);
  // yellow
  drawCircle(500, "#FFD154", tvWidth - 1350, 1100);

  // Question
  writeText("Question 1/5", "bold", "#000000", "Montserrat", 100, 40 + h_margin, 100 + v_margin);
  writeText("Lorem ipsum dolor blah blah blah", "normal", "#000000", "Montserrat", 40, 40 + h_margin, 200 + v_margin);

  // Option A
  writeText("Option A", "bold", "#000000", "Montserrat", 60, 1100 + h_margin, 100 + v_margin);
  writeText("Hold right arm up", "normal", "#000000", "Montserrat", 40, 1060 + h_margin, 150 + v_margin);

  // Option B
  writeText("Option B", "bold", "#000000", "Montserrat", 60, 800 + h_margin, 400 + v_margin);
  writeText("Hold right arm left", "normal", "#000000", "Montserrat", 40, 750 + h_margin, 450 + v_margin);

  // Option C
  writeText("Option C", "bold", "#000000", "Montserrat", 60, 1400 + h_margin, 400 + v_margin);
  writeText("Hold right arm right", "normal", "#000000", "Montserrat", 40, 1340 + h_margin, 450 + v_margin);

  // Option D
  writeText("Option D", "bold", "#000000", "Montserrat", 60, 1100 + h_margin, 700 + v_margin);
  writeText("Hold right arm down", "normal", "#000000", "Montserrat", 40, 1040 + h_margin, 750 + v_margin);

  // Timer
  writeText("120", "bold", "#000000", "Montserrat", 100, tvWidth - 1825, 975);

  // Exit
  writeText("Exit", "bold", "#000000", "Montserrat", 60, tvWidth - 1410, 950);
  writeText("Raise left arm.", "normal", "#000000", "Montserrat", 40, tvWidth - 1490, 1000);

}

function setCorrect(){
  state = 3;
  background("#fffff");
  let v_margin = 60;
  let h_margin = 60;

  // purple
  drawCircle(500, "#A873F2", tvWidth - 200, -100);
  // blue
  drawCircle(600, "#74A9FF", tvWidth - 1800, 1050);
  // yellow
  drawCircle(500, "#FFD154", tvWidth - 1350, 1100);

  // Feedback
  writeText("Correct!", "bold", "#000000", "Montserrat", 150, 40 + h_margin, 350 + v_margin);
  writeText("+5000 Pts", "bold", "#000000", "Montserrat", 100, 40 + h_margin, 450 + v_margin);

  // Option A
  writeText("Option A", "bold", "#CACACA", "Montserrat", 60, 1100 + h_margin, 100 + v_margin);
  writeText("Hold right arm up", "normal", "#CACACA", "Montserrat", 40, 1060 + h_margin, 150 + v_margin);

  // Option B
  writeText("Option B", "bold", "#CACACA", "Montserrat", 60, 800 + h_margin, 400 + v_margin);
  writeText("Hold right arm left", "normal", "#CACACA", "Montserrat", 40, 750 + h_margin, 450 + v_margin);

  // Option C
  writeText("Option C", "bold", "#CACACA", "Montserrat", 60, 1400 + h_margin, 400 + v_margin);
  writeText("Hold right arm right", "normal", "#CACACA", "Montserrat", 40, 1340 + h_margin, 450 + v_margin);

  // Option D
  writeText("Option D", "bold", "#A7D8AC", "Montserrat", 60, 1100 + h_margin, 700 + v_margin);
  writeText("Hold right arm down", "normal", "#A7D8AC", "Montserrat", 40, 1040 + h_margin, 750 + v_margin);
}

function setNoAnswer(){
  state = 4;
  background("#fffff");
  let v_margin = 60;
  let h_margin = 60;

  // purple
  drawCircle(500, "#A873F2", tvWidth - 200, -100);
  // blue
  drawCircle(600, "#74A9FF", tvWidth - 1800, 1050);
  // yellow
  drawCircle(500, "#FFD154", tvWidth - 1350, 1100);

  // Feedback
  writeText("No answer", "bold", "#000000", "Montserrat", 150, 40 + h_margin, 275 + v_margin);
  writeText("selected", "bold", "#000000", "Montserrat", 150, 40 + h_margin, 400 + v_margin);
  writeText("+0 Points", "bold", "#000000", "Montserrat", 100, 40 + h_margin, 515 + v_margin);

  // Option A
  writeText("Option A", "bold", "#CACACA", "Montserrat", 60, 1100 + h_margin, 100 + v_margin);
  writeText("Hold right arm up", "normal", "#CACACA", "Montserrat", 40, 1060 + h_margin, 150 + v_margin);

  // Option B
  writeText("Option B", "bold", "#CACACA", "Montserrat", 60, 800 + h_margin, 400 + v_margin);
  writeText("Hold right arm left", "normal", "#CACACA", "Montserrat", 40, 750 + h_margin, 450 + v_margin);

  // Option C
  writeText("Option C", "bold", "#CACACA", "Montserrat", 60, 1400 + h_margin, 400 + v_margin);
  writeText("Hold right arm right", "normal", "#CACACA", "Montserrat", 40, 1340 + h_margin, 450 + v_margin);

  // Option D
  writeText("Option D", "bold", "#CACACA", "Montserrat", 60, 1100 + h_margin, 700 + v_margin);
  writeText("Hold right arm down", "normal", "#CACACA", "Montserrat", 40, 1040 + h_margin, 750 + v_margin);
}

function setWrong(){
  state = 5;
  background("#fffff");
  let v_margin = 60;
  let h_margin = 60;

  // purple
  drawCircle(500, "#A873F2", tvWidth - 200, -100);
  // blue
  drawCircle(600, "#74A9FF", tvWidth - 1800, 1050);
  // yellow
  drawCircle(500, "#FFD154", tvWidth - 1350, 1100);

  // Feedback
  writeText("Wrong!", "bold", "#000000", "Montserrat", 150, 40 + h_margin, 350 + v_margin);
  writeText("+0 Points", "bold", "#000000", "Montserrat", 100, 40 + h_margin, 450 + v_margin);

  // Option A
  writeText("Option A", "bold", "#CACACA", "Montserrat", 60, 1100 + h_margin, 100 + v_margin);
  writeText("Hold right arm up", "normal", "#CACACA", "Montserrat", 40, 1060 + h_margin, 150 + v_margin);

  // Option B
  writeText("Option B", "bold", "#CACACA", "Montserrat", 60, 800 + h_margin, 400 + v_margin);
  writeText("Hold right arm left", "normal", "#CACACA", "Montserrat", 40, 750 + h_margin, 450 + v_margin);

  // Option C
  writeText("Option C", "bold", "#CACACA", "Montserrat", 60, 1400 + h_margin, 400 + v_margin);
  writeText("Hold right arm right", "normal", "#CACACA", "Montserrat", 40, 1340 + h_margin, 450 + v_margin);

  // Option D
  writeText("Option D", "bold", "#DF5454", "Montserrat", 60, 1100 + h_margin, 700 + v_margin);
  writeText("Hold right arm down", "normal", "#DF5454", "Montserrat", 40, 1040 + h_margin, 750 + v_margin);
}

function setResults(){
  background(0);
}

function setRecommendations(){
  background(0);
}

function setLeaderboard(){
  state = 8;
  background("#fffff");
  let v_margin = 60;
  let h_margin = 60;

  writeTextCenter("Leaderboard", "bold", "#000000", "Montserrat", 100, tvWidth/2, 120 + v_margin);

  drawRectangle((tvWidth/2)-800, 250, 1600, 175, '#FF8AA6');
  drawRectangle((tvWidth/2)-800, 450, 1600, 150, '#74A9FF');
  drawRectangle((tvWidth/2)-800, 625, 1600, 150, '#FFD154');
  drawRectangle((tvWidth/2)-800, 800, 1600, 150, '#A7D8AC');

  // First place
  writeText("1", "bold", "#000000", "Montserrat", 150, 280, 330 + v_margin);
  writeText("PlayerName", "bold", "#000000", "Montserrat", 70, 650, 280 + v_margin);
  writeText("4847", "bold", "#000000", "Montserrat", 125, 1475, 320 + v_margin);

  drawStars(5, "#000000", 450, 385);

  // Second place
  writeText("2", "bold", "#000000", "Montserrat", 120, 280, 510 + v_margin);
  writeText("PlayerName", "bold", "#000000", "Montserrat", 60, 620, 465 + v_margin);
  writeText("4052", "bold", "#000000", "Montserrat", 115, 1460, 510 + v_margin);

  drawStars(5, "#000000", 450, 565);

  // Third place
  writeText("3", "bold", "#000000", "Montserrat", 120, 280, 690 + v_margin);
  writeText("PlayerName", "bold", "#000000", "Montserrat", 60, 620, 640 + v_margin);
  writeText("3776", "bold", "#000000", "Montserrat", 115, 1460, 685 + v_margin);

  drawStars(4, "#000000", 450, 740);

  // Fourth place
  writeText("4", "bold", "#000000", "Montserrat", 120, 280, 860 + v_margin);
  writeText("PlayerName", "bold", "#000000", "Montserrat", 60, 620, 810 + v_margin);
  writeText("2949", "bold", "#000000", "Montserrat", 115, 1460, 860 + v_margin);

  drawStars(3, "#000000", 450, 910);
}