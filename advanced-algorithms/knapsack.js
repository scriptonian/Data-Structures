/*
*   USING RECURSION
*/
function knapsack(itemsNumber, capacity, weights, values) {

    var finalResult;

    //define basecase. if capacity or number of items is zero, then final result is zero
    if(itemsNumber === 0 || capacity === 0) {
        finalResult = 0;
    } else if(weights[itemsNumber] > capacity) {
        //if the current items weight is larger than the current capacity, we call the function again
        // moving to the next item in the pointer
        finalResult = knapsack(itemsNumber - 1, capacity, weights, values);
    } else {
        //else we can move onto our 0 - 1 / yes - no decisions
        //if we dont put the item in the knapsack, we call our function again
        var dontPutInKnapsack = knapsack(itemsNumber - 1, capacity, weights, values);
        //if we DO put in the knapsack
        var putInSack = values[itemsNumber] + knapsack(itemsNumber - 1, capacity - weights[itemsNumber], weights, values);
        finalResult = Math.max(dontPutInKnapsack, putInSack);
    }
    //return the final result
    return finalResult;
}
/*
Notice we set the first item of the array to null. this is so that we can
use more intituitive number in our arrays so itemWeights[1] is the weight 
of the first item
*/
var itemWeights = [null, 1, 3, 2, 5, 4],
    itemValues = [null, 2, 4, 6, 8, 5],
    knapsackSize = 10,
    totalNumberOfItems = 5;

var maximizeTotal = knapsack(totalNumberOfItems, 
                                knapsackSize, 
                                itemWeights, 
                                itemValues);

console.log('Recursion Maximum is : ', maximizeTotal); //returns 18

/*
*   USING DYNAMIC PROGRAMMING:
*       in this approach we are doing to store the number of items (n) and the 
*        capacity in a two dimensional array 
*        dpArr = [ [a, b], [c, d], [e, f] ]
*        therefore dpArr[0][0] => a; or dpArr[0][1] => b;
*/

//lets initialize our 2 dimensional DP array. This will store the value of the itemsNumber and capacity
//so its not computed again.
var dpArr = [
                [undefined,undefined],
                [undefined, undefined],
                [undefined, undefined],
                [undefined, undefined],
                [undefined, undefined],
                [undefined, undefined]
            ];

function knapsackDP(itemsNumber, capacity, weights, values) {

    var finalResult;

    //check to see if the result is already stored in the array. if it is return that instead
    if(dpArr[itemsNumber][capacity] !== undefined) {
        return dpArr[itemsNumber][capacity];
    }

    //if you cant find it then do the computation. NOTE: same as recursive method. however there is a
    //huge advantage here as we store the results. The maximum number of times we call the function again
    //is about 2 or 3 times
    
    //define basecase. if capacity or number of items is zero, then final result is zero
    if(itemsNumber === 0 || capacity === 0) {
        finalResult = 0;
    } else if(weights[itemsNumber] > capacity) {
        //if the current items weight is larger than the current capacity, we call the function again
        // moving to the next item in the pointer
        finalResult = knapsackDP(itemsNumber - 1, capacity, weights, values);
    } else {
        //else we can move onto our 0 - 1 / yes - no decisions
        //if we dont put the item in the knapsack, we call our function again
        var dontPutInKnapsack = knapsackDP(itemsNumber - 1, capacity, weights, values);
        //if we DO put in the knapsack
        var putInSack = values[itemsNumber] + knapsackDP(itemsNumber - 1, capacity - weights[itemsNumber], weights, values);
        finalResult = Math.max(dontPutInKnapsack, putInSack);
    }
    

    //save the result in the array
    dpArr[itemsNumber][capacity] = finalResult;

    //return the final result
    return finalResult;
}

var maximizeTotalDP = knapsackDP(totalNumberOfItems, 
                                    knapsackSize, 
                                    itemWeights, 
                                    itemValues);

console.log('Dynamic Programming Maximum is : ', maximizeTotalDP); //returns 18