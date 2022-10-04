const { eventPool } = require('./event-pool');

const event = {
  event: 'event',
  time: Date.now(),
  payload: {},
};

eventPool.on('ready', function packageListener(e){
  console.log(e)
  console.log('The package is ready for pickup.');
});

eventPool.on('transit', function packageListener(e) {
  console.log(e)

  console.log('The package is on its way to the destination.');
});

eventPool.on('delivered', function packageListener(e) {
  console.log(e)

  console.log('The package has been delivered!');
});

