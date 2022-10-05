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
  constructor(id) {
    this.location = `${chance.city()}, ${chance.state()}`;
    // HARDCODED FOR NOW, CHANGE THIS LATER
    this.storeID = id;
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
    // console.log(socket)
  }
  

}

const vendor = new Vendor('b5882');
// const vendor3 = new Vendor('97a03');
// const vendor4 = new Vendor('758f7');
// const vendor5 = new Vendor('f60fd');

setTimeout(() => vendor.readyOrder(chance.name(), chance.address()), 1500);
setTimeout(() => vendor.readyOrder(chance.name(), chance.address()), 2000);
setTimeout(() => vendor.readyOrder(chance.name(), chance.address()), 2500);
// setTimeout(() => vendor2.readyOrder(chance.name(), chance.address()), 5000);
// setTimeout(() => vendor3.readyOrder(chance.name(), chance.address()), 8000);
// setTimeout(() => vendor4.readyOrder(chance.name(), chance.address()), 8000);
// setTimeout(() => vendor5.readyOrder(chance.name(), chance.address()), 8000);


// module.exports = Vendor;

