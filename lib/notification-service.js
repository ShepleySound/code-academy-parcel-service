'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');

/**
 * A Notfication class for vendors. CLIENT SIDE
 */
class NotificationService {
  constructor(storeID) {
    this.storeID = storeID;
  }
  
  subscribe() {

    socket.on('connect', () => {
      socket.emit('vendor:sync', this.storeID, (messages) => {
        console.log('--- SYNCING MESSAGES ---');
        console.log(messages);
      });
    });

    socket.on('vendor:messages');


    socket.on('vendor:notification', () => {
      socket.emit('vendor:retrieveMessages', (this.storeID), (messages) => {
        console.log('--- INCOMING MESSAGE ---')
        console.log(messages);
      });
    });
    // Pull from the corresponding message queue on the server
  }
}

module.exports = NotificationService;