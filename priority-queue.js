function QueueItem(item, priority) {
  this.itemName = item;
  this.priority = priority;
}

//Priority Queue Class
function PriorityQueue() {
  this.items = [];
}

PriorityQueue.prototype = {
    enqueue : function(item, priority) {
        var newQueueItem = new QueueItem(item, priority);
        var itemAdded = false;
        for (var i = 0; i < this.items.length; i++) {
            if(newQueueItem.priority > this.items[i].priority) {
                this.items.splice(i, 0, newQueueItem);
                itemAdded = true;
                break;
            }
        }
        if(!itemAdded) {
            this.items.push(newQueueItem);
        }
    },
    //remove item from the queue
    dequeue: function() {
        return this.items.shift();
    },
    
    //return item at the front of the queue
    front: function() {
        return this.items[0];
    },
    
    //return item at the back of the queue
    back: function() {
        let last = this.items.length - 1;
        return this.items[last];
    },
    
    //empty the queue
    empty: function() {
        this.items = [];
    },

    isEmpty: function() {
        return this.items.length === 0;
    },

    size : function() {
      return this.items.length;
    },

    //remove item from the queue
    toString : function() {
        var finalString = "";
        for(var i = 0; i < this.items.length; i++) {
            var currentItem = this.items[i];
            console.log("Name: " + currentItem.itemName + " & Priority: " + currentItem.priority);
        }
    }
};