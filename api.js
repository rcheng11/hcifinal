function createUser() {
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

function recordScore(user, score) {
    const scores = JSON.parse(localStorage.getItem('scores')) || {};
    scores[user] = score;
    localStorage.setItem('scores', JSON.stringify(scores));
}
  
function getTopScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || {};
    const sortedUsers = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const topUsers = sortedUsers.slice(0, 10);
    const topScores = topUsers.map(user => ({ user, score: scores[user] }));
    return topScores;
}
  
module.exports = {
    createUser,
    recordScore,
    getTopScores
};
  