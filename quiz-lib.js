class Question{
    /* 
    takes in a question string, an array of string choices,
    and the index of the correct answer in the array
     */
    constructor(question, topic, choices, index_of_answer){
        this.question = question;
        this.choices = choices;
        this.index_of_answer = index_of_answer;
        this.topic = topic;
        this.playerSelection = "None";
    }
    isCorrect(){
        if(this.index_of_answer == this.playerSelection){
            return true;
        }
        return false;
    }
    resetSelection(){
        this.playerSelection = "None";
    }
    setSelection(choice){
        this.playerSelection = choice;
    }
    getSelection(){
        return this.playerSelection;
    }
    getAnswer(){
        return this.index_of_answer;
    }
}

const questions = [];
questions.push(new Question("The principle of hiding the implementation details of a class from the outside world, and exposing only a well-defined interface for interacting with the class is known as", 
                             "Object Oriented Programming", 
                            ["Inheritance", "Encapsulation", "Polymorphism", "Obstruction"], 
                            1));
questions.push(new Question("Which of the following is not a commonly used language for Web Development?", 
                             "Web Development", 
                            ["Ruby", "Javascript", "C", "Python"], 
                            2));
questions.push(new Question("You accidentally drop a magnet on your friend’s device. All of his data has been wiped clean. The storage unit of his device was probably a", 
                             "Computer Hardware", 
                            ["Solid State Drive", "Hard Disk Drive", "Optical Disk Drive", "Flash Drive"], 
                            0));
questions.push(new Question("Which of the following is NOT a relational database?", 
                             "Databases", 
                            ["MySQL", "MongoDB", "Postgres", "SQLite"], 
                            1));
questions.push(new Question("Your friend made a machine learning program that can write an abstract for a research paper. They tell you it was trained on thousands of articles, providing it with the research paper and the abstract produced. This is an example of what type of learning?", 
                             "Machine learning", 
                            ["Supervised", "Unsupervised", "Gaussian", "None of the Above"], 
                            0));
questions.push(new Question("The efficiency of an algorithm is usually measured by what unit", 
                             "Algorithms", 
                            ["Microsenconds", "# of Declarations", "# of Kilobytes", " # of Operations"], 
                            1));
// questions.push(new Question("", 
//                             "", 
//                            ["", "", "", ""], 
//                            1));
// questions.push(new Question("", 
//                            "", 
//                           ["", "", "", ""], 
//                           1));
// questions.push(new Question("", 
//                           "", 
//                          ["", "", "", ""], 
//                          1));
// questions.push(new Question("", 
//                          "", 
//                         ["", "", "", ""], 
//                         1));
                            
function shuffleArr(arr){
    return arr.sort((a, b) => 0.5 - Math.random());
}

// when initialized, starts with 5 questions from list
class Quiz{
    constructor(){
        this.questions = shuffleArr(questions).slice(0,5);
        this.currentIndex = 0;
        this.currentQuestion = this.questions[this.currentIndex];
        this.score = 0;
        console.log(this)
    }
    nextQuestion(){
        this.currentIndex++;
        this.currentQuestion = this.questions[this.currentIndex];
    }
    getTotalScore(){
        return this.score;
    }
    calcScore(quizFrames, maxQuizFrames, barFrames, frameSpeed){
        let timeLeft = quizFrames / frameSpeed;
        let maxTime = maxQuizFrames / frameSpeed;
        let barTime = barFrames / frameSpeed;
        let maxPoints = 1000;
        return Math.round(maxPoints * (timeLeft/maxTime + 2 * barTime/maxTime));
    }
    getCurrentQuestion(){
        return this.currentQuestion;
    }
    getCurrentQuestionNumber(){
        return this.currentIndex + 1;
    }
    isFinished(){
        return this.currentIndex == this.questions.length;
    }
    resetQuestions(){
        for(let i = 0; i < this.questions.length; i++){
            questions[i].resetSelection();
        }
    }
}

class BarTimer{
    /*
    takes in information for a bar timer of px length and px width
    the frames argument is the number of frames it takes for the bar
    to reach the full length of the bar
    e.j maxFrames = 3 vs. maxFrames = 6:
    [X X        ] [X          ] Frame 1
    [X X X X    ] [X X        ] Frame 2
    [X X X X X X] [X X X      ] Frame 3
    */
    constructor(x = 300, y = 300, length = 400, height = 40, maxFrames = 20){
        this.x = x;
        this.y = y;
        this.length = length;
        this.height = height;
        this.maxFrames = maxFrames;
        this.leftFrames = maxFrames;
    }
    setTime(seconds, frameSpeed){
        this.maxFrames = seconds * frameSpeed;
        this.leftFrames = this.maxFrames;
    }
    setCoords(x, y){
        this.x = x;
        this.y = y;
    }
    setSize(length, height){
        this.length = length;
        this.height = height;
    }
    draw(){
        textAlign(LEFT)

        strokeWeight(2);
        stroke("#1E1E1E");
        fill("#ffffff");
        rect(this.x, this.y, this.length, this.height, 10*(this.length/100)**2);

        noStroke();
        fill("#FFA767");
        // draw inner rectange
        var paddingY = 0.25*this.height
        var paddingX = 0.04*this.length
        rect(this.x + paddingX/2, 
            this.y + paddingY/2,
            (this.length - paddingX) * -1 * (Math.cos(Math.PI * (1 - (this.leftFrames/this.maxFrames))) - 1) / 2,
            this.height - paddingY, 
            10*(this.length/100)**2);

        if(this.leftFrames > 0){
            // decrease the frames
            this.leftFrames -= 1;
        }
    }
    drawStatic(){
        textAlign(LEFT)

        strokeWeight(2);
        stroke("#1E1E1E");
        fill("#ffffff");
        rect(this.x, this.y, this.length, this.height, 10*(this.length/100)**2);
    }
    reset(){
        this.leftFrames = this.maxFrames;
    }
    finished(){
        return this.leftFrames == 0;
    }
}