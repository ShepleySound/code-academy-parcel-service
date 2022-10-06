'use strict';
const Chance = require('chance');
const chance = new Chance();

require('dotenv').config();
const NotificationService = require('../../lib/notification-service');
const Vendor = require('./vendor');

const STOREID = 'dc547ah2';

const notifier = new NotificationService(STOREID);

const vendor = new Vendor(
  'Al\'s Wares',
  'Seatlle, WA',
  STOREID,
);

notifier.subscribe();

setTimeout(() => vendor.readyOrder(chance.name(), chance.address()), 200);
setInterval(() => vendor.readyOrder(chance.name(), chance.address()), 800);

