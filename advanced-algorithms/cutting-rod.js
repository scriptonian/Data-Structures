var rLength = 4,
    /* price of 1 unit is $1, 
        2 units is $5, 
        3 units is $8, ...
    */
    rPrices = [1, 5, 8, 9];

//RECURSIVE APPROACH
function TotalRevenue(rLen, prices) {
    //define base case
    if(rLen === 0) {
        return 0;
    }
    //define a var to store the current max returned from recursion.
    var currentMaxRevenue = 0;
    //loop through the different lengths and determine max revenue
    for(var i = 0; i < rLen; i++) {
        var currentRevenue = prices[(rLen - i) - 1] + TotalRevenue(i, prices);
        if (currentRevenue > currentMaxRevenue) {
            currentMaxRevenue = currentRevenue;
        }
    }
    //finally return the max rev
    return currentMaxRevenue;
}

var totalRev = TotalRevenue(rLength, rPrices);
console.log('Recursive Approach: Revenue is ', totalRev);

//DYNAMIC PROGRAMMING APPROACH
function TotalRevenueDP(rLen, prices) {
    //define base on rod length and its revenue
    var r = [];
    r[0] = 0;

    //loop through the different lengths and determine max revenue
    for(var i = 1; i <= rLen; i++) {
        //define a var to store the current max returned from recursion.
        var currentMaxRevenue = 0;
        for(var j = 1; j <= i; j++) {
            var currentRevenue = prices[j - 1] + r[i - j];
            if (currentRevenue > currentMaxRevenue) {
                currentMaxRevenue = currentRevenue;
            }
        }
        r[i] = currentMaxRevenue;
    }
    //finally return the max rev
    return r[rLen];
}

var totalRevDp = TotalRevenueDP(rLength, rPrices);
console.log('Dynamic Programming: Revenue is ', totalRevDp);
