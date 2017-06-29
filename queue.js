function Queue() {
  //store queue items in an array
  this.items = [];
}

Queue.prototype = {
  //Queue Operations Go Here
  
  //add item to the top of the queue
  enqueue : function(element) {
      this.items.push(element);
  },
  
  //remove item from the queue
  dequeue : function() {
      this.items.shift();
  },
  
  //return item at the front of the queue
  front : function() {
      return this.items[0];
  },
  
  //return item at the back of the queue
  back : function() {
      var last = this.items.length - 1;
      return this.items[last];
  },

   //empty the queue
  empty : function() {
      this.items = [];
  },

  //display all the items in queue
  toString : function() {
      return this.items.toString();
  }
};
