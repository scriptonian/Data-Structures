/*
    O(n^3) solution
*/
function maxSubarraySum(arr) {
    //store the length of array
    var aLen = arr.length,
        //set the current max sum to zero
        maximumSum = 0;
    //Outter Loop
    for(var i = 0; i < aLen; i++) {
        //First inner loop
        for(var j = i + 1; j < aLen; j++) {
            //here is where we start adding the numbers
            var currentSum = 0;
            //calculate the sum
            for( var k = i; k < j; k++) {
                currentSum += arr[k];
            }
            maximumSum = Math.max(maximumSum, currentSum);
        }
    }

    return maximumSum;
}

var mainArray = [-2, -3, 4, -1, -2, 1, 5, -3];
//var mainArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
var maxSum = maxSubarraySum(mainArray);
console.log('Maximum sum of contiguos array( O(N^3) ) is: ', maxSum);

/*
    O(N) solution
*/

function maxSubarraySum(arr) {
    //store the length of array
    var aLen = arr.length,
        //set the current max sum to zero
        maximumSum = arr[0],
        current_max = arr[0];
    
    for(var i = 0; i < aLen; i++) {
        
        //get the current max sum
        current_max += arr[i];
        //case for when the current is less than 0
        if(current_max < 0) {
            current_max = 0;
        } else if (maximumSum < current_max) {
            maximumSum = current_max;
        }
    }

    return maximumSum;
}

var maxSum_optimized = maxSubarraySum(mainArray);
console.log('Maximum sum of contiguos array( O(N) ) is: ', maxSum_optimized);

/*
    O(N) solution - All negative numbers
*/

/*
function maxSubarrayNeg(arr) {
    //store the length of array
    var aLen = arr.length,
        //set the current max sum to zero
        maximumSum = arr[0],
        current_max = arr[0];
    
    for(var i = 0; i < aLen; i++) { 
       current_max = Math.max(arr[i], current_max + arr[i]);
       maximumSum = Math.max(maximumSum, current_max);
    }

    return maximumSum;
}

var mainArrayNeg = [-2, -1, -3, -4, -1, -2, -1, -5, -4];

var maxSum_neg = maxSubarrayNeg(mainArrayNeg);
console.log('Maximum sum of contiguos array( O(N) ) is: ', maxSum_neg);
*/

/*
    O(N) solution - print subarray
*/
function maxSubarraySumPrint(arr) {
    //store the length of array
    var aLen = arr.length,
        //set the current max sum to zero
        maximumSum = arr[0],
        current_max = arr[0],
        startIndex = 0,
        endIndex = 0,
        startTrack = 0;
    
    for(var i = 0; i < aLen; i++) {
        //get the current max sum
        current_max += arr[i];
        //case for when the current is less than 0
        if(current_max < 0) {
            current_max = 0;
            //increment where we start our tracking
            startIndexTrack = i + 1;
        } else if (maximumSum < current_max) {
            maximumSum = current_max;
            //set the start index to the last known track value
            startIndex = startIndexTrack;
            //the current i will be the last index
            endIndex = i;
        }
    }

    return {
        maximumSum: 'Max Sum is ' + maximumSum,
        printRange: function() {
            var subArray = [];
            for(var j = startIndex; j <= endIndex; j++) {
                subArray.push(arr[j]);
            }
            return subArray;
        }
    }
}

var maxSum_optimized_print = maxSubarraySumPrint(mainArray);
console.log('Maximum sum of contiguos array( O(N) - Print ) is: ', maxSum_optimized_print.printRange());