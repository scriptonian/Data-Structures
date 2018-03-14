/*
*   USING RECURSION
*/
function factorialRecursion(n) {
    if(n === 0 || n === 1) {
        return 1;
    }

    return n * factorialRecursion(n - 1);
}

var recSum = factorialRecursion(6);
console.log(recSum);

/*
*   USING DYNAMIC PROGRAMMING
*/
function factorialDP(n) {
    //define table to hold values - DP
    var table = [];
    //base case
    table[0] = 1;
    //we dont need table[1] but you can add it if you like.
    //table[1] = 2;

    for(var i = 1; i <= n; i++) {
        //use the value stored in the previos slot
        table[i] = i * table[i - 1];
    }
    console.log(table)
    //return final slot value
    return table[n];
}

var dpSum = factorialDP(6);
console.log(dpSum);