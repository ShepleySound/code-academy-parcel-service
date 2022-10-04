'use strict';

const { eventPool } = require('./event-pool');

eventPool.on('ready', function vendorListener(e) {
  
  // For now we'll just immediately emit new messages.
  eventPool.emit('transit', e);
  console.log(`DRIVER: Order picked up - ${e.orderID}`);
  eventPool.emit('delivered', e);

  console.log(`DRIVER: Order delivered - ${e.orderID}`);

});

