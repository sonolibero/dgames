const socketio = require('socket.io');
const http = require('http');

const server = http.createServer();
const ioServer = socketio(server);

ioServer.on('connection', (socket) => {
  console.log('new client connected!');

  socket.on('make-choice', (choice) => {
    console.log(`client chose ${choice}`);

    const serverChoice = 'rock';
    let result;
    if (choice === serverChoice) {
      result = 'tie';
    } else if (
      (choice === 'rock' && serverChoice === 'scissors') ||
      (choice === 'scissors' && serverChoice === 'paper') ||
      (choice === 'paper' && serverChoice === 'rock')
    ) {
      result = 'you win';
    } else {
      result = 'you lose';
    }

    socket.emit('result', result);
  });
});

server.listen(3000);