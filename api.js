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
  
  module.exports = {
    createUser
  };
  