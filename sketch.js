// Start API
var direction = Api.startConnection();
var directionArr = ["x","y"]
var armChange = false;

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


// global variables
var state = 0;
var frameSpeed = 60;
var tvHeight = 1080;
var tvWidth = 1920;
var img;
var timerSpeed = 3.5;
var responseBuffer = 3;
var score = 0;

// quiz object variables
var questionTimeAlloted = 45;
var quizFramesMax = questionTimeAlloted * frameSpeed;
var quizFramesLeft = quizFramesMax;
var quizHandler = new Quiz();
var lastQuestionScore = 0;

// timer object
var timer = new BarTimer();
timer.setTime(timerSpeed, frameSpeed);

// JS keycodes
const SPACE = 32;
const ONE = 49;
const TWO = 50;
const THREE = 51;
const FOUR = 52;
const E_KEY = 69;
const GREEN = "#A7D8AC";
const RED = "#DF5454";
var lastKey = SPACE;

function keyPressed(){
  lastKey = keyCode;
}

function setup() {
  let displayCanvas = createCanvas(tvWidth, tvHeight);
  img = loadImage('https://i.ibb.co/QjF7Ssn/image-1.png');
  displayCanvas.parent("#canvas-container");
  frameRate(frameSpeed);
}

function draw() {
  if(directionArr.length < 2){
    directionArr.push(direction);
  }
  else{
    directionArr.shift();
    directionArr.push(direction);
  }
  armChange = directionArr[0] != directionArr[1];
  console.log(directionArr);
  console.log(armChange);
  
  switch (state) {
    // START PAGE
    case 0:
      // render page
      setStartPage();
      if(timer.finished()){
        timer.setTime(timerSpeed, frameSpeed);
        state = 1;
      }
      break;
    // INSTRUCTIONS
    case 1:
      setInstructions();
      if(timer.finished()){
        timer.setTime(timerSpeed, frameSpeed);
        state = 2;
      }
      break;
    // QUESTION
    case 2:
      setQuestion(quizHandler);
      // note: quizFramesMax are decremented in the setPage functions
      // selected an answer
      if(timer.finished()){
        timer.setTime(timerSpeed, frameSpeed);
        if(lastKey == E_KEY){
          quizFramesLeft = quizFramesMax;
          // initialize new questions for quiz
          quizHandler = new Quiz();
          // reset selections of each question obj to "None"
          quizHandler.resetQuestions();
          // state = 0;
        }
        else{
          if(quizHandler.getCurrentQuestion().isCorrect()){
            lastQuestionScore = quizHandler.calcScore(quizFramesLeft, quizFramesMax, timer.maxFrames, frameSpeed);
            score += lastQuestionScore;
            state = 3;
          }
          else{
            state = 5;
          }
          quizFramesLeft = responseBuffer * frameSpeed;
        }
      }
      // timer runs out, no answer selected
      else if(quizFramesLeft <= 0){
        state = 4;
        quizFramesLeft = responseBuffer * frameSpeed;
      }
      break;
    // CORRECT CHOICE
    case 3:
      setCorrect();
      if(quizFramesLeft <= 0){
        timer.setTime(timerSpeed, frameSpeed);
        quizFramesLeft = quizFramesMax;
        quizHandler.nextQuestion();
        if(quizHandler.isFinished()){
          state = 6;
        }
        else{
          state = 2;
        }
      }
      break;
    // NO CHOICE MADE
    case 4:
      setNoAnswer();
      if(quizFramesLeft <= 0){
        timer.setTime(timerSpeed, frameSpeed);
        quizFramesLeft = quizFramesMax;
        quizHandler.nextQuestion();
        if(quizHandler.isFinished()){
          state = 6;
        }
        else{
          state = 2;
        }
      }
      break;
    // WRONG CHOICE
    case 5:
      setWrong();
      if(quizFramesLeft <= 0){
        timer.setTime(timerSpeed, frameSpeed);
        quizFramesLeft = quizFramesMax;
        quizHandler.nextQuestion();
        if(quizHandler.isFinished()){
          state = 6;
        }
        else{
          state = 2;
        }
      }
      break;
    // RESULTS
    case 6:
      setResults();
      if(timer.finished()){
        timer.setTime(timerSpeed, frameSpeed);
        state = 7;
      }
      break;
    // RECS
    case 7:
      setRecommendations();
      if(timer.finished()){
        timer.setTime(5, frameSpeed);
        state = 8;
      }
      break;
    // LEADERBOARD
    case 8:
      setLeaderboard();
      if(timer.finished()){
        timer.setTime(timerSpeed, frameSpeed);
        // initialize new questions for quiz
        quizHandler = new Quiz();
        // reset selections of each question obj to "None"
        quizHandler.resetQuestions();
        score = 0;
        state = 0;
      }
      break;
    default:
      break;
  }
}

