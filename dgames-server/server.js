const io = require('socket.io');
const http = require('http');

const server = http.createServer();
const ioServer = io(server);

ioServer.on('connection', (socket) => {
  console.log('A new client has connected!');

  socket.on('make-choice', (choice) => {
    console.log(`The client chose ${choice}`);

    // Process the choice here
    // For example, you might compare the choice to the server's choice and determine a winner
    const serverChoice = 'rock';
    let result;
    if (choice === serverChoice) {
      result = 'Tie';
    } else if (
      (choice === 'rock' && serverChoice === 'scissors') ||
      (choice === 'scissors' && serverChoice === 'paper') ||
      (choice === 'paper' && serverChoice === 'rock')
    ) {
      result = 'You win!';
    } else {
      result = 'You lose';
    }

    // Send the result back to the client
    socket.emit('result', result);
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
