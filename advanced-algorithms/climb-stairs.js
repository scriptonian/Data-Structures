/*
Using Recursive Programming
*/
function climbStairs(n) {
    return (n < 2) ? n : climbStairs(n - 1) + climbStairs(n - 2);
}

//var numOfWays = climbStairs(3);
//console.log(numOfWays);

/*
Using Dynamic Programming
*/
function climbStairsDP(n) {
    var steps = [];
    //# of ways to climb 1 stair
    steps[0] = 1;
    //# of ways to climb 2 stairs
    steps[1] = 2;
    
    //loop from 2 to N
    for(var i = 2; i < n; i++) {
        steps[i] = steps[i - 1] + steps[i - 2];
    }
    //return the last number in the array.
    return steps[n - 1];
}

//var numOfWays = climbStairsDP(10);
//console.log(numOfWays);


/*
Using Dynamic Programming. Extend for up to 3 steps
*/
function climbStairsDPExtended(n) {
    var steps = [];
    //# of ways to climb 1 stair
    steps[0] = 1;
    //# of ways to climb 2 stairs
    steps[1] = 2;
    //# of ways to climb 3 stairs.
    steps[2] = 4;
    
    //loop from 2 to N
    for(var i = 3; i < n; i++) {
        steps[i] = steps[i - 1] + steps[i - 2] + steps[i - 3];
    }
    //return the last number in the array.
    return steps[n - 1];
}

var numOfWays = climbStairsDPExtended(5);
console.log(numOfWays);