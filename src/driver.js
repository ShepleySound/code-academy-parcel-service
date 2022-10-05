'use strict';

// const { eventPool } = require('./event-pool');
// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3000');

module.exports = (io, socket) => {
  socket.on('ready', function vendorListener(e) {
    
    // For now we'll just immediately emit new messages.
    socket.emit('transit', e);
    console.log(`DRIVER: Order picked up - ${e.orderID}`);
    socket.emit('delivered', e);
  
    console.log(`DRIVER: Order delivered - ${e.orderID}`);
  });
}