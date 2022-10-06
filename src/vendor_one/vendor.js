'use strict';

const Chance = require('chance');
const chance = new Chance();

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');

class Order {
  constructor(storeName, storeLocation, storeID, orderID, customer, address) {
    this.storeName = storeName
    this.storeLocation = storeLocation;
    this.storeID = storeID;
    this.orderID = orderID;
    this.customer = customer;
    this.address = address;
  }
}

class Vendor {
  constructor(storeName, location, id) {
    this.storeName = storeName;
    this.location = location;
    // HARDCODED FOR NOW, CHANGE THIS LATER
    this.storeID = id;
    

  }
    
  // This may be useful later.
  // createOrder(customer, address) {
  //   return new Order(this.store, '12345qwerty', customer, address);
  // }

  readyOrder(customer, address) {
    // Later it would be good to separate this so vendors can create many and then bulk ready orders.
    // const order = this.createOrder();
    // For now, we'll just create the order immediately by passing in parameters to this function.
    const order = new Order(
      this.storeName,
      this.location,
      this.storeID, 
      chance.hash({length: 10}), 
      customer, 
      address);

    socket.emit('vendor:ready', order);
    console.log(`Order ${order.orderID} submitted. Awaiting pickup.`);
  }
}

module.exports = Vendor;