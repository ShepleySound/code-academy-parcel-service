'use strict';

/**
 * A message queue. Instances of this correspond to each vendor.
 */
class MessageQueue {
  constructor(storeID) {
    this.storeID = storeID;
  }

  subscribe() {

  }

  static sync(storeID) {
    if (MessageQueue.instanceMap[storeID]) {
      console.log('already existing message queue')
    } else {
      console.log("New message queue")
      MessageQueue.instanceMap[storeID] = new MessageQueue(storeID)
    }
  }

  syncSocket(socketID) {
    MessageQueue.socketMap[this.storeID] = socketID;
  }
  // Maps our storeID's to a socketID
  static socketMap = {};

  static instanceMap = {};
}


class ReadyQueue {
  constructor(storeID) {

  }
}

module.exports = { MessageQueue };