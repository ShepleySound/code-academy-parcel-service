'use strict';

// const { eventPool } = require('./event-pool');

class Event {
  constructor(event, order) {
    this.event = event;
    this.time = Date.now();
    this.order = order;
  }
}

const orders = [];

module.exports = (io, socket) => {
  socket.on('ready', async function packageListener(e){
    console.log(socket.id)
    const event = new Event('ready', e);
    console.log('A package is ready for pickup.');
    orders.push(e);
  });

  socket.on('driver:request', (name, callback) => {
    console.log(`Driver ${name} requested a list of orders.`);
    orders.length ? callback({
      orders,
      count: orders.length,
    }) : callback('No orders available');
    // socket.emit('orders:available', orders);
    // console.log(socket.id)
  });

  socket.on('driver:pickup', (name, callback) => {
    const givenPackage = orders.shift();
    givenPackage && callback({
      givenPackage,
    })
    givenPackage && console.log(`Driver ${name} picked up order ${givenPackage.orderID}`)
    // socket.emit('orders:pickup', givenPackage);
  });

  socket.on('transit', function packageListener(e) {
    const event = new Event('transit', e);
    console.log('The package is on its way to the destination.');
    console.log(event);
  });

  socket.on('delivered', function packageListener(e) {
    const event = new Event('delivered', e);
    console.log('The package has been delivered!');
    console.log(event);
  });
};

