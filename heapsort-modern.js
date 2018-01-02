class HeapSort {
    
    constructor(arr) {
        console.log('Heap Sort Intialized!')
        this.items = arr;
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
    getLeftChildIndex(index, lastIndex) {
        let leftIndex = (2 * index) + 1;
        if(leftIndex > lastIndex) {
            return -1;
        }
        return leftIndex;
    }

    //get the right child index
    getRightChildIndex(index, lastIndex) {
        let rightIndex = (2 * index) + 2;
        if(rightIndex > lastIndex) {
            return -1;
        }
        return rightIndex;
    }

    //get the parent index
    getParentIndex(index, lastIndex){
        if(index < 0 || index > lastIndex) {
            return -1;
        }

        let parentIndex = Math.floor((index - 1) / 2);
        return parentIndex;
    }

    trickleDown(index, lastIndex) {    
        //get right and left child indices
        let leftIndex = this.getLeftChildIndex(index, lastIndex);
        let rightIndex = this.getRightChildIndex(index, lastIndex);
    
        //now that you have the larger index, lets compare it to the index we passed in and see
        //if we need to further trickledown or swap
        if(leftIndex !== -1 && this.items[leftIndex] > this.items[index]) {
            this.swap(leftIndex, index);
            this.trickleDown(leftIndex, lastIndex);
        }

        if(rightIndex !== -1 && this.items[rightIndex] > this.items[index]) {
            this.swap(rightIndex, index);
            this.trickleDown(rightIndex, lastIndex);
        }
    }

    heapify(lastIndex){
        let index = this.getParentIndex(lastIndex, lastIndex);
        while(index >= 0) {
            this.trickleDown(index, lastIndex);
            index--;
        }
    }

    sort(){
        this.heapify(this.items.length - 1);

        let lastIndex = this.items.length - 1;
        while(lastIndex > 0) {
            this.swap(0, lastIndex);
            lastIndex--;
            this.trickleDown(0, lastIndex);
        }
    }
}

let unsorted = [6, 17, 12, 5, 14, 9, 4, 2, 1, 10, 56];
heapsort = new HeapSort(unsorted);
heapsort.sort();
