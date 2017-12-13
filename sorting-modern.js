class ScriptoniteSort {
    constructor() {
        //instance variable  
        this.arr = [];
    }

    swap(arr, j, nextslot) {
        //swap
        let temp = arr[j];
        arr[j] = arr[nextslot];
        arr[nextslot] = temp;
    }

    validateCollection(datalist) {
        if(arguments.length === 0 || !Array.isArray(this.arr)) {
            throw new Error('Either No Arguments Passed, Or Passed Param is not an Array');
        }
    }

    bubbleSort(datalist, logging) {
        //assign the data property to the passed in datalist
        this.arr = datalist;
        let numberOfPasses = 0,
            dataLength = this.arr.length;
        
        for(let i = 0; i < dataLength; i++) {
            //inner loop does the swapping
            for(let j = 0; j < dataLength - 1; j++) {
                if(this.arr[j] > this.arr[j+1]) {
                    this.swap(this.arr, j, j+1);
                }
            }
            numberOfPasses++;
        }
        //if display log if true
        if(logging){
            console.log("Number of passes: ", numberOfPasses);
            console.log("Bubble Sort Result: ", this.arr.toString());
        }
    }//end bubbleSort

    bubbleSortEnhanced(datalist, logging) {
        //assign the data property to the passed in datalist
        this.arr = datalist;

        //check if passed in is an array
        if(arguments.length === 0 || !Array.isArray(this.arr)) {
            throw new Error('Either No Arguments Passed, Or Passed Param is not an Array');
        }

        let dataLength = this.arr.length,
            numberOfPasses = 0,
            innerLoopSwap;

        for(let i = 0; i < dataLength; i++) {
            //at the beginning of each pass inner swap is false. during the inner loop we set to 
            //true if a swap really happens. If it doesnt we end the nested loops
            innerLoopSwap = false;

            // by doing dataLength - 1 - i, we avoid unnecessary comparision.
            // for example if the highest # is already at the end, we compare it again?
            for(let j = 0; j < dataLength - 1 - i; j++) {
                if(this.arr[j] > this.arr[j+1]){
                    this.swap(this.arr, j, j+1);
                    //if swap happened set to true
                    innerLoopSwap = true;
                }
            }
            //increate count
            numberOfPasses++;

            //if a swap never happened, the entire collection is sorted.
            //if it did, then lets keep iterating through collection. note: on the next iteration
            //inner loop swap is set to false on the outter for loop
            if(!innerLoopSwap) {
                console.log("Number of passes: " + numberOfPasses);
                console.log("Enhanced Bubble Sort Result: ", this.arr.toString());
                return;
            }
        }
    } //end bubbleSortEnhanced

    insertionSort(datalist) {
        //assign the data property to the passed in datalist
        this.arr = datalist;
        //check if passed in is an array
        this.validateCollection(datalist);
        //set length of array
        let dataLength = this.arr.length;
        //the outter loops starts from the second item. the first item when you start is supposed to the
        //the sorted side. So when you bring items so that side, we compare it to the 5
        for (let i = 1; i < dataLength; i++) {
            //we start at the second item in the collection, so we save that as a temp variable
            //so when we fill its slot we have a reference to its value (to insert elsewhere)
            let temp = this.arr[i];
            //placeholder is where we will insert
            let placeHolderIndex = i;
            //as long as the placeholder is greater than zero (remember always start from the second slot)
            //and the previous slot is greater than the temp var, we keep shift the numbers
            while( (placeHolderIndex > 0) && (this.arr[placeHolderIndex-1] > temp) ) {
                //if condition is met then keep shifting the values
                this.arr[placeHolderIndex] = this.arr[placeHolderIndex-1];
                placeHolderIndex--;
            }
            //after shifting is all done, insert the value into right location
            this.arr[placeHolderIndex] = temp;
        }
        console.log("Insertion Sort Result: ", this.arr.toString());
    }

    //this method uses an inner for loop instead of a while loop. The approach is also different
    //but the idea is pretty much the same
    insertionSortAlternative(datalist) {
        //assign the data property to the passed in datalist
        this.arr = datalist;
        //check if passed in is an array
        this.validateCollection(datalist);
        //set length of array
        let dataLength = this.arr.length;
        //outer loops goes to second to last element. we can do the last swap there is needed
        for (let i = 0; i < dataLength - 1; i++) {
            //bubble the element to the right position
            for(let j = i + 1; j > 0; j--) {
                if(this.arr[j] < this.arr[j-1]) {
                    this.swap(this.arr, j, j-1);
                } else {
                    //break from the loop
                    break;
                }
            }
        }
        console.log("Insertion Sort Alternative Result: ", this.arr.toString());
    }
}