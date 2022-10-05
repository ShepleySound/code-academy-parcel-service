'use strict';

const { Server } = require('socket.io');


const io = new Server(3001);
const registerPackageHandlers = require('./serverHandlers');
// const Vendor = require('./vendor');
// const Driver = require('./driver');


const onConnection = (socket) => {
  console.log('A user connected');
  registerPackageHandlers(io, socket);
};

io.on('connection', onConnection);


// const vendor = new Vendor('Hello World Store');
// vendor.readyOrder('12345', '12345');
// const driver = new Driver();
// const driver2 = new Driver();

// vendor.readyOrder('12345', '12345');
// vendor.readyOrder('12345', '12345');

