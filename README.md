# HCI Final
Group Members
- Varun Kumar
- Ron Cheng
- Beixi Hao
- Deanna DeCarlo

# Description
A quiz game for CS majors written in p5.js that gives recommendations and resources based on your performance. Also includes a leaderboard.

Our system is an implementation of an interactive quiz that tests users on their knowledge of computer science principles. After indicating that they want to engage with the system, the user will be presented with five technical questions. The user may select an answer from a multiple choice list via the positioning of their hands, with a stopwatch indicating the remaining time. Immediate feedback is given after each question is answered. Upon completion of the quiz, the user is presented with resources and Yale courses they may want to explore based on their answers to the questions. Finally, users are shown a leaderboard and their location on the leaderboard based on randomly assigned usernames. Users are given the option to exit the game at any point.

# Dependencies 
p5.js and jquery imported via CDN (no installation required)

# Addressed Tasks
1. Users should be able to test their knowledge of computer science principles through an entertaining quiz.
2. Users should be able to receive feedback about which topics they should review, classes they can take, and how they compare to other students.

# Constraints
Project uses Kinect skeleton tracking and person detection. Does not account for multiple players in the physical space and selects the first person detected. Project was also designed for AKW Floor 3, roughly equal to a 10ft x 10ft space, with a limitation on how close the player can get (1ft). 

# Collaboration Record
Deanna DeCarlo dmd226: Worked on sketch.js to develop the frontend states according to the high fidelity prototype, specifically including the starting display, instructions, question and question feedback pages, and the leaderboard. Worked on quiz-lib.js to write and include 25 questions for the quiz game.

Ron Cheng rxc2:

Varun Kumar vk296: Worked on api.js to read the Kinect data and translate it to commands for the quiz. Debugged the Kinect readings with Beixi Wrote the class structure for the Api for the sketch.js to use. Wrote three questions to use for the quiz and the readme.

Beixi Hao bh642: Worked on the backend on the api.js to include the user and score api, added questions for the quiz game, looked up documentation and developed and debugged the motion control api with Varun.





