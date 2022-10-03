const { eventPool } = require('./event-pool');

eventPool.on('ready', () => {
  console.log('The package is ready for pickup.');
});

eventPool.on('transit', () => {
  console.log('The package is on its way to the destination.');
});

eventPool.on('delivered', () => {
  console.log('The package has been delivered!');
});