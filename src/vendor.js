'use strict';
const Chance = require('chance');
const chance = new Chance();

const { eventPool } = require('./event-pool');

class Order {
  constructor(store, orderID, customer, address) {
    this.store = store;
    this.orderID = orderID;
    this.customer = customer;
    this.address = address;
  }
}

class Vendor {
  constructor(store) {
    this.store = store;

    eventPool.on('delivered', function vendorListener(e) {
      console.log(`Thank you, ${e.customer}`);
    });

  }

  // This may be useful later.
  // createOrder(customer, address) {
  //   return new Order(this.store, '12345qwerty', customer, address);
  // }

  readyOrder(customer, address) {
    // Later it would be good to separate this so vendors can create many and then bulk ready orders.
    // const order = this.createOrder();
    // For now, we'll just create the order immediately by passing in parameters to this function.
    const order = new Order(this.store, chance.hash(), customer, address);
    // order.status = 'ready';
    eventPool.emit('ready', order);
  }
  

}

module.exports = Vendor;

