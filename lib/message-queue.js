'use strict';

/**
 * A message queue. Instances of this correspond to each vendor.
 */
class MessageQueue {
  constructor(storeID) {
    this.storeID = storeID;
    this.messages = [];
  }

  dequeueMessage() {
    return this.messages.shift();
  }

  enqueueMessage(message) {
    this.messages.push(message);
  }

  static sync(storeID) {
    if (MessageQueue.instanceMap[storeID]) {
      return MessageQueue.instanceMap[storeID];
    } else {
      MessageQueue.instanceMap[storeID] = new MessageQueue(storeID);
      return MessageQueue.instanceMap[storeID];
    }
  }

  syncSocket(socketID) {
    MessageQueue.socketMap[this.storeID] = socketID;
    this.socketID = socketID;
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