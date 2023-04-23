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
    isCorrect(option){
        if(index_of_answer == option){
            return true;
        }
        return false;
    }
    resetSelection(){
        this.playerSelection = "None"
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
        noFill();
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
        noFill();
        rect(this.x, this.y, this.length, this.height, 10*(this.length/100)**2);
    }
    reset(){
        this.leftFrames = this.maxFrames;
    }
    finished(){
        return this.leftFrames == 0;
    }
}