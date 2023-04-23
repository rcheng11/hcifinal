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
			
			var right_shoulder_x = frame.people[0].joints[12].position.x;
			var right_shoulder_y = frame.people[0].joints[12].position.y;
			
			var right_wrist_x = (frame.people[0].joints[14].position.x - right_shoulder_x) * -1;
			var right_wrist_y = (frame.people[0].joints[14].position.y - right_shoulder_y) * -1;
			/*
		    var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
		    var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
		    var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;
			*/
			
			console.log('x' + right_wrist_x)
			console.log('y: ' + right_wrist_y)
		
		/*
			if (right_wrist_x > 0) {
				command = 76;
			} else if (right_wrist_x < 0) {
				command = 74;
			}
			
			if (right_wrist_y > 0) {
				command = 73
			} else if (right_wrist_y < 0) {
				command = 75
			}
			*/
			
			
			/*
		    if (right_wrist_z < 100) {
		      return command;
		    }
 */
		    if (right_wrist_x > 0) {
		      if (right_wrist_y > 300) {
		        command = 73; // UP
		      } else if (right_wrist_y < -300) {
		        command = 75; // DOWN
		      } else {
				  command = 76; //RIGHT
		      }
		    } else if (right_wrist_y < 0) {
		      if (right_wrist_y > 300) {
		        command = 73; // UP
		      } else if (right_wrist_y < -300) {
		        command = 75; // DOWN
		      } else {
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
	};
	
	

	static createUser() {
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

	static recordScore(user, score) {
	    const scores = JSON.parse(localStorage.getItem('scores')) || {};
	    scores[user] = score;
	    localStorage.setItem('scores', JSON.stringify(scores));
	}
  
	static getTopScores() {
	    const scores = JSON.parse(localStorage.getItem('scores')) || {};
	    const sortedUsers = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
	    const topUsers = sortedUsers.slice(0, 10);
	    const topScores = topUsers.map(user => ({ user, score: scores[user] }));
	    return topScores;
	}
}





