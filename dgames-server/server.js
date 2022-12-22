const io = require('socket.io');
const http = require('http');

const server = http.createServer();
const ioServer = io(server);

ioServer.on('connection', (socket) => {
    console.log('A new client has connected!');
  
    socket.on('make-choice', (choice) => {
      console.log(`The client chose ${choice}`);
      // Handle the choice here
    });
  });
  
server.listen(3000, () => {
console.log('Server is listening on port 3000');
});