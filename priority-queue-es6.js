class QueueItem {
    //constructor destructured property as argument
    constructor({item, priority}) {
        this.itemName = item;
        this.priority = priority;
    }
}

class PriorityQueue {
  
    //constructor function
    constructor() {
        this.items = [];
    }
    
    //Stack Operations Go Here
    enqueue(item, priority) {
        //const newQueueItem = new QueueItem({item, priority});
        const newQueueItem = {itemName: item, priority: priority};
        let itemAdded = false;
        //use the for .. of to iterate the array 
        for(let [index, itemObject] of this.items.entries()) {
            if(newQueueItem.priority > itemObject.priority) {
                this.items.splice(index, 0, newQueueItem);
                itemAdded = true;
                break;
            }
        }
        if(!itemAdded) {
            this.items.push(newQueueItem);
        }
    }
    
    //remove item from the queue
    dequeue() {
        return this.items.shift();
    }
    
    //return item at the front of the queue
    front() {
        return this.items[0];
    }
    
    //return item at the back of the queue
    back() {
        let last = this.items.length - 1;
        return this.items[last];
    }
    
    //empty the queue
    empty() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size () {
      return this.items.length;
    }
    
    //display all the items in queue
    toString() {
        let finalString = "";
        for(let item of this.items) {
            console.log(`Name: ${item.itemName} & Priority: ${item.priority}`);
        }
    }
}