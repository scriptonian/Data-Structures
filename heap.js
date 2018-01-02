function Heap(size) {
    console.log('Heap Class Constructor Fired!')
    this.MAX_SIZE = size;
    this.items = new Array(size);
    this.count = 0;
}

Heap.prototype = {
    //swap items in array
    swap: function(index_one, index_two) {
        //console.log('swapping ' + index_one + ' with ' + index_two);
        //swap
        var temp = this.items[index_one];
        this.items[index_one] = this.items[index_two];
        this.items[index_two] = temp;
    },
    //get the left child index
    getLeftChildIndex: function(index) {
        var leftIndex = (2 * index) + 1;
        if(leftIndex >= this.count) {
            return -1;
        }
        return leftIndex;
    },
    //get the right child index
    getRightChildIndex: function(index) {
        var rightIndex = (2 * index) + 2;
        if(rightIndex >= this.count) {
            return -1;
        }
        return rightIndex;
    },
    //get the parent index
    getParentIndex: function(index){
        if(index < 0 || index > this.count) {
            return -1;
        }

        var parentIndex = Math.floor((index - 1) / 2);
        return parentIndex;
    },

    getHighestPriority: function() {
        if(this.count === 0) {
            try {
                throw 'Error';
            }
            catch (e) {
                console.log('Whoops! collection is empty!');
                return;
            }
        }

        return this.items[0];
    },
    //WARNING: insert mst be overridden by child class. Cannot 
    insert: function(value) {
        throw new Error('Cannot call insert on Parent Class. Override from child class.');
    },
    //WARNING: removeHighestPriority must be overridden by child class
    removeHighestPriority: function(value) {
        throw new Error('Cannot call removeHighestPriority on Parent Class. Override from child class.');
    },
    //display the items in the collection
    displayHeapArray: function() {
        console.log(this.items.toString());
        //console.log('Highest priority so far is : ' + this.getHighestPriority());
    },
    //empty the queue
    empty: function() {
        this.count = 0;
        this.items = [];
    },
    //check if items is empty
    isEmpty: function() {
        return this.items.length === 0;
    },
    //check if collection is full
    isFull: function() {
        return this.count === this.items.length;
    },
    //get size of items array
    size: function() {
      return this.items.length;
    },
    //get element at position
    getElementAtIndex: function(index) {
        return this.items[index];
    },
    //get max heap size
    getMaxHeapSize: function() {
        return this.MAX_SIZE;
    },
    getCurrentCount: function() {
        return this.count;
    }
};
