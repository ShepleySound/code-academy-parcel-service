'use strict';
const Chance = require('chance');
const chance = new Chance();

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');
class Order {
  constructor(storeLocation, storeID, orderID, customer, address) {
    this.storeLocation = storeLocation;
    this.storeID = storeID;
    this.orderID = orderID;
    this.customer = customer;
    this.address = address;
  }
}

class Vendor {
  constructor() {
    this.location = `${chance.city()}, ${chance.state()}`;
    this.storeID = chance.hash({length: 10});
    socket.on('delivered', function vendorListener(e) {
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
    const order = new Order(
      this.location,
      this.storeID, 
      chance.hash({length: 10}), 
      customer, 
      address);
    // order.status = 'ready';
    socket.emit('ready', order);
    console.log('hello');
    // console.log(socket)
  }
  

}

const vendor = new Vendor('Hello World Store');
setTimeout(() => vendor.readyOrder('12345', '12345'), 1500);

// module.exports = Vendor;

