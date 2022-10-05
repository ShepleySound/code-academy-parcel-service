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
    socket.on('ready', function vendorListener(e) {
      // For now we'll just immediately emit new messages.
      // socket.emit('transit', e);
      // console.log(`DRIVER: Order picked up - ${e.orderID}`);
      // socket.emit('delivered', e);
    
      // console.log(`DRIVER: Order delivered - ${e.orderID}`);
    });
  }

  requestPackage() {
    socket.emit('driver:request', this.name, (response) => {
      console.log('--- ORDERS AVAILABLE ---')
      console.log(response.orders);
    });
    // socket.on('orders:available', function packageResponse(e) {
    //   console.log(e)
    // });
    // console.log(socket.id)
  }

  pickupPackage() {
    socket.emit('driver:pickup', this.name, (response) => {
      this.currentOrders.push(response.order);
      console.log('--- NEW ORDER PICKED UP ---')
      console.log(response.order)
      console.log('--- CURRENT ORDERS ---')
      console.log(this.currentOrders)

    });
  }

  deliverPackage(index) {
    const deliveredOrder = this.currentOrders.splice(index, 1);
    if (deliveredOrder.length) {
      socket.emit('driver:delivery', this.name, deliveredOrder[0]);
      console.log('Package delivered. Thank you!');
    } else console.log('Package does not exist.');
  }
};

const driver = new Driver();
setTimeout(() => driver.requestPackage(), 2500);
setTimeout(() => driver.pickupPackage(), 3000);
setTimeout(() => driver.deliverPackage(), 5000);

