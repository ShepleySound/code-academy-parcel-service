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
    this.currentOrders = [];
  }

  requestPackage() {
    socket.emit('driver:request', this.name, (response) => {
      if (response.orders) {
        console.log(`--- ${response.count} ORDERS AVAILABLE ---`)
        console.log(response.orders);
      } else console.log(response)
    });

  }

  pickupPackage() {
    socket.emit('driver:pickup', this.name, (response) => {
      this.currentOrders.push(response);
      console.log('--- NEW ORDER PICKED UP ---');
      console.log(response);
      console.log('--- CURRENT ORDERS ---');
      console.log(this.currentOrders);

    });
  }

  deliverPackage() {
    if (this.currentOrders.length > 0) {
      const deliveredOrder = this.currentOrders.shift();
      socket.emit('driver:delivery', this.name, deliveredOrder);
      console.log('Package delivered. Thank you!');
    } else console.log('No packages to deliver.');
  }
};

const driver = new Driver();
setInterval(() => driver.requestPackage(), 800);
setInterval(() => driver.pickupPackage(), 600);
setInterval(() => driver.deliverPackage(), 1000);

