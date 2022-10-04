'use strict';

const { eventPool } = require('./event-pool');

class Event {
  constructor(event, payload) {
    this.event = event;
    this.time = Date.now();
    this.payload = payload;
  }
}

eventPool.on('ready', function packageListener(e){
  const event = new Event('ready', e);
  console.log('The package is ready for pickup.');
  console.log(event);
});

eventPool.on('transit', function packageListener(e) {
  const event = new Event('transit', e);
  console.log('The package is on its way to the destination.');
  console.log(event);
});

eventPool.on('delivered', function packageListener(e) {
  const event = new Event('delivered', e);
  console.log('The package has been delivered!');
  console.log(event);
});

