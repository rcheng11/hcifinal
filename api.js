class Api {
	static startConnection() {
		var host = "cpsc484-01.yale.internal:8888";
		$(document).ready(function() {
		  frames.start();
		  twod.start();
		});

		var frames = {
		  socket: null,

		  start: function() {
		    var url = "ws://" + host + "/frames";
		    frames.socket = new WebSocket(url);
		    frames.socket.onmessage = function (event) {
		      var command = frames.get_left_wrist_command(JSON.parse(event.data));
		      if (command !== null) {
		        sendWristCommand(command);
		      }
		    }
		  },

		  get_left_wrist_command: function (frame) {
		    var command = null;
		    if (frame.people.length < 1) {
		      return command;
		    }

		    // Normalize by subtracting the root (pelvis) joint coordinates
		    var pelvis_x = frame.people[0].joints[0].position.x;
		    var pelvis_y = frame.people[0].joints[0].position.y;
		    var pelvis_z = frame.people[0].joints[0].position.z;
		    var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
		    var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
		    var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;

		    if (left_wrist_z < 100) {
		      return command;
		    }

		    if (left_wrist_x < 200 && left_wrist_x > -200) {
		      if (left_wrist_y > 500) {
		        command = 73; // UP
		      } else if (left_wrist_y < 100) {
		        command = 75; // DOWN
		      }
		    } else if (left_wrist_y < 500 && left_wrist_y > 100) {
		      if (left_wrist_x > 200) {
		        command = 76; // RIGHT
		      } else if (left_wrist_x < -200) {
		        command = 74; // LEFT
		      }
		    }
		    return command;
		  }
		};

		var twod = {
		  socket: null,

		  start: function() {
		    var url = "ws://" + host + "/twod";
		    twod.socket = new WebSocket(url);
		    twod.socket.onmessage = function(event) {
		      twod.show(JSON.parse(event.data));
		    }
		  },

		  show: function(twod) {
		    $('.twod').attr("src", 'data:image/pnjpegg;base64,'+twod.src);
		  }
		};
		
		return frames;
	}
	
	

	static function createUser() {
	    const animals = ['cat', 'dog', 'hamster', 'rabbit', 'parrot'];
	    const randomIndex = Math.floor(Math.random() * animals.length);
	    const animalName = animals[randomIndex];
	    const randomNum = Math.floor(Math.random() * 1000);
	    const username = `${animalName}${randomNum}`;
    
	    const users = JSON.parse(localStorage.getItem('users')) || [];
	    users.push(username);
	    localStorage.setItem('users', JSON.stringify(users));
    

    return username;
  }

	static function recordScore(user, score) {
	    const scores = JSON.parse(localStorage.getItem('scores')) || {};
	    scores[user] = score;
	    localStorage.setItem('scores', JSON.stringify(scores));
	}
  
	static function getTopScores() {
	    const scores = JSON.parse(localStorage.getItem('scores')) || {};
	    const sortedUsers = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
	    const topUsers = sortedUsers.slice(0, 10);
	    const topScores = topUsers.map(user => ({ user, score: scores[user] }));
	    return topScores;
	}
}



