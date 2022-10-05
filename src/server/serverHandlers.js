'use strict';

// const { eventPool } = require('./event-pool');

class Event {
  constructor(status, order, driver = null) {
    this.status = status;
    this.time = new Date();
    this.order = order;
    this.driver = driver;
  }
}

const ordersList = [];
const userMap = {};

module.exports = (io, socket) => {
  socket.on('ready', function packageListener(e){
    // console.log('A package is ready for pickup.');
    const event = new Event('ready', e);
    // console.log(event)
    ordersList.push(event);
    // storeID is unique and won't change between sessions.
    // So, I believe we can map this to the most recent socket.id for some persistence!
    userMap[event.order.storeID] = socket.id;
  });

  socket.on('driver:request', (name, callback) => {
    console.log(`Driver ${name} requested a list of orders.`);
    const readyOrders = ordersList.filter(order => {
      return order.status === 'ready';
    });
    readyOrders.length ? callback({
      orders: readyOrders.map(order => order.order),
      count: readyOrders.length,
    }) : callback('No orders available');
  });

  socket.on('driver:pickup', (name, callback) => {
    const readyIndex = ordersList.findIndex(order => order.status === 'ready');
    const givenPackage = ordersList[readyIndex];
    if (givenPackage) {
      ordersList[readyIndex].status = 'transit';
      ordersList[readyIndex].time = new Date();
      ordersList[readyIndex].driver = name;
      callback(
        givenPackage,
      );
      console.log(`Driver ${name} picked up order ${givenPackage.order.orderID}`);
      // Use the storeID of the package to determine where the message emits to.
      socket.to(userMap[givenPackage.order.storeID]).emit('pickup:message', (givenPackage));
    }
  });

  socket.on('driver:delivery', (name, deliveredOrder) => {
    const matchedOrder = ordersList.find(order => deliveredOrder.orderID === order.order.orderID);
    console.log(`Driver ${name} has delivered order ${deliveredOrder.orderID}`);
    socket.to(userMap[deliveredOrder.storeID]).emit('delivery:msg', (matchedOrder));

  });
};

