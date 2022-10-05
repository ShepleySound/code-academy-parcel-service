'use strict';

// const { eventPool } = require('./event-pool');

class Event {
  constructor(event, payload) {
    this.event = event;
    this.time = Date.now();
    this.payload = payload;
  }
}
module.exports = (io, socket) => {
  socket.on('ready', function packageListener(e){
    const event = new Event('ready', e);
    console.log('The package is ready for pickup.');
    console.log(event);
  });

  socket.on('transit', function packageListener(e) {
    const event = new Event('transit', e);
    console.log('The package is on its way to the destination.');
    console.log(event);
  });

  socket.on('delivered', function packageListener(e) {
    const event = new Event('delivered', e);
    console.log('The package has been delivered!');
    console.log(event);
  });
};

