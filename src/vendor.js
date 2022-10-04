const { eventPool } = require('./event-pool');

class Vendor {
  constructor(store) {
    this.store = store;

    eventPool.on('delivered', function vendorListener() {
      console.log('Hello delivered VENDOR LISTENER');
    });

  }

  createPackage() {
    return {
      store: this.store,
      orderID: '12345qwerty',
      customer: 'customer12345',
      address: '12345 qwerty rd',
    };
  }

  readyPackage() {
    eventPool.emit('ready', this.createPackage());
  }
  

}

const vendor = new Vendor('Hello World')
vendor.readyPackage();