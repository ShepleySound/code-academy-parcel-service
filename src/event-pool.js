'use strict';

const { Server } = require('socket.io');


const io = new Server(3000);

const registerPackageHandlers = require('./global-package-events');
const registerVendorHandlers = require('./vendor');
const registerDriverHandlers = require('./driver');


const onConnection = (socket) => {
  console.log('A user connected');
  registerPackageHandlers(io, socket);
  registerDriverHandlers(io, socket);
};

io.on('connection', onConnection);

// module.exports = { eventPool };