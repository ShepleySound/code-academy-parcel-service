'use strict';
const Chance = require('chance');
const chance = new Chance();

require('dotenv').config();
const NotificationService = require('../../lib/notification-service');
const Vendor = require('./vendor');

const STOREID = 'sjhv3918';

const notifier = new NotificationService(STOREID);

const vendor = new Vendor(
  '1-800-FLOWERS',
  'New York, NY',
  STOREID,
)

notifier.subscribe();

setTimeout(() => vendor.readyOrder(chance.name(), chance.address()), 500);
setInterval(() => vendor.readyOrder(chance.name(), chance.address()), 950);

