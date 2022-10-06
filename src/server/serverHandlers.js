'use strict';

const { MessageQueue } = require('../../lib/message-queue');
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
  socket.on('vendor:sync', (storeID, callback) => {
    const messageQueue = MessageQueue.sync(storeID);
    messageQueue.syncSocket(socket.id);
    callback(messageQueue.messages);
    messageQueue.messages = [];
  });

  socket.on('vendor:ready', function packageListener(e){
    const event = new Event('ready', e);
    ordersList.push(event);
    // storeID is unique and won't change between sessions.
    // So, I believe we can map this to the most recent socket.id for some persistence!
    userMap[event.order.storeID] = socket.id;

  });

  socket.on('driver:request', (name, callback) => {
    console.log(`Driver ${name} requested a list of orders.`);
    // Filter list of orders by status 'ready'
    const readyOrders = ordersList.filter(order => {
      return order.status === 'ready';
    });

    // If any orders are found, return an object
    readyOrders.length ? callback({
      orders: readyOrders.map(order => order.order),
      count: readyOrders.length,
    }) : callback('No orders available');
  });

  socket.on('driver:pickup', (name, callback) => {
    // Grab the first package with status 'ready'
    const readyIndex = ordersList.findIndex(order => order.status === 'ready');
    if (readyIndex !== -1) {
      const givenPackage = ordersList.splice(readyIndex, 1)[0].order;
      callback(
        givenPackage,
      );
      console.log(`Driver ${name} picked up order ${givenPackage.orderID}`);

      notifyVendor(new Event('transit', givenPackage, name), socket);
    }
  });

  socket.on('vendor:retrieveMessages', (storeID, callback) => {

    const messageQueue = MessageQueue.sync(storeID);
    callback(messageQueue.dequeueMessage());
  });

  socket.on('driver:delivery', (name, deliveredOrder) => {
    console.log(`Driver ${name} has delivered order ${deliveredOrder.orderID}`);
    notifyVendor(new Event('delivered', deliveredOrder, name), socket);

  });
};

function notifyVendor(event, socket) {
  const messageQueue = MessageQueue.sync(event.order.storeID);
  messageQueue.enqueueMessage(event);
  socket.to(messageQueue.socketID).emit('vendor:notification');
}