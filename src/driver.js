'use strict';
const Chance = require('chance');
const chance = new Chance();

// const { eventPool } = require('./event-pool');
// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3000');

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');

class Driver {
  constructor() {
    this.name = chance.name();
    socket.on('ready', function vendorListener(e) {
      // For now we'll just immediately emit new messages.
      socket.emit('transit', e);
      console.log(`DRIVER: Order picked up - ${e.orderID}`);
      socket.emit('delivered', e);
    
      console.log(`DRIVER: Order delivered - ${e.orderID}`);
    });
  }

  // Use this variable to mock the package pickup...
  // It means we can only have one for now.
  pickedOrder;
  requestPackage() {
    socket.emit('driver:request', this.name, (response) => {
      console.log(response)
    });
    // socket.on('orders:available', function packageResponse(e) {
    //   console.log(e)
    // });
    // console.log(socket.id)
  }

  pickupPackage(orderID) {
    socket.emit('driver:pickup', this.name, (response) => {
      console.log(response, 'woweeeeee')
    })
  }

  deliverPackage(orderID) {

  }
};

const driver = new Driver();
setTimeout(() => driver.requestPackage(), 1000)
setTimeout(() => driver.pickupPackage(), 3000)

