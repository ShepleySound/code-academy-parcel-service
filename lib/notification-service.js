'use strict';

/**
 * A Notfication class for vendors. CLIENT SIDE
 */
class NotificationService {
  constructor(storeID) {
    this.storeID = storeID;
  }
  
  // Maybe this should just contain all of the code from the index .on's???
  subscribe() {
    
    NotificationService.create(this.storeID);
    // Pull from the corresponding message queue on the server
  }

  static create(storeID) {
    
  }
}