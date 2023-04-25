# HCI Final
Group Members
- Varun Kumar
- Ron Cheng
- Beixi Hao
- Deanna DeCarlo

# Description
A quiz game for CS majors written in p5.js that gives recommendations and resources based on user performance. Users are ranked following their completion of the quiz.

Our system is an implementation of an interactive quiz that tests users on their knowledge of computer science principles. After indicating that they want to engage with the system, the user will be presented with five technical questions. The user may select an answer from a multiple choice list via the positioning of their hands, with a stopwatch indicating the remaining time. Immediate feedback is given after each question is answered. Upon completion of the quiz, the user is presented with resources and Yale courses they may want to explore based on their answers to the questions. Finally, users are shown a leaderboard and their location on the leaderboard based on randomly assigned usernames. Users are given the option to exit the game at any point.

# Dependencies and Instructions to Run
p5.js and jquery imported via CDN (no installation required). To run locally, copy the full pathname of the index.html file and run it in a Google Chrome browser. Note that if kinect inputs fail, you can still navigate through the program using keyboard equivalents below:
- Raise arm: "SPACE"
- Raise Left (EXIT): "E"
- Right arm up, left, right down respectively: "1", "2", "3", "4"

# Addressed Tasks
1. Users should be able to test their knowledge of computer science principles through an entertaining quiz.
2. Users should be able to receive feedback about which topics they should review, classes they can take, and how they compare to other students.

# Constraints
Project uses Kinect skeleton tracking and person detection. Does not account for multiple players in the physical space and works best when other non-users are not in frame. Project was designed for AKW Floor 3 near the elevator and stairs (HCI TV1), an environment roughly equal to 10ft x 10ft, with a limitation on how close the player can get to detect arm positions (1ft). 

# Collaboration Record
Deanna DeCarlo dmd226: Worked on sketch.js to develop the frontend states according to the high fidelity prototype, especially including the starting display, instructions, question and question feedback pages, and the leaderboard. Worked on quiz-lib.js to write and include 25 questions for the quiz game. Debugged with Ron.

Ron Cheng rxc2: Worked on sketch.js and quiz-lib.js to develop the infrastructure to write the front end, including the Quiz, Question, and BarTimer classes. Connected the api.js to the sketch.js files and created dynamic states of the quiz game (handling storage of user, scores, questions, etc). Debugged with Deanna.

Varun Kumar vk296: Worked on api.js to read the Kinect data and translate it to commands for the quiz. Debugged the Kinect readings with Beixi. Wrote the class structure for the Api for the sketch.js to use. Wrote three questions to use for the quiz and the readme.

Beixi Hao bh642: Worked on the backend on the api.js to include the user and score api, added questions for the quiz game, looked up documentation and developed and debugged the motion control api with Varun.

* All of us worked on coordinating meeting times, both as a full group and in separate groups for frontend and backend.
