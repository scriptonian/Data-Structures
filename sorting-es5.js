function ScriptoniteSort() {
    this.arr = [];
}

ScriptoniteSort.prototype = {
    swap: function(arr, index_one, index_two) {
        //swap
        var temp = arr[index_one];
        arr[index_one] = arr[index_two];
        arr[index_two] = temp;
    },

    validateCollection: function(datalist) {
        if(arguments.length === 0 || !Array.isArray(this.arr)) {
            throw new Error('Either No Arguments Passed, Or Passed Param is not an Array');
        }
    },

    bubbleSort: function(datalist, logging) {
        //assign the data property to the passed in datalist
        this.arr = datalist;

        //check if passed in is an array
        if(arguments.length === 0 || !Array.isArray(this.arr)) {
            throw new Error('Either No Arguments Passed, Or Passed Param is not an Array');
        }
        
        var numberOfPasses = 0,
            dataLength = this.arr.length;
        
        for(var i = 0; i < dataLength; i++) {
            //inner loop does the swapping
            for(var j = 0; j < dataLength - 1; j++) {
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
    },//end bubbleSort
    
    bubbleSortEnhanced: function(datalist, logging) {
        //assign the data property to the passed in datalist
        this.arr = datalist;

        //check if passed in is an array
        if(arguments.length === 0 || !Array.isArray(this.arr)) {
            throw new Error('Either No Arguments Passed, Or Passed Param is not an Array');
        }

        var dataLength = this.arr.length,
            numberOfPasses = 0,
            innerLoopSwap;

        for(var i = 0; i < dataLength; i++) {
            //at the beginning of each pass inner swap is false. during the inner loop we set to 
            //true if a swap really happens. If it doesnt we end the nested loops
            innerLoopSwap = false;

            // by doing dataLength - 1 - i, we avoid unnecessary comparision.
            // for example if the highest # is already at the end, we compare it again?
            for(var j = 0; j < dataLength - 1 - i; j++) {
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
    }, //end bubbleSortEnhanced

    selectionSort: function(datalist) {
        //assign the data property to the passed in datalist
        this.arr = datalist;
        
        //check if passed in is an array
        if(arguments.length === 0 || !Array.isArray(this.arr)) {
            throw new Error('Either No Arguments Passed, Or Passed Param is not an Array');
        }

        var dataLength = this.arr.length,
            innerMinIndex,
            innerMinimum;

        for(var i = 0; i < dataLength - 1; i++) {
            /*
            because we want to find the minimum value in the array we start by stating that the 
            current minimum is the value at i index. So we have something to compare to
            */
            innerMinimum = this.arr[i];
            innerMinIndex = i;
            //run through the collection, if a value you encounter is smaller than the inner min
            //save that as the new inner minimum.
            //we keep a reference to i since that is the location we want to swap with if 
            //there is a new minimum
            for(var j = i; j < dataLength; j++) {
                if(this.arr[j] < innerMinimum) {
                    innerMinimum = this.arr[j];
                    innerMinIndex = j;
                }
            }
            //do the swap only after we have found the new minimum value and index
            this.swap(this.arr, innerMinIndex, i);
        }
        //display or return the sort final array
        console.log("Selection Sort Result: ", this.arr.toString());
    },//end selection sort

    insertionSort : function(datalist) {
        //assign the data property to the passed in datalist
        this.arr = datalist;
        //check if passed in is an array
        this.validateCollection(datalist);
        //set length of array
        var dataLength = this.arr.length;
        //the outter loops starts from the second item. the first item when you start is supposed to the
        //the sorted side. So when you bring items so that side, we compare it to the 5
        for (var i = 1; i < dataLength; i++) {
            //we start at the second item in the collection, so we save that as a temp variable
            //so when we fill its slot we have a reference to its value (to insert elsewhere)
            var temp = this.arr[i];
            //placeholder is where we will insert
            var placeHolderIndex = i;
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
    },

    //this method uses an inner for loop instead of a while loop. The approach is also different
    //but the idea is pretty much the same
    insertionSortAlternative : function(datalist) {
        //assign the data property to the passed in datalist
        this.arr = datalist;
        //check if passed in is an array
        this.validateCollection(datalist);
        //set length of array
        var dataLength = this.arr.length;
        //outer loops goes to second to last element. we can do the last swap there is needed
        for (var i = 0; i < dataLength - 1; i++) {
            //bubble the element to the right position
            for(var j = i + 1; j > 0; j--) {
                if(this.arr[j] < this.arr[j - 1]) {
                    this.swap(this.arr, j, j - 1);
                } else {
                    //break from the loop
                    break;
                }
            }
        }
        console.log("Insertion Sort Alternative Result: ", this.arr.toString());
    },

    //use this insertion sort when working with shell sort
    insertionSortGap: function(datalist, startIndex, increment) {
        //set length of array
        var dataLength = datalist.length;
        //create sub lists and do sorting
        for (var i = startIndex + increment; i < dataLength; i += increment) {
            var temp = this.arr[i];
            //placeholder is where we will insert
            var placeHolderIndex = i;
            //like the insertion sort method we do the same here only using the increment values
            while( (placeHolderIndex >= increment) && (this.arr[placeHolderIndex - increment] > temp) ) {
                //if condition is met then keep shifting the values
                this.arr[placeHolderIndex] = this.arr[placeHolderIndex - increment];
                placeHolderIndex -= increment;
            }
            //after shifting is all done, insert the value into right location
            this.arr[placeHolderIndex] = temp;
        }
    },

    //this method uses two for loops instead of a while within a loop
    insertionSortGapAlternative: function(datalist, startIndex, increment) {
        //set length of array
        var dataLength = datalist.length;
        //create sub lists and do sorting
        for(var i = startIndex; i < dataLength; i += increment) {
            //console.log(this.arr[i]);
            for(var j = Math.min(i + increment, dataLength - 1); j - increment >= 0; j = j - increment) {
                if(this.arr[j] < this.arr[j - increment]) {
                    this.swap(this.arr, j, j - increment);
                } else {
                    break;
                }
            }
        }
    },

    shellSort: function(datalist) {
         //assign the data property to the passed in datalist
         this.arr = datalist;
         //check if passed in is an array
         this.validateCollection(this.arr);
        //set the increment
        var increment = Math.floor(this.arr.length / 2);
        //a long as increment is greater than 1 call the modified insertion sort with gap
        while(increment >= 1) {
            for(var i = 0; i < increment; i++) {
                this.insertionSortGap(datalist, i, increment);
                //or call the other method insertion sort method
                //this.insertionSortGapAlternative(datalist, i, increment);
            }
            //reduce the increment. we want to get to an increment on 1. which means that the 
            //collection is nearly sorted.
            increment = Math.floor(increment / 2);
        }
        //display or return final array
        console.log("---->" + this.arr.toString());
    },

    //split the datalist recursively
    mergeSplit: function(datalist) {
        if (datalist.length === 1) return datalist;

        var dataLength = datalist.length,
            middle = Math.floor(dataLength / 2),
        
            leftArray = datalist.slice(0, middle),
            rightArray = datalist.slice(middle);

        return this.merge(this.mergeSplit(leftArray), this.mergeSplit(rightArray));
    },

    //take two datalists and merge them into one sorted list
    merge: function(left, right){
        //store sorted result here
        var results = [];
        
        //as long as there are elements in both passed in arrays, 
        //at the to result array in sorted order.
        while(left.length && right.length) {
            var currentMin;
            //we compare the two arrays and strip out the minimum of first items
            if(left[0] < right[0]) {
                //shift will remove the element from the array completely.
                //this way on the next iteration there is a new number. thats why we use 0 index
                currentMin = left.shift();
            } else {
                currentMin = right.shift();
            }
            results.push(currentMin);
        }

        //if the left array has any elements in it then add those to the results
        if(left.length) {
            //if there is nothing in the left, then the remaining is in the right
            results = results.concat(left);
        } else {
            //else it means left is empty and only right remains
            results = results.concat(right);
        }
        //return the entire array to caller
        return results;
    },

    mergeSort: function(datalist) {
        //store the results
        var results = this.mergeSplit(datalist);
        console.log("----> " + results);
    }
};

//var myArr = [9, 11, 5, 1, 7, 2, 15, 1, 8, 6];
var myArr = [6000, 34, 203, 3, 746, 200, 984, 198, 764, 1, 9, 1];
//var myArr = [1, 7, 4, 0, 5, 3];
//var myArr = [64, 25, 12, 22, 11];
var collection = new ScriptoniteSort();
collection.mergeSort(myArr);