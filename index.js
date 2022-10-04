const Chance = require('chance');
const chance = new Chance();

// const { eventPool } = require('./src/event-pool');

require('./src/global-package-events');
require('./src/driver');
const Vendor = require('./src/vendor');

const vendor = new Vendor('Hello World Store');

vendor.readyOrder(chance.name(), chance.address());
vendor.readyOrder(chance.name(), chance.address());
vendor.readyOrder(chance.name(), chance.address());
vendor.readyOrder(chance.name(), chance.address());
vendor.readyOrder(chance.name(), chance.address());
vendor.readyOrder(chance.name(), chance.address());
vendor.readyOrder(chance.name(), chance.address());