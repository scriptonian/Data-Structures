console.log('--- Running Fibonacci Sequence ---');
console.log('');

var COUNT = 40;

/* Run Fibonnaci using the iterative approach*/
function iterativeFibonacci(n) {
    var firstPrevious = 0,
        secondPrevious = 1,
        nextSeqNumber;
    
    //stop the first and second numbers
    var results = [firstPrevious, secondPrevious];

    //if n is less than 2 return the passed in param
    if(n < 2) return n;

    //start iteration
    for(var i = 2; i < n; i++) {
        nextSeqNumber = firstPrevious + secondPrevious;
        //push next number into results
        results.push(nextSeqNumber);
        //update the previous numbers
        firstPrevious = secondPrevious;
        secondPrevious = nextSeqNumber;

    }
    return results;
}

// Kick off the timer
console.time('Iterative Fibonacci');
//call the iterative function
var itSequence = iterativeFibonacci(COUNT);
// End the timer, get the elapsed time
console.timeEnd('Iterative Fibonacci');
//log the results
//console.log("Iterative Fibonacci Results: " + itSequence); // returns [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]


function recursiveFibonacci(n) {
    if(n < 2) return n;
    //recursively call the function
    return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}

// Kick off the timer
console.time('Recursive Fibonacci');
//return the result of adding the sequence numbers
var recSequence = recursiveFibonacci(COUNT);
/*
//display the sequence number
var recursiveCount = 0;
while(recursiveCount < COUNT) {
    //console.log if you want to see numbers display
    recursiveFibonacci(recursiveCount);
    recursiveCount++;
}
*/
// End the timer, get the elapsed time
console.timeEnd('Recursive Fibonacci');


/*
    Fibonacci Using Dynamic Programming
*/
function DPFibonacci(n) {
    var sequence = [];
    sequence[0] = 0;
    sequence[1] = 1;

    if(n < 2) return n;

    for(var i = 2; i < n; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }

    return sequence;
}

// Kick off the timer
console.time('Dynamic Programming Fibonacci');
//call the iterative function
var dpSequence = DPFibonacci(COUNT);
// End the timer, get the elapsed time
console.timeEnd('Dynamic Programming Fibonacci');
//log the results
//console.log("Dynamic Programming Fibonacci Results: " + dpSequence); // returns [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]


/*
    Fibonacci Using Memoization 
*/

function memoizeFibonacci(n) {
    var cache = {};

    function fibonacci(n) {
        let result;

        if(cache[n]) {
            result = cache[n];
        } else {
            if(n < 2) return n;
            //recursively call the function
            result = fibonacci(n - 1) + fibonacci(n - 2);
            //save the return to result
            cache[n] = result;
        }
        return result;
    };

    return fibonacci(n);
}

// Kick off the timer
console.time('Memoized Fibonacci');
//return the result of adding the sequence numbers
var memFibonacci = memoizeFibonacci(COUNT);

/*
var memCount = 0;
while(memCount < COUNT) {
    //console.log if you want to see numbers display
    memoizeFibonacci(memCount);
    memCount++;
}
*/
// End the timer, get the elapsed time
console.timeEnd('Memoized Fibonacci');