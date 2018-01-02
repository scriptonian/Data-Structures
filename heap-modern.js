class Heap {
    constructor(size){
        console.log('Heap Class Constructor Fired!')
        this.MAX_SIZE = size;
        this.items = new Array(size);
        this.count = 0;
    }

    //swap items in array
    swap(index_one, index_two) {
        //console.log('swapping ' + index_one + ' with ' + index_two);
        //swap
        let temp = this.items[index_one];
        this.items[index_one] = this.items[index_two];
        this.items[index_two] = temp;
    }

    //get the left child index
    getLeftChildIndex(index) {
        let leftIndex = (2 * index) + 1;
        if(leftIndex >= this.count) {
            return -1;
        }
        return leftIndex;
    }

    //get the right child index
    getRightChildIndex(index) {
        let rightIndex = (2 * index) + 2;
        if(rightIndex >= this.count) {
            return -1;
        }
        return rightIndex;
    }

    //get the parent index
    getParentIndex(index) {
        if(index < 0 || index > this.count) {
            return -1;
        }

        let parentIndex = Math.floor((index - 1) / 2);
        return parentIndex;
    }

    getHighestPriority() {
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
    }
    
    //WARNING: insert mst be overridden by child class. Cannot 
    insert(value) {
        throw new Error('Cannot call insert on Parent Class. Override from child class.');
    }

    //WARNING: removeHighestPriority must be overridden by child class
    removeHighestPriority(value) {
        throw new Error('Cannot call removeHighestPriority on Parent Class. Override from child class.');
    }
    
    //display the items in the collection
    displayHeapArray() {
        console.log(this.items.toString());
        //console.log('Highest priority so far is : ' + this.getHighestPriority());
    }
    
    //empty the queue
    empty() {
        this.count = 0;
        this.items = [];
    }
    
    //check if items is empty
    isEmpty() {
        return this.items.length === 0;
    }
    
    //check if collection is full
    isFull() {
        return this.count === this.items.length;
    }
    
    //get size of items array
    size() {
      return this.items.length;
    }
    
    //get element at position
    getElementAtIndex(index) {
        return this.items[index];
    }
    
    //get max heap size
    getMaxHeapSize() {
        return this.MAX_SIZE;
    }

    getCurrentCount() {
        return this.count;
    }
}

//////////////////////// Minimum Heap Subclass /////////////////////////////////

class MinHeap extends Heap {
    constructor(heap_size) {
        //initialize parent class passing in heap size
        super(heap_size);        
    }
    /*
    Add Addition methods to MinHeap.
    */
    //Insert new value into collection
    insert(value) {
        if (this.count >= this.items.length) {
            try {
                throw 'Error';
            }
            catch (e) {
                console.log('Sorry Collection is Full. Please Adjust heap size');
                return;
            }
        }
        //console.log('Running Minheap Insert');
        //append value to the end of the array
        this.items[this.count] = value;
        //put the value in the right position
        this.trickleUp(this.count);
        this.count++;
    }

    removeHighestPriority() {
        //return if there is nothing in the collection
        if(this.count === 0) { return; }

        //console.log('Minheap removeHighestPriority');
        //get the highest priority
        let min = this.getHighestPriority();

        //now that we have the highest priority, remove the element at the first 
        //and replace it with the last
        this.items[0] = this.items[this.count - 1];
        this.items.splice(this.count - 1);
        this.count--;
        //put the value in the right position
        this.trickleDown(0);

        //console.log(min + ' was the highest priority that was removed');
        return min;
    }

    //heapify operation
    trickleUp(index) {
        //console.log('Trickling Up');
        let parentIndex = this.getParentIndex(index);

        if(parentIndex !== -1 && 
                (this.getElementAtIndex(index) < this.getElementAtIndex(parentIndex))) {
            this.swap(parentIndex, index);
            this.trickleUp(parentIndex);
        }
    }

