class Queue {
  
    //constructor function
    constructor() {
        this.items = [];
    }
    
    //Stack Operations Go Here
    enqueue(element) {
        this.items.push(element);
    }
    
    //remove item from the queue
    dequeue() {
        return this.items.shift();
    }
    
    //return item at the front of the queue
    front() {
        const [ front ] = this.items;
        return front;
    }
    
    //return item at the back of the queue
    back() {
        var last = this.items.length - 1;
        return this.items[last];
    }
    
    //empty the queue
    empty() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }
    
    //display all the items in queue
    toString() {
        return this.items.toString();
    }
}