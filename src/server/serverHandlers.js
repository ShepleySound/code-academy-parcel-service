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
  // console.log(socket.id)
  socket.on('vendor:sync', (storeID, callback) => {
    const messageQueue = MessageQueue.sync(storeID);
    messageQueue.syncSocket(socket.id);
    callback(messageQueue.messages);
    messageQueue.messages = [];
  });
  socket.on('ready', function packageListener(e){
    const event = new Event('ready', e);
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

      const messageQueue = MessageQueue.sync(givenPackage.order.storeID);
      messageQueue.enqueueMessage(givenPackage)
      socket.to(userMap[givenPackage.order.storeID]).emit('vendor:notification');
      // console.log(messageQueue)
      

      // Use the storeID of the package to determine where the message emits to.
      // socket.to(userMap[givenPackage.order.storeID]).emit('vendor:pickup', (givenPackage));
    }
  });

  socket.on('vendor:retrieveMessages', (storeID, callback) => {

    const messageQueue = MessageQueue.sync(storeID);
    callback(messageQueue.dequeueMessage());
  });

  socket.on('driver:delivery', (name, deliveredOrder) => {
    const matchedOrder = ordersList.find(order => deliveredOrder.orderID === order.order.orderID);
    if (matchedOrder) {
      matchedOrder.time = new Date();
      matchedOrder.status = 'delivered';
    }
    console.log(`Driver ${name} has delivered order ${deliveredOrder.orderID}`);

    const messageQueue = MessageQueue.sync(matchedOrder.order.storeID);
    messageQueue.enqueueMessage(matchedOrder)
    socket.to(userMap[matchedOrder.order.storeID]).emit('vendor:notification');
    // socket.emit('vendor:complete', matchedOrder);
    // socket.to(userMap[deliveredOrder.storeID]).emit('vendor:complete', (matchedOrder))

  });
};