    //heapify operation
    trickleDown(index) {
        //console.log('Trickling Down');

        //get right and left child indices
        let leftIndex = this.getLeftChildIndex(index);
        let rightIndex = this.getRightChildIndex(index);

        //store the bigger index value of the two (left and right)
        let smallerIndex = -1;
        if(leftIndex !== -1 && rightIndex !== -1) {
            //assign the larger index
            smallerIndex = (this.getElementAtIndex(leftIndex) < this.getElementAtIndex(rightIndex)) 
                            ? leftIndex : rightIndex;
        } else if(leftIndex !== -1) {
            smallerIndex = leftIndex
        } else if(rightIndex !== -1) {
            smallerIndex = rightIndex
        }

        //If none of those worked, then shop the trickle down
        if(smallerIndex === -1) {
            return;
        }

        //now that you have the larger index, lets compare it to the index we passed in and see
        //if we need to further trickledown or swap
        if(this.getElementAtIndex(smallerIndex) < this.getElementAtIndex(index)) {
            this.swap(smallerIndex, index);
            this.trickleDown(smallerIndex);
        }
    };
}
/*
let minheap = new MinHeap(9);

minheap.insert(17);
minheap.insert(19);
minheap.insert(7);
minheap.insert(36);
minheap.insert(25);
minheap.insert(100);
minheap.insert(1);
minheap.insert(2);
minheap.insert(3);
minheap.removeHighestPriority()
*/

//////////////////////// Maximum Heap Subclass /////////////////////////////////

class MaxHeap extends Heap {

    constructor(heap_size) {
        //initialize parent class passing in heap size
        super(heap_size);        
    }

    /*
    Add Addition methods to Maxheap.
    */

    //Insert new value into collection
    insert(value) {
        if (this.count >= this.items.length) {
            try {
                throw 'Error';
            }
            catch (e) {
                console.log('Sorry Collection is Full. Please Adjust heap size');
                return;
            }
        }
        //console.log('Running Maxheap Insert');
        //append value to the end of the array
        this.items[this.count] = value;
        //put the value in the right position
        this.trickleUp(this.count);
        this.count++;
    }

    removeHighestPriority() {
        //return if there is nothing in the collection
        if(this.count === 0) { return; }

        //console.log('Maxheap removeHighestPriority');
        //get the highest priority
        let min = this.getHighestPriority();

        //now that we have the highest priority, remove the element at the first 
        //and replace it with the last
        this.items[0] = this.items[this.count - 1];
        this.items.splice(this.count - 1);
        this.count--;
        //put the value in the right position
        this.trickleDown(0);

        //console.log(min + ' was the highest priority that was removed');
        return min;
    }

    //heapify operation
    trickleUp(index) {
        //console.log('Trickling Up');
        let parentIndex = this.getParentIndex(index);

        if(parentIndex !== -1 && 
                (this.getElementAtIndex(index) > this.getElementAtIndex(parentIndex))) {
            this.swap(parentIndex, index);
            this.trickleUp(parentIndex);
        }
    }

    //heapify operation
    trickleDown(index) {
        //console.log('Trickling Down');

        //get right and left child indices
        let leftIndex = this.getLeftChildIndex(index);
        let rightIndex = this.getRightChildIndex(index);

        //store the bigger index value of the two (left and right)
        let largerIndex = -1;
        if(leftIndex !== -1 && rightIndex !== -1) {
            //assign the larger index
            largerIndex = this.getElementAtIndex(leftIndex) > this.getElementAtIndex(rightIndex) 
                            ? leftIndex : rightIndex;
        } else if(leftIndex !== -1) {
            largerIndex = leftIndex
        } else if(rightIndex !== -1) {
            largerIndex = rightIndex
        }

        //If none of those worked, then shop the trickle down
        if(largerIndex === -1) {
            return;
        }

        //now that you have the larger index, lets compare it to the index we passed in and see
        //if we need to further trickledown or swap
        if(this.getElementAtIndex(largerIndex) > this.getElementAtIndex(index)) {
            this.swap(largerIndex, index);
            this.trickleDown(largerIndex);
        }
    }
}

let maxheap = new MaxHeap(12);
maxheap.insert(42);
maxheap.insert(90);
maxheap.insert(93);
maxheap.insert(97);
maxheap.insert(55);
maxheap.insert(79);
maxheap.insert(73);
maxheap.insert(21);
maxheap.insert(83);
maxheap.insert(83);
maxheap.insert(84);
maxheap.insert(81);