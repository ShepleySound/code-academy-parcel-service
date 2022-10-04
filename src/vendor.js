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

    eventPool.on('delivered', function vendorListener() {
      console.log('Hello delivered VENDOR LISTENER');
    });

  }

  createOrder() {
    return new Order(this.store, '12345qwerty', 'customer12345', 'address');
  }

  readyPackage() {
    const order = this.createOrder();
    order.status = 'ready';
    eventPool.emit('ready', order);
  }
  

}

const vendor = new Vendor('Hello World')
vendor.readyPackage();