function writeText(str = "Placeholder", style = "normal", color = "#000000", font = "Montserrat", size = 25, x = 20, y = 40){
  noStroke()
  if(style == "normal"){
    textStyle(NORMAL);
  }
  else if(style == "bold"){
    textStyle(BOLD);
  }
  fill(color);
  textFont(font);
  textSize(size);
  textAlign(LEFT);
  text(str, x, y);
}

function writeTextCenter(str = "Placeholder", style = "normal", color = "#000000", font = "Montserrat", size = 25, x = tvWidth/2, y = 40){
  noStroke()
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

function writeTextBox(str = "Placeholder", style = "normal", color = "#000000", font = "Montserrat", size = 25, x = 20, y = 40, x2 = 1000, y2 = 100){
  noStroke()
  if(style == "normal"){
    textStyle(NORMAL);
  }
  else if(style == "bold"){
    textStyle(BOLD);
  }
  fill(color);
  textFont(font);
  textSize(size);
  textAlign(LEFT);
  text(str, x, y, x2, y2);
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
  writeText("Raise any hand to begin.", "normal", "#000000", "Montserrat", 65, 120 + h_margin, 300 + v_margin);
  writeText("Keep it raised until the bar is full!", "normal", "#000000", "Montserrat", 40, 200 + h_margin, 700 + v_margin);

  let imgSize = 70;
  image(img, 350 + h_margin, 350 + v_margin, 4*imgSize, 3*imgSize);

  // timer
  timer.setSize(850, 70)
  timer.setCoords(180, 680);
  if(keyIsDown(SPACE) || direction == "up"){
    timer.draw()
  }
  else{
    timer.drawStatic();
    timer.reset();
  }
}

function setInstructions(){
  state = 1;
  background("#fffff");
  let v_margin = 60;

  // blue
  drawCircle(600, "#74A9FF", tvWidth - 225, -30);
  // yellow
  drawCircle(600, "#FFD154", tvWidth - 1700, -30);
  // pink
  drawCircle(600, "#FF8AA6", tvWidth - 1900, 180);
  // purple
  drawCircle(600, "#A873F2", tvWidth - 100, 1200);

  // timer
  writeTextCenter("START QUIZ", "bold", "#000000", "Montserrat", 50, tvWidth - 240, 75);
  writeTextCenter("(Raise any arm)", "bold", "#000000", "Montserrat", 30, tvWidth - 240, 110);
  
  timer.setSize(200, 30);
  timer.setCoords(tvWidth - 340, 130);
  if(keyIsDown(SPACE) || direction == "up"){
    timer.draw();
  }
  else{
    timer.drawStatic();
    timer.reset();
  }

  // Instructions Text
  writeTextCenter("Instructions", "bold", "#000000", "Montserrat", 120, tvWidth/2, 150 + v_margin);

  writeTextCenter("You will complete a short quiz on a variety of", "normal", "#000000", "Montserrat", 50, tvWidth/2, 300 + v_margin);
  writeTextCenter("computer science topics, using your arms to", "normal", "#000000", "Montserrat", 50, tvWidth/2, 350 + v_margin);
  writeTextCenter("select responses.", "normal", "#000000", "Montserrat", 50, tvWidth/2, 400 + v_margin);

  writeTextCenter("The correctness of your response and the time it", "normal", "#000000", "Montserrat", 50, tvWidth/2, 550 + v_margin);
  writeTextCenter("takes you to respond will contribute to your score.", "normal", "#000000", "Montserrat", 50, tvWidth/2, 600 + v_margin);

  writeTextCenter("At the end, your performance will be ranked, and you", "normal", "#000000", "Montserrat", 50, tvWidth/2, 750 + v_margin);
  writeTextCenter("will be provided with a list of resources to learn more.", "normal", "#000000", "Montserrat", 50, tvWidth/2, 800 + v_margin);
  writeTextCenter("Raise any arm to begin!", "bold", "#000000", "Montserrat", 50, tvWidth/2, 850 + v_margin);

}

function setQuestion(quiz){
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
  let currQ = quiz.getCurrentQuestion();

  writeText(`Question ${quiz.getCurrentQuestionNumber()}/5`, "bold", "#000000", "Montserrat", 100, 40 + h_margin, 100 + v_margin);
  writeTextBox(currQ.question, "normal", "#000000", "Montserrat",35, 40 + h_margin, 200 + v_margin, 600, 800);

  // Option A
  writeTextCenter(currQ.choices[0], "bold", "#000000", "Montserrat", 60, 1220 + h_margin, 100 + v_margin);
  writeTextCenter("Hold right arm up", "normal", "#000000", "Montserrat", 40, 1220 + h_margin, 150 + v_margin);

  // Option B
  writeTextCenter(currQ.choices[1], "bold", "#000000", "Montserrat", 60, 920 + h_margin, 400 + v_margin);
  writeTextCenter("Hold right arm left", "normal", "#000000", "Montserrat", 40, 920 + h_margin, 450 + v_margin);

  // Option C
  writeTextCenter(currQ.choices[2], "bold", "#000000", "Montserrat", 60, 1520 + h_margin, 400 + v_margin);
  writeTextCenter("Hold right arm right", "normal", "#000000", "Montserrat", 40, 1520 + h_margin, 450 + v_margin);

  // Option D
  writeTextCenter(currQ.choices[3], "bold", "#000000", "Montserrat", 60, 1220 + h_margin, 700 + v_margin);
  writeTextCenter("Hold right arm down", "normal", "#000000", "Montserrat", 40, 1220 + h_margin, 750 + v_margin);

  // Timer1
  timer.setSize(300, 40);
  locA = { x: 1150, y: 250}
  locB = { x: 850, y: 550}
  locC = { x: 1450, y: 550}
  locD = { x: 1150, y: 850}
  locE = { x: 420, y: 1020}


  // exit
  if((keyIsDown(E_KEY) && !(keyIsDown(ONE) || keyIsDown(TWO) || keyIsDown(FOUR))) || direction == "exit"){
    timer.setCoords(locE.x, locE.y);
    currQ.setSelection("None");
    timer.draw();
  }
  // option A
  else if( (keyIsDown(ONE) && !(keyIsDown(E_KEY) || keyIsDown(TWO) || keyIsDown(THREE) || keyIsDown(FOUR))) || direction == "up"){
    timer.setCoords(locA.x, locA.y);
    currQ.setSelection(0);
    timer.draw();
  }
  // option B
  else if((keyIsDown(TWO) && !(keyIsDown(ONE) || keyIsDown(E_KEY) || keyIsDown(THREE) || keyIsDown(FOUR))) || direction == "left"){
    timer.setCoords(locB.x, locB.y);
    currQ.setSelection(1);
    timer.draw();
  }
  // option C
  else if((keyIsDown(THREE) && !(keyIsDown(ONE) || keyIsDown(TWO) || keyIsDown(E_KEY) || keyIsDown(FOUR))) || direction == "right"){
    timer.setCoords(locC.x, locC.y);
    currQ.setSelection(2);
    timer.draw();
  }
  // option D
  else if((keyIsDown(FOUR) && !(keyIsDown(ONE) || keyIsDown(TWO) || keyIsDown(THREE) || keyIsDown(E_KEY))) || direction == "down"){
    timer.setCoords(locD.x, locD.y);
    currQ.setSelection(3);
    timer.draw();
  }
  else{
    timer.reset();
  }

  if(armChange){
    timer.reset();
  }
  // Quiz Timer
  timeLeft = Math.round(quizFramesLeft / frameSpeed);
  writeText(timeLeft + "s", "bold", "#000000", "Montserrat", 100, tvWidth - 1825, 975);
  quizFramesLeft--;
  
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

  let currQ = quizHandler.getCurrentQuestion();
  let selection = currQ.getSelection();

  // Feedback
  writeText("Correct!", "bold", "#000000", "Montserrat", 150, 40 + h_margin, 350 + v_margin);
  writeText(`+ ${lastQuestionScore} Pts`, "bold", "#000000", "Montserrat", 100, 40 + h_margin, 450 + v_margin);
  // Option A
  writeTextCenter(currQ.choices[0], "bold", ((selection == 0) ? GREEN : "#CACACA"), "Montserrat", 60, 1220 + h_margin, 100 + v_margin);
  writeTextCenter("Hold right arm up", "normal", ((selection == 0) ? GREEN : "#CACACA"), "Montserrat", 40, 1220 + h_margin, 150 + v_margin);

  // Option B
  writeTextCenter(currQ.choices[1], "bold", ((selection == 1) ? GREEN : "#CACACA"), "Montserrat", 60, 920 + h_margin, 400 + v_margin);
  writeTextCenter("Hold right arm left", "normal", ((selection == 1) ? GREEN : "#CACACA"), "Montserrat", 40, 920 + h_margin, 450 + v_margin);

  // Option C
  writeTextCenter(currQ.choices[2], "bold", ((selection == 2) ? GREEN : "#CACACA"), "Montserrat", 60, 1520 + h_margin, 400 + v_margin);
  writeTextCenter("Hold right arm right", "normal", ((selection == 2) ? GREEN : "#CACACA"), "Montserrat", 40, 1520 + h_margin, 450 + v_margin);

  // Option D
  writeTextCenter(currQ.choices[3], "bold", ((selection == 3) ? GREEN : "#CACACA"), "Montserrat", 60, 1220 + h_margin, 700 + v_margin);
  writeTextCenter("Hold right arm down", "normal", ((selection == 3) ? GREEN : "#CACACA"), "Montserrat", 40, 1220 + h_margin, 750 + v_margin);

  // Quiz Timer
  timeLeft = Math.round(quizFramesLeft / frameSpeed);
  writeText(timeLeft + "s", "bold", "#000000", "Montserrat", 100, tvWidth - 1825, 975);
  quizFramesLeft--;
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

  let currQ = quizHandler.getCurrentQuestion()
  let answer = currQ.getAnswer();
   // Option A
   writeTextCenter(currQ.choices[0], "bold", ((answer == 0) ? GREEN : "#CACACA"), "Montserrat", 60, 1220 + h_margin, 100 + v_margin);
   writeTextCenter("Hold right arm up", "normal", ((answer == 0) ? GREEN : "#CACACA"), "Montserrat", 40, 1220 + h_margin, 150 + v_margin);
 
   // Option B
   writeTextCenter(currQ.choices[1], "bold", ((answer == 1) ? GREEN : "#CACACA"), "Montserrat", 60, 920 + h_margin, 400 + v_margin);
   writeTextCenter("Hold right arm left", "normal", ((answer == 1) ? GREEN : "#CACACA"), "Montserrat", 40, 920 + h_margin, 450 + v_margin);
 
   // Option C
   writeTextCenter(currQ.choices[2], "bold", ((answer == 2) ? GREEN : "#CACACA"), "Montserrat", 60, 1520 + h_margin, 400 + v_margin);
   writeTextCenter("Hold right arm right", "normal", ((answer == 2) ? GREEN : "#CACACA"), "Montserrat", 40, 1520 + h_margin, 450 + v_margin);
 
   // Option D
   writeTextCenter(currQ.choices[3], "bold", ((answer == 3) ? GREEN : "#CACACA"), "Montserrat", 60, 1220 + h_margin, 700 + v_margin);
   writeTextCenter("Hold right arm down", "normal", ((answer == 3) ? GREEN : "#CACACA"), "Montserrat", 40, 1220 + h_margin, 750 + v_margin);

  // Quiz Timer
  timeLeft = Math.round(quizFramesLeft / frameSpeed);
  writeText(timeLeft + "s", "bold", "#000000", "Montserrat", 100, tvWidth - 1825, 975);
  quizFramesLeft--;
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

  let currQ = quizHandler.getCurrentQuestion()
  let answer = currQ.getAnswer();
  let selection = currQ.getSelection();
   // Option A
   writeTextCenter(currQ.choices[0], "bold", ((answer == 0) ? GREEN : (selection == 0) ?  RED : "#CACACA"), "Montserrat", 60, 1220 + h_margin, 100 + v_margin);
   writeTextCenter("Hold right arm up", "normal", ((answer == 0) ? GREEN : (selection == 0) ?  RED : "#CACACA"), "Montserrat", 40, 1220 + h_margin, 150 + v_margin);
 
   // Option B
   writeTextCenter(currQ.choices[1], "bold", ((answer == 1) ? GREEN : (selection == 1) ?  RED : "#CACACA"), "Montserrat", 60, 920 + h_margin, 400 + v_margin);
   writeTextCenter("Hold right arm left", "normal", ((answer == 1) ? GREEN : (selection == 1) ?  RED : "#CACACA"), "Montserrat", 40, 920 + h_margin, 450 + v_margin);
 
   // Option C
   writeTextCenter(currQ.choices[2], "bold", ((answer == 2) ? GREEN : (selection == 2) ?  RED : "#CACACA"), "Montserrat", 60, 1520 + h_margin, 400 + v_margin);
   writeTextCenter("Hold right arm right", "normal", ((answer == 2) ? GREEN : (selection == 2) ?  RED : "#CACACA"), "Montserrat", 40, 1520 + h_margin, 450 + v_margin);
 
   // Option D
   writeTextCenter(currQ.choices[3], "bold", ((answer == 3) ? GREEN : (selection == 3) ?  RED : "#CACACA"), "Montserrat", 60, 1220 + h_margin, 700 + v_margin);
   writeTextCenter("Hold right arm down", "normal", ((answer == 3) ? GREEN : (selection == 3) ?  RED : "#CACACA"), "Montserrat", 40, 1220 + h_margin, 750 + v_margin);

  // Quiz Timer
  timeLeft = Math.round(quizFramesLeft / frameSpeed);
  writeText(timeLeft + "s", "bold", "#000000", "Montserrat", 100, tvWidth - 1825, 975);
  quizFramesLeft--;
}
function setResults(){
  let v_margin = 200;
  let h_margin = 90;
  background("#fffff");

  // pink
  drawCircle(400, "#FF8AA6", tvWidth - 250, 250)
  // yellow
  drawCircle(400, "#FFD154", tvWidth - 300, tvHeight)
  // orange
  drawCircle(600, "#FFA767", tvWidth, tvHeight - 200)

  // pink circle text
  writeTextCenter("Go to recs", "bold", "#000000", "Montserrat", 50, tvWidth - 255, 225);
  writeTextCenter("(Raise any arm)", "bold", "#000000", "Montserrat", 30, tvWidth - 255, 260);
  timer.length = 200;
  timer.height = 30;
  timer.setCoords(tvWidth - 355, 290);
  if(keyIsDown(SPACE) || direction == "up"){
    timer.draw();
  }
  else{
    timer.drawStatic();
  }

  // results text
  writeText(`Final Score: ${score}`, "bold", "#000000", "Montserrat", 120, h_margin, 50 + v_margin)
  writeText("Questions", "bold", "#000000", "Montserrat", 80, 45 + h_margin, 200 + v_margin)
  writeText("Your Answers", "bold", "#000000", "Montserrat", 80, tvWidth/2 - 135, 250 + v_margin)

  let questions = quizHandler.getQuestionsText();
  let questionRaw = quizHandler.questions;
  let answers = quizHandler.getUserSelections();
  // questions
  writeTextBox(questions, "normal", "#000000", "Montserrat", 40, h_margin + 70, v_margin + 250, 600, 1000)

  // answers
  for(var i = 0; i < answers.length; i++){
    writeText((i + 1) + ". " + answers[i], "normal", questionRaw[i].isCorrect() ? GREEN : questionRaw[i].playerSelection == "None" ? "#CACACA" : RED, "Montserrat", 40, tvWidth/2 - 100, 300 + v_margin + 80*(i + 0.5))
  }
}

function setRecommendations(){
  let v_margin = 200;
  let h_margin = 90;
  background("#fffff");


  // pink
  drawCircle(400, "#FF8AA6", tvWidth - 250, 250)
  // yellow
  drawCircle(400, "#FFD154", tvWidth - 300, tvHeight)
  // orange
  drawCircle(600, "#FFA767", tvWidth, tvHeight - 200)

  // pink circle text
  writeTextCenter("Go to recs", "bold", "#000000", "Montserrat", 50, tvWidth - 255, 225);
  writeTextCenter("(Raise any arm)", "bold", "#000000", "Montserrat", 30, tvWidth - 255, 260);
  timer.length = 200;
  timer.height = 30;
  timer.setCoords(tvWidth - 355, 290);
  if(keyIsDown(SPACE) || direction == "up"){
    timer.draw();
  }
  else{
    timer.drawStatic();
  }

  // results text
  writeText("Recommendations", "bold", "#000000", "Montserrat", 120, h_margin, 50 + v_margin)
  writeText("Classes", "bold", "#000000", "Montserrat", 80, 45 + h_margin, 250 + v_margin)
  writeText("Resources", "bold", "#000000", "Montserrat", 80, tvWidth/2 - 135, 250 + v_margin)

  let questionsRaw = quizHandler.questions;
  let classes = [];
  let resources = [];
  for(let i = 0; i < questionsRaw.length; i++){
    switch (questionsRaw[i].topic){
      case "Object Oriented Programming":
          if(questionsRaw[i].isCorrect()){
            classes.push("CPSC 439");
            resources.push("OOP Tutorials by Freecodecamp");
          }
          else{
            classes.push("CPSC 327");
            resources.push("OOP Tutorials by Freecodecamp");
          }
      case "Web Development":
        if(questionsRaw[i].isCorrect()){
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");
        }
        else{
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");
        }
      case "Computer Hardware":
        if(questionsRaw[i].isCorrect()){
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");
        }
        else{
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");
        }
      case "Databases":
        if(questionsRaw[i].isCorrect()){
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");
        }
        else{
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");      
        }
      case "Artificial Intelligence":
        if(questionsRaw[i].isCorrect()){
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");
        }
        else{
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");        
        }
      case "Algorithms":
        if(questionsRaw[i].isCorrect()){
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");
        }
        else{
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");       
        }
      case "Data Structures":
        if(questionsRaw[i].isCorrect()){
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");
        }
        else{
          classes.push("CPSC 327");
          resources.push("OOP Tutorials by Freecodecamp");
        }
      default:
    }
  }
  // questions
  for(var i = 0; i < classes.length; i++){
    writeText((i + 1) + ". " + classes[i], "normal", "#000000", "Montserrat", 40, 65 + h_margin, 300 + v_margin + 80*(i + 0.5))
  }

  // answers
  for(var i = 0; i < resources.length; i++){
    writeText((i + 1) + ". " + resources[i], "normal", "#000000", "Montserrat", 40, tvWidth/2 - 100, 300 + v_margin + 80*(i + 0.5))
  }
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

  timer.length = 200;
  timer.height = 30;
  timer.setCoords(tvWidth - 355, 100);
  timer.draw();
}

function sendWristCommand(command) {
  switch (command) {
  	case 0:
	  direction = 'exit'
		break;
    case 74:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 76:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 73:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 75:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
  return direction;
}
