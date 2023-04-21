class Question{
    /* 
    takes in a question string, an array of string choices,
    and the index of the correct answer in the array
     */
    constructor(question, choices, index_of_answer){
        this.question = question;
        this.choices = choices;
        this.index_of_answer = index_of_answer;
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
    draw(){
        strokeWeight(2);
        stroke("#1E1E1E");
        noFill();
        rect(this.x, this.y, this.length, this.height, 10*(this.length/100));

        noStroke();
        fill("#FFA767");
        // draw inner rectange
        rect(this.x + this.length * 0.025, 
            this.y + this.height * 0.1,
            this.length * 0.95 * -1 * (Math.cos(Math.PI * (1 - (this.leftFrames/this.maxFrames))) - 1) / 2,
            this.height * 0.8, 
            20);

        if(this.leftFrames > 0){
            // decrease the frames
            this.leftFrames -= 1;
        }
    }
    finished(){
        return this.leftFrames == 0;
    }
